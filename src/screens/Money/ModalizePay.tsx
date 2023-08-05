import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {BodyProps, ReciberCard} from '../../hooks/useMoney';

interface Props {
  bodyPost: BodyProps;
  reciberCard: ReciberCard;
  modalizeRef: any;
}
const {height} = Dimensions.get('window');
export const ModalizePay = ({bodyPost, reciberCard, modalizeRef}: Props) => {
  const toast = useToast();
  const handleButton = () => {
    toast.show('Pago realizado con éxito', {
      duration: 3000,
      placement: 'top',
      type: 'success',
      animationType: 'zoom-in',
      style: {width: '100%', justifyContent: 'center', marginTop: 30},
      textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
    modalizeRef.current?.close();
  };
  return (
    <>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 16, color: '#000'}}>
          {reciberCard.name} recibirá {bodyPost.reciber} {bodyPost.currency}.
        </Text>
        <Text style={{fontSize: 16, marginTop: 5, color: '#000'}}>
          Tarjeta a acreditar: {reciberCard.numberCard}
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 16, color: '#000'}}>
          *Estamos trabajando para ofrecerte un sistema de pago
        </Text>
      </View>
      {/* <Text>{JSON.stringify(bodyPost)} </Text>
      <Text>{JSON.stringify(reciberCard)} </Text> */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleButton}
        style={styles.button}>
        <Text style={{color: '#ffffff', fontSize: 22, fontWeight: '700'}}>
          Enviar
        </Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 60,
    backgroundColor: '#5096ff',
    borderRadius: 4,
    margin: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? height * 0.1 + 25 : height * 0.1 - 50,
  },
});
