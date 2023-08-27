import React, {useContext, useState} from 'react';
import {BackButton} from '../../components/common/BackButton';
import {TopGradient} from '../../components/common/TopGradient';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';
import {useCard} from '../../hooks/useCard';
import {AuthContext} from '../../context/auth/AuthContext';

export const AddCard = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const navigation = useNavigation();

  const {user: userApp} = useContext(AuthContext);

  const {AddNewCard, EfectRef} = useCard();
  const [user, setUser] = useState({
    id: '1',
    email: 'ejemplo@test.com',
  });
  const [card, setCard] = useState({
    number: '4200000000000001',
    holder_name: 'Pepe García',
    expiry_month: 9,
    expiry_year: 2025,
    cvc: '123',
    type: 'vi',
  });
  const pagar = async () => {
    try {
      const res = await EfectRef({user, card, total: 0});
      console.log('Esta es la respuesta', res);
    } catch (error) {}
  };
  return (
    <>
      <BackButton navigation={navigation} />
      <TopGradient text="Agregar Tarjeta" />
      <TouchableOpacity
        onPress={() => AddNewCard({user, card})}
        style={{padding: 20, backgroundColor: '#c1c1c1', marginTop: 150}}>
        <Text>Agregar tarjeta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pagar()}
        style={{padding: 20, backgroundColor: '#c1c1c1', marginTop: 150}}>
        <Text>EfectRef</Text>
      </TouchableOpacity>
    </>
  );
};
