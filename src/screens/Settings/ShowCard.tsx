import React from 'react';
import {RootStackParams} from '../../navigator/SettingsStack';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from 'react-native';
import {BackButton} from '../../components/common/BackButton';
import {useNavigation} from '@react-navigation/native';
import {useCard} from '../../hooks/useCard';

interface Props extends StackScreenProps<RootStackParams, 'ShowCard'> {}
export const ShowCard = (props: Props) => {
  const {route} = props;
  const {card} = route.params;

  console.log('card', card);

  const {DeleteCard} = useCard();

  const navigation = useNavigation<any>();
  return (
    <>
      <BackButton navigation={navigation} />
      <View
        style={{
          marginTop: 150,
          padding: 10,
          backgroundColor: '#E9FDFF',
          margin: 30,
          borderRadius: 8,
        }}>
        <Text
          style={{
            marginBottom: 20,
          }}>
          {card.holder_name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>· · · ·</Text>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>· · · ·</Text>
          <Text style={{fontWeight: 'bold', fontSize: 26}}>· · · ·</Text>
          <Text style={{fontWeight: 'bold'}}>{card.number}</Text>
        </View>
        <Text style={{fontWeight: '300', fontSize: 12}}>
          Fecha de vencimiento: {card.expiry_month}/{card.expiry_year}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => DeleteCard({card: {token: card.token}, user: {id: 1}})}
        style={{padding: 5, marginLeft: 10}}>
        <Text style={{color: 'red'}}>Eliminar tarjeta</Text>
      </TouchableOpacity>
    </>
  );
};
