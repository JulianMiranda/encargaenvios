import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {ShopState, shopReducer} from './shopReducer';
import {CarItemProps, ComboItemProps} from '../../interfaces/Shop.Interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';
import {useToast} from 'react-native-toast-notifications';
import {Dimensions, Vibration} from 'react-native';
import {Category} from '../../interfaces/CategoryResponse.interface';

import {OrderContext} from '../order/OrderContext';
import {Order, OrderResponse} from '../../interfaces/Order.interface';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {
  deleteCombo,
  getInvitedCar,
  getSavedCombo,
  setItemInvitedCar,
  setMyShopInvitedCar,
  setSaveCombo,
  unSetSaveCombo,
  updateItemInvitedCar,
  updateSaveCombo,
} from '../../utils/handleItemInvited';
import {STRING} from '../../forkApps/forkApps';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {Promocode} from '../../interfaces/Promocode.interface';

type ShopContextProps = {
  addCarLoading: boolean;
  car: CarItemProps[];
  message: string;
  errorAddCar: string;
  setItem: (item: CarItemProps) => void;
  unsetItem: (item: Category) => void;
  updateCarItem: (item: CarItemProps) => void;
  emptyCar: () => Promise<any>;
  dropCombo: () => void;
  dropComboPrev: () => void;
  successShop: () => Promise<void>;
  removeAlert: () => void;
  clearErrorAdd: () => void;
  makeShop: (total: number, selectedCarnet: string[]) => Promise<boolean>;

  combo: ComboItemProps[];
  setItemCombo: (item: ComboItemProps) => void;
  unsetItemCombo: (item: Subcategory) => void;
  costoTotal: number;
  pesoTotal: number;

  priceTotal: number;
  discountTotal: number;
  discountPromo: {
    name: string;
    description: string;
    discount: number;
    nodes: Array<string>;
    minDiscount: number;
    maxDiscount: number;
  };

  comboPrev: ComboItemProps[];
  setItemComboPrev: (item: ComboItemProps) => void;
  unsetItemComboPrev: (item: Subcategory) => void;
};
const shopInicialState: ShopState = {
  car: [],
  combo: [],
  comboPrev: [],
  message: '',
  errorAddCar: '',
  addCarLoading: false,
  costoTotal: 0,
  pesoTotal: 0,
  priceTotal: 0,
  discountTotal: 0,
  discountPromo: {
    discount: 0,
    nodes: [],
    minDiscount: 0,
    maxDiscount: 0,
    name: '',
    description: '',
  },
};

export const ShopContext = createContext({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {
  const {height} = Dimensions.get('window');
  const {status, user} = useContext(AuthContext);
  const {setOrder} = useContext(OrderContext);
  const [state, dispatch] = useReducer(shopReducer, shopInicialState);
  const toast = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      checkCar();
    }
    if (status === 'not-authenticated') {
      checkCarNotAuth();
    }
  }, [status]);

  useEffect(() => {
    calculateCombo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.combo]);
  useEffect(() => {
    checkComboCar();
  }, []);
  useEffect(() => {
    carTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.car]);

  useEffect(() => {
    if (status === 'authenticated' && user && user.promocode) {
      console.log('user.promocode', user.promocode);
      try {
        api
          .get<Promocode>('/promocode/getOne/' + user.promocode)
          .then(response => {
            const currentDate = new Date();
            const expDate = new Date(response.data.expirationDate);
            if (
              response.status === 200 &&
              response.data.discount &&
              expDate.getTime() > currentDate.getTime()
            ) {
              dispatch({
                type: 'set_discount_promo',
                payload: {
                  name: response.data.name,
                  description: response.data.description,
                  discount: response.data.discount,
                  nodes: response.data.nodes,
                  maxDiscount: response.data.maxDiscount,
                  minDiscount: response.data.minDiscount,
                },
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, status]);

  const checkComboCar = async () => {
    try {
      const resp = await getSavedCombo();
      if (resp.length && resp.length > 0) {
        resp.map(item => dispatch({type: 'set_item_combo', payload: item}));
      }
    } catch (error) {
      console.log(error);
    }
  };
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
    /*    Vibration.vibrate(100); */
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger('impactLight', options);
    console.log('setItem');
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
    console.log('updateCarItem');

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
  const dropCombo = () => {
    dispatch({type: 'drop_combo'});
    deleteCombo();
  };
  const dropComboPrev = () => {
    dispatch({type: 'drop_combo_prev'});
  };

  const unsetItem = async (item: Category) => {
    console.log('unsetCarItem');
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

  const setItemCombo = async (item: ComboItemProps): Promise<any> => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger('impactLight', options);
    try {
      /* api.post('/shop/setMyShop', {user: user!.id, car: []}); */
      const exist = state.combo.filter(
        (comboItem: ComboItemProps) =>
          comboItem.subcategory.id === item.subcategory.id,
      );
      if (exist.length === 0) {
        dispatch({type: 'set_item_combo', payload: item});
        setSaveCombo(item);
      } else {
        dispatch({type: 'update_item_combo', payload: exist[0]});
        updateSaveCombo(exist[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unsetItemCombo = async (item: Subcategory): Promise<any> => {
    try {
      /* api.post('/shop/setMyShop', {user: user!.id, car: []}); */
      dispatch({type: 'unset_item_combo', payload: item});
      unSetSaveCombo(item);
    } catch (error) {
      console.log(error);
    }
  };
  const setItemComboPrev = async (item: ComboItemProps): Promise<any> => {
    try {
      /* api.post('/shop/setMyShop', {user: user!.id, car: []}); */
      const exist = state.comboPrev.filter(
        (comboItem: ComboItemProps) =>
          comboItem.subcategory.id === item.subcategory.id,
      );
      if (exist.length === 0) {
        dispatch({type: 'set_item_combo_prev', payload: item});
      } else {
        dispatch({type: 'update_item_combo_prev', payload: exist[0]});
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unsetItemComboPrev = async (item: Subcategory): Promise<any> => {
    try {
      /* api.post('/shop/setMyShop', {user: user!.id, car: []}); */
      dispatch({type: 'unset_item_combo_prev', payload: item});
    } catch (error) {
      console.log(error);
    }
  };
  const calculateCombo = (): void => {
    let pesoTotal = 0;
    let costoTotal = 0;
    state.combo.forEach(elemento => {
      pesoTotal += elemento.cantidad * elemento.subcategory.weight;
      costoTotal += elemento.cantidad * elemento.subcategory.cost;
    });
    dispatch({type: 'set_costo', payload: costoTotal});
    dispatch({type: 'set_peso', payload: pesoTotal});
    console.log('calculateCombo', pesoTotal);
  };

  const successShop = async (): Promise<void> => {
    try {
      console.log('successShop');
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

  const carTotal = () => {
    let disc = 0;
    let tot = 0;
    state.car.map(carItem => {
      if (!carItem.category.status || carItem.category.soldOut) {
        return;
      }
      if (
        carItem.category.priceDiscount &&
        carItem.category.priceDiscount !== 0
      ) {
        tot += carItem.category.priceDiscount * carItem.cantidad;
        disc +=
          (carItem.category.price - carItem.category.priceDiscount) *
          carItem.cantidad;
      } else {
        tot += carItem.category.price * carItem.cantidad;
      }
    });
    dispatch({type: 'set_price_total', payload: tot});
    dispatch({type: 'set_discount_total', payload: disc});
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
      await api.post<Promise<Order>>('/orders/setOrder', {
        user: user!.id,
        cost: total,
        car: cleanCar,
        selectedCarnet,
        owner: STRING.owner,
        combo: state.combo,
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
        setItemCombo,
        unsetItemCombo,
        dropCombo,
        setItemComboPrev,
        unsetItemComboPrev,
        dropComboPrev,
      }}>
      {children}
    </ShopContext.Provider>
  );
};
