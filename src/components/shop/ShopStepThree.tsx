import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useCard} from '../../hooks/useCard';
import {PaymentWebView} from './PaymentWebView';
import {ShopContext} from '../../context/shop/ShopContext';
import {AuthContext} from '../../context/auth/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {ModalChangeEmail} from '../common/ModalChangeEmail';
import api from '../../api/api';
import {User} from '../../interfaces/User.interface';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  setStatePage: (statePage: string) => void;
  statePage: string;
  totalShop: number;
  selectedCarnet: string[];
}

export const ShopStepThree = ({
  setStatePage,
  statePage,
  totalShop,
  selectedCarnet,
}: Props) => {
  const {EfectRef} = useCard();
  const [paymentUrl, setPaymentUrl] = useState('');
  const {user, updateUser} = useContext(AuthContext);
  const card = {};
  const {car} = useContext(ShopContext);
  const toast = useToast();

  const [discount, setDiscount] = useState(0);

  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formEmail, setFormEmail] = useState('');

  useEffect(() => {
    if (!user?.email) {
      console.log('No tiene email');
      setOpenModal(true);
    }
  }, [user]);

  useEffect(() => {
    let disc = 0;
    let tot = 0;
    car.map(carItem => {
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
    setDiscount(disc);
    setTotal(tot);
  }, [car]);

  useEffect(() => {
    pagar();
  }, []);
  const pagar = async () => {
    try {
      let miTotal = 0;
      let miDesc = 0;
      car.map(carItem => {
        if (!carItem.category.status || carItem.category.soldOut) {
          return;
        }
        if (
          carItem.category.priceDiscount &&
          carItem.category.priceDiscount !== 0
        ) {
          miTotal += carItem.category.priceDiscount * carItem.cantidad;
          miDesc +=
            (carItem.category.price - carItem.category.priceDiscount) *
            carItem.cantidad;
        } else {
          miTotal += carItem.category.price * carItem.cantidad;
        }
      });
      console.log('Esta miTotal', miTotal);
      const res = await EfectRef({user, card, total: miTotal, navigation});
      console.log('Esta es la respuesta', res);
      setPaymentUrl(res);
    } catch (error) {}
  };

  const confirmModal = async () => {
    try {
      setIsLoading(true);
      const resp = await api.put<User>(`users/update/${user?.id}`, {
        email: formEmail,
      });
      console.log('Respuesta de actualizar User', resp.data);
      updateUser(resp.data);

      setIsLoading(false);
      setOpenModal(false);
      try {
        let miTotal = 0;
        let miDesc = 0;
        car.map(carItem => {
          if (!carItem.category.status || carItem.category.soldOut) {
            return;
          }
          if (
            carItem.category.priceDiscount &&
            carItem.category.priceDiscount !== 0
          ) {
            miTotal += carItem.category.priceDiscount * carItem.cantidad;
            miDesc +=
              (carItem.category.price - carItem.category.priceDiscount) *
              carItem.cantidad;
          } else {
            miTotal += carItem.category.price * carItem.cantidad;
          }
        });
        console.log('Esta miTotal', miTotal);
        const res = await EfectRef({
          user: resp.data,
          card,
          total: miTotal,
          navigation,
        });
        console.log('Esta es la respuesta', res);
        setPaymentUrl(res);
      } catch (error) {}
      if (resp.status === 200) {
        toast.show('Correo actualizado', {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            zIndex: 9999,
            justifyContent: 'center',
            borderRadius: 50,
            marginTop: 50,
            paddingHorizontal: 20,
            backgroundColor: 'green',
          },
          textStyle: {fontSize: 16},
          animationType: 'zoom-in',
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.show('Error de servidor, inténtelo más tarde', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          zIndex: 9999,
          justifyContent: 'center',
          borderRadius: 50,
          marginTop: 50,
          paddingHorizontal: 20,
          backgroundColor: 'red',
        },
        textStyle: {fontSize: 16},
        animationType: 'zoom-in',
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/*   <Text style={{color: '#000'}}>
        En estos momentos estamos trabajando en ofrecer un servicio de Pago
        online
      </Text> */}
      {paymentUrl && (
        <PaymentWebView
          url={paymentUrl}
          statePage={statePage}
          setStatePage={setStatePage}
          totalShop={totalShop}
          selectedCarnet={selectedCarnet}
        />
      )}
      <ModalChangeEmail
        isLoading={isLoading}
        title={'Actualizar correo'}
        body={'Para realizar el pago es necesario añadir un correo electrónico'}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
        formEmail={formEmail}
        setFormEmail={setFormEmail}
      />
    </View>
  );
};
