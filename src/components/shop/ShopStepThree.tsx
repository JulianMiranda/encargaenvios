import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useCard} from '../../hooks/useCard';
import {PaymentWebView} from './PaymentWebView';
import {ShopContext} from '../../context/shop/ShopContext';
import {AuthContext} from '../../context/auth/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {ModalChangeEmail} from '../common/ModalChangeEmail';
import api from '../../api/api';
import {User} from '../../interfaces/User.interface';
import {useToast} from 'react-native-toast-notifications';
import {calcularCombo} from '../../utils/calculateCost';
import {useCalculateDiscountPromo} from '../../hooks/useCalculateDiscuountPromo';

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
  const {user, prices, updateUser} = useContext(AuthContext);
  const card = {};
  const {priceTotal, pesoTotal, costoTotal} = useContext(ShopContext);
  const {totalFinal, calculationsComplete} = useCalculateDiscountPromo();
  const toast = useToast();

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
    if (calculationsComplete) {
      pagar();
    }
  }, [calculationsComplete]);

  const pagar = async () => {
    try {
      const res = await EfectRef({
        user,
        card,
        total: parseFloat(totalFinal.toFixed(2)),
        navigation,
      });
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
        const res = await EfectRef({
          user: resp.data,
          card,
          total: priceTotal + calcularCombo({costoTotal, pesoTotal, prices}),
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
