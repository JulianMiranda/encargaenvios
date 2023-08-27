import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {ShopState, shopReducer} from './shopReducer';
import {CarItemProps} from '../../interfaces/Shop.Interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';
import {useToast} from 'react-native-toast-notifications';
import {Dimensions} from 'react-native';
import {Category} from '../../interfaces/CategoryResponse.interface';

import {OrderContext} from '../order/OrderContext';
import {Order, OrderResponse} from '../../interfaces/Order.interface';

import {
  getInvitedCar,
  setItemInvitedCar,
  setMyShopInvitedCar,
  updateItemInvitedCar,
} from '../../utils/handleItemInvited';

type ShopContextProps = {
  addCarLoading: boolean;
  car: CarItemProps[];
  message: string;
  errorAddCar: string;
  setItem: (item: CarItemProps) => void;
  unsetItem: (item: Category) => void;
  updateCarItem: (item: CarItemProps) => void;
  emptyCar: () => Promise<any>;
  successShop: () => Promise<void>;
  removeAlert: () => void;
  clearErrorAdd: () => void;
  makeShop: (total: number, selectedCarnet: string[]) => Promise<boolean>;
};
const shopInicialState: ShopState = {
  car: [],
  message: '',
  errorAddCar: '',
  addCarLoading: false,
};

export const ShopContext = createContext({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {
  const {height} = Dimensions.get('window');
  const {status, user} = useContext(AuthContext);
  const {setOrder} = useContext(OrderContext);
  const [state, dispatch] = useReducer(shopReducer, shopInicialState);
  const toast = useToast();
  useEffect(() => {
    console.log(status);
    if (status === 'authenticated') {
      checkCar();
    }
    if (status === 'not-authenticated') {
      checkCarNotAuth();
    }
  }, [status]);
  const checkCar = async () => {
    try {
      const resp = await api.get<CarItemProps[]>('/shop/checkCategories');
      if (resp.data && resp.data.length > 0) {
        resp.data.map(item => dispatch({type: 'set_item', payload: item}));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkCarNotAuth = async () => {
    try {
      console.log('checkCarInvited');

      const resp = await getInvitedCar();
      if (resp.length && resp.length > 0) {
        resp.map(item => dispatch({type: 'set_item', payload: item}));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setItem = async (item: CarItemProps) => {
    if (status === 'not-authenticated') {
      console.log('Actualizxando Invitado');
      try {
        dispatch({type: 'add_car_loading', payload: true});
        let isAlreadyInCarInvited = false;
        let newCantidadInvited = 0;
        state.car.forEach(itemCar => {
          if (
            JSON.stringify(itemCar.category.id) ===
            JSON.stringify(item.category.id)
          ) {
            isAlreadyInCarInvited = true;
            newCantidadInvited = itemCar.cantidad + item.cantidad;
          }
        });
        if (!isAlreadyInCarInvited) {
          dispatch({type: 'set_item', payload: item});

          await setItemInvitedCar(item);
          dispatch({type: 'add_car_loading', payload: false});
          toast.show('Añadido al carrito', {
            type: 'normal',
            placement: 'top',
            duration: 1500,
            style: {
              borderRadius: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
              marginTop: height / 2,
            },
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          });
        } else {
          await updateItemInvitedCar({
            category: item.category,
            cantidad: newCantidadInvited,
          });

          dispatch({
            type: 'update_item',
            payload: {...item, cantidad: newCantidadInvited},
          });
          dispatch({type: 'add_car_loading', payload: false});
          toast.show('Actualizado al carrito', {
            type: 'normal',
            placement: 'top',
            duration: 1500,
            style: {
              borderRadius: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
              marginTop: height / 2,
            },
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          });
        }
      } catch (error) {}
    } else {
      try {
        dispatch({type: 'add_car_loading', payload: true});

        let isAlreadyInCar = false;
        let newCantidad = 0;
        state.car.forEach(itemCar => {
          if (
            JSON.stringify(itemCar.category.id) ===
            JSON.stringify(item.category.id)
          ) {
            isAlreadyInCar = true;
            newCantidad = itemCar.cantidad + item.cantidad;
          }
        });
        if (!isAlreadyInCar) {
          dispatch({type: 'set_item', payload: item});
          await api.post('/shop/setMyShop', {
            user: user!.id,
            car: [...state.car, item],
          });
          dispatch({type: 'add_car_loading', payload: false});
          toast.show('Añadido al carrito', {
            type: 'normal',
            placement: 'top',
            duration: 1500,
            style: {
              borderRadius: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
              marginTop: height / 2,
            },
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          });
        } else {
          const oldCarItems = state.car.filter(
            carItem =>
              JSON.stringify(carItem.category.id) !==
              JSON.stringify(item.category.id),
          );
          await api.post('/shop/setMyShop', {
            user: user!.id,
            car: [
              ...oldCarItems,
              {category: item.category, cantidad: newCantidad},
            ],
          });
          dispatch({
            type: 'update_item',
            payload: {...item, cantidad: newCantidad},
          });
          dispatch({type: 'add_car_loading', payload: false});
          toast.show('Actualizado al carrito', {
            type: 'normal',
            placement: 'top',
            duration: 1500,
            style: {
              borderRadius: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
              marginTop: height / 2,
            },
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({type: 'add_car_loading', payload: false});
        dispatch({
          type: 'error_add_car',
          payload: 'Error al agregar al carrito, intente nuevamente',
        });
      }
    }
  };

  const updateCarItem = async (item: CarItemProps) => {
    if (item.cantidad === 0) {
      return unsetItem(item.category);
    }
    if (status === 'authenticated') {
      try {
        dispatch({type: 'add_car_loading', payload: true});
        const oldCarItems = state.car.filter(
          carItem =>
            JSON.stringify(carItem.category.id) !==
            JSON.stringify(item.category.id),
        );
        await api.post('/shop/setMyShop', {
          user: user!.id,
          car: [...oldCarItems, item],
        });
        dispatch({
          type: 'update_item',
          payload: {...item},
        });
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Carrito actualizado', {
          type: 'normal',
          placement: 'top',
          duration: 800,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      } catch (error) {
        console.log(error);
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Error al actualizar del carrito, intente más tarde', {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      }
    } else {
      try {
        dispatch({type: 'add_car_loading', payload: true});

        updateItemInvitedCar(item);
        dispatch({
          type: 'update_item',
          payload: {...item},
        });
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Carrito actualizado', {
          type: 'normal',
          placement: 'top',
          duration: 800,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      } catch (error) {
        console.log(error);
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Error al actualizar del carrito, intente más tarde', {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      }
    }
  };

  const clearErrorAdd = () => {
    dispatch({type: 'error_add_car', payload: ''});
  };

  const unsetItem = async (item: Category) => {
    if (status === 'authenticated') {
      try {
        dispatch({type: 'add_car_loading', payload: true});
        const newState = state.car.filter(
          carItem => JSON.stringify(carItem.category) !== JSON.stringify(item),
        );
        await api.post('/shop/setMyShop', {user: user!.id, car: [...newState]});
        dispatch({type: 'unset_item', payload: item});
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Eliminado del carrito', {
          type: 'normal',
          placement: 'top',
          duration: 1000,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      } catch (error) {
        console.log(error);

        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Error al eliminar del carrito, intente más tarde', {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      }
    } else {
      dispatch({type: 'add_car_loading', payload: true});
      const newState = state.car.filter(
        carItem => JSON.stringify(carItem.category) !== JSON.stringify(item),
      );
      setMyShopInvitedCar(newState);
      dispatch({type: 'unset_item', payload: item});
      dispatch({type: 'add_car_loading', payload: false});
      toast.show('Eliminado del carrito', {
        type: 'normal',
        placement: 'top',
        duration: 1000,
        style: {
          borderRadius: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: height / 2,
        },
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  };

  const emptyCar = async (): Promise<any> => {
    try {
      /* api.post('/shop/setMyShop', {user: user!.id, car: []}); */
      dispatch({type: 'empty_car'});
    } catch (error) {
      console.log(error);
    }
  };

  const successShop = async (): Promise<void> => {
    try {
      dispatch({type: 'add_car_loading', payload: true});
      const body = {
        filter: {user: ['=', user?.id], status: ['=', true]},
        docsPerPage: 1,
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
      const a = await api.post<OrderResponse>('/orders/getList', body);

      dispatch({type: 'empty_car'});
      dispatch({type: 'add_car_loading', payload: false});
      setOrder(a.data.data[0]);
    } catch (error) {
      console.log(error);

      dispatch({type: 'add_car_loading', payload: false});
    }
  };

  const makeShop = async (
    total: number,
    selectedCarnet: string[],
  ): Promise<boolean> => {
    try {
      dispatch({type: 'add_car_loading', payload: true});
      const cleanCar = state.car.filter(
        carItem => !(!carItem.category.status || carItem.category.soldOut),
      );
      const a = await api.post<Promise<Order>>('/orders/setOrder', {
        user: user!.id,
        cost: total,
        car: cleanCar,
        selectedCarnet,
        owner: 'Julian',
      });
      dispatch({type: 'add_car_loading', payload: false});
      return true;
    } catch (error) {
      console.log(error);

      dispatch({type: 'add_car_loading', payload: false});
      toast.show('Error al realizar la compra', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          borderRadius: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: height / 2,
        },
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
      return false;
    }
  };
  const removeAlert = () => {
    dispatch({type: 'remove_alert'});
  };
  return (
    <ShopContext.Provider
      value={{
        ...state,
        setItem,
        successShop,
        unsetItem,
        emptyCar,
        makeShop,
        removeAlert,
        clearErrorAdd,
        updateCarItem,
      }}>
      {children}
    </ShopContext.Provider>
  );
};
