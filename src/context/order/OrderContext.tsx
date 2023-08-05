import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {OrderState, orderReducer} from './orderReducer';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';
import {Order, OrderResponse} from '../../interfaces/Order.interface';

type OrderContextProps = {
  orders: Order[];
  isLoading: boolean;

  setOrder: (item: Order) => void;
  checkOrders: () => void;
  emptyOrders: () => void;
};
const orderInicialState: OrderState = {
  orders: [],
  isLoading: false,
};

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({children}: any) => {
  const {status, user} = useContext(AuthContext);
  const [state, dispatch] = useReducer(orderReducer, orderInicialState);

  useEffect(() => {
    if (status === 'authenticated') {
      checkOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const checkOrders = async () => {
    try {
      console.log('MyUser', user?.id);
      const body = {
        filter: {user: ['=', user?.id], status: ['=', true]},
        docsPerPage: 200,
        /*   sort: {createdAt: 'DESC'}, */
        population: [
          {
            path: 'selectedCarnet',
            fields: {
              name: true,
              firstLastName: true,
              secondLastName: true,
              carnet: true,
              address: true,
              deparment: true,
              floor: true,
              number: true,
              firstAccross: true,
              secondAccross: true,
              reparto: true,
              municipio: true,
              provincia: true,
              phoneNumber: true,
              status: true,
            },
          },
          {
            path: 'trackcode',
            fields: {
              user: true,
              code: true,
              state: true,
              status: true,
              createdAt: true,
            },
          },
        ],
      };
      dispatch({type: 'load-orders', payload: true});
      const resp = await api.post<OrderResponse>('/orders/getList', body);
      if (resp.data && resp.data.data.length > 0) {
        resp.data.data
          .reverse()
          .map(item => dispatch({type: 'set_order', payload: item}));
      }
      dispatch({type: 'load-orders', payload: false});
    } catch (error) {
      console.log(error);
      dispatch({type: 'load-orders', payload: false});
    }
  };
  const setOrder = async (item: Order) => {
    try {
      const resp = await api.get(`/orders/getOne/${item.id}`);

      dispatch({type: 'set_order', payload: resp.data});
    } catch (error) {
      console.log(error);
    }
  };

  const emptyOrders = async () => {
    try {
      dispatch({type: 'empty_orders'});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        setOrder,
        checkOrders,
        emptyOrders,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
