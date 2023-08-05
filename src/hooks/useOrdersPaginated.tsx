import {useState, useEffect, useContext, useRef} from 'react';
import api from '../api/api';
import {AuthContext} from '../context/auth/AuthContext';
import {Order, OrderResponse} from '../interfaces/Order.interface';

export const useOrdersPaginated = () => {
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  const loadOrders = async () => {
    const body = {
      filter: {user: ['=', user?.id]},
      page: nextPage.current,
      docsPerPage: 6,
      sort: {createdAt: 'DESC'},
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
    try {
      if (nextPage.current <= totalPages.current + 2) {
        setIsLoading(true);
        const resp = await api.post<OrderResponse>('/orders/getList', body);
        nextPage.current = resp.data.page + 1;
        totalPages.current = resp.data.totalPages;
        setOrders([...orders, ...resp.data.data]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    isLoading,
    orders,
    loadOrders,
  };
};
