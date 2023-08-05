/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {useMoney} from '../../hooks/useMoney';
import {Dimensions} from 'react-native';
import {TopScrollGradient} from '../../components/common/TopScrollGradient';
import {Modalize} from 'react-native-modalize';
import {ModalizePay} from './ModalizePay';

const {height} = Dimensions.get('window');
export const MoneyScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const toast = useToast();
  const {
    setSenderFunction,
    setReciberFunction,
    setCUPFunc,
    setMLCFunc,
    setReciberCardFunc,
    setReciberNameFunc,
    setBodyPostFunc,
    sender,
    reciber,
    currency,
    bodyPost,
    reciberCard,
  } = useMoney();

  const prices = {
    mn: 100,
    mlc: 125,
  };

  const handleButton = () => {
    try {
      console.log(reciberCard.numberCard.trim().length);
      if (sender === '' || reciber === '') {
        toast.show('Por favor, complete todos los campos', {
          duration: 3000,
          placement: 'top',
          type: 'danger',
          animationType: 'zoom-in',
          style: {width: '100%', justifyContent: 'center', marginTop: 30},
          textStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          },
        });
      } else if (reciberCard.numberCard.trim().length !== 19) {
        toast.show('Por favor, coloca una tarjeta válida', {
          duration: 3000,
          placement: 'top',
          type: 'danger',
          animationType: 'zoom-in',
          style: {width: '100%', justifyContent: 'center', marginTop: 30},
          textStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          },
        });
      } else if (reciberCard.name.trim().split(' ').length < 2) {
        toast.show('Por favor, introduzca nombres y apellidos', {
          duration: 3000,
          placement: 'top',
          type: 'danger',
          animationType: 'zoom-in',
          style: {width: '100%', justifyContent: 'center', marginTop: 30},
          textStyle: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          },
        });
      } else {
        const bodyPostNew = {
          sender: sender,
          reciber: reciber,
          currency: currency,
        };
        setBodyPostFunc(bodyPostNew);

        modalizeRef.current?.open();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopScrollGradient title="Remesas">
        <View style={styles.inputsContainer}>
          <Text style={styles.sender}>Envías</Text>
          <View style={styles.inputBox}>
            <View style={styles.flag}>
              <Text style={{color: '#000'}}>ECU</Text>
            </View>
            <TextInput
              autoFocus={true}
              keyboardType="decimal-pad"
              value={sender}
              onChangeText={setSenderFunction}
              placeholder="0"
              style={styles.input}
            />
            <Text style={styles.textUSD}>USD</Text>
          </View>

          <Text style={styles.textReciber}>Reciben</Text>

          <View style={styles.inputBox}>
            <View style={styles.flag}>
              <Text style={{color: '#000'}}>CU</Text>
            </View>
            <TextInput
              keyboardType="decimal-pad"
              value={reciber}
              onChangeText={setReciberFunction}
              placeholder="0"
              style={styles.inputReciber}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={setCUPFunc}
              style={{
                ...styles.buttonCurrency,
                backgroundColor: currency === 'CUP' ? '#5096ff' : '#ffffff',
              }}>
              <Text
                style={{
                  color: currency === 'CUP' ? 'white' : '#d6d2d2',
                  fontSize: currency === 'CUP' ? 16 : 10,
                  fontWeight: '700',
                }}>
                CUP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={setMLCFunc}
              style={{
                ...styles.buttonCurrency,
                backgroundColor: currency === 'MLC' ? '#5096ff' : '#ffffff',
              }}>
              <Text
                style={{
                  color: currency === 'MLC' ? 'white' : '#d6d2d2',
                  fontSize: currency === 'MLC' ? 16 : 10,
                  fontWeight: '700',
                }}>
                MLC
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderColor: '#f1f1f1',
            borderWidth: 1,
            width: '100%',
            padding: 10,
            margin: 10,
          }}>
          <Text style={{fontSize: 18, color: '#000', marginBottom: 5}}>
            Datos de quien recibe
          </Text>
          <Text style={{color: '#000'}}>Tarjeta</Text>
          <View style={{...styles.inputBox}}>
            <TextInput
              keyboardType="decimal-pad"
              value={reciberCard.numberCard}
              onChangeText={setReciberCardFunc}
              placeholder="9205 1299 0505 0505"
              style={{
                ...styles.inputReciber,
                paddingLeft: 10,
              }}
            />
          </View>

          <Text style={{marginTop: 20, color: '#000'}}>Nombre</Text>
          <View style={{...styles.inputBox}}>
            <TextInput
              autoCapitalize="words"
              value={reciberCard.name}
              onChangeText={setReciberNameFunc}
              placeholder="Carlos Pérez Pérez"
              style={{
                ...styles.inputReciber,
                paddingLeft: 10,
              }}
            />
          </View>
        </View>
        <View style={{backgroundColor: 'white', width: '100%', padding: 20}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 5,
              color: '#000',
            }}>
            Tipo de cambio actual
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#000'}}>
              1.00 USD - {formatToCurrency(prices.mn).slice(1)} CUP
            </Text>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#000'}}>
              1.00 USD - {formatToCurrency(100 / prices.mlc).slice(1)} MLC
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={styles.text16}>Envías</Text>
            <Text style={styles.text16}>Recibes</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.text16}>100 USD</Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#0cb415'}}>
              {prices.mn * 100} CUP
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.text16}>{prices.mlc} USD</Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#0cb415'}}>
              100 MLC
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#f8f7f7', marginTop: 10, padding: 10}}>
          <Text style={styles.text12}>(USD) Dolar Estadounidense</Text>
          <Text style={styles.text12}>(CUP) Peso Nacional Cubano</Text>
          <Text style={styles.text12}>(MLC) Moneda Libremente Convertible</Text>
        </View>
      </TopScrollGradient>
      <Modalize
        modalStyle={{zIndex: 1000000000}}
        ref={modalizeRef}
        modalHeight={height * 0.8}>
        <ModalizePay
          bodyPost={bodyPost}
          reciberCard={reciberCard}
          modalizeRef={modalizeRef}
        />
        <></>
      </Modalize>
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
  inputsContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f7f7',
    marginTop: 70,
  },
  inputBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
    flex: 5,
  },
  inputReciber: {
    height: 50,
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
    flex: 4,
  },
  textUSD: {
    borderRadius: 4,
    flex: 1,
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#5096ff',
    borderRadius: 4,
    margin: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? height * 0.1 + 25 : height * 0.1 - 50,
  },
  sender: {color: 'black', alignSelf: 'flex-start', fontSize: 16},
  text16: {fontSize: 16, fontWeight: '400', color: '#000'},
  text12: {fontSize: 12, color: '#000', fontWeight: '400', marginLeft: 7},
  flag: {flex: 1, alignItems: 'center', marginRight: -10},
  textReciber: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: 30,
  },
  buttonCurrency: {
    borderRadius: 4,
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
