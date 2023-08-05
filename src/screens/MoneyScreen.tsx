import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useToast} from 'react-native-toast-notifications';
import {useMoney} from '../hooks/useMoney';
import {formatToCurrency} from '../utils/formatToCurrency';
import auth from '@react-native-firebase/auth';

export const MoneyScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const toast = useToast();
  const {
    setSenderFunction,
    setReciberFunction,
    setCUPFunc,
    setMLCFunc,
    sender,
    reciber,
    currency,
  } = useMoney();

  const prices = {
    mn: 100,
    mlc: 125,
  };
  useEffect(() => {
    const user = auth().currentUser;

    console.log('user', user);
    auth()
      .signInWithEmailAndPassword('admin@sendmoney.com', '123456')
      .then(resp => {
        console.log('resp', resp);
      });
  }, []);

  const handleButton = () => {
    try {
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
      } else {
        const bodyPost = {
          sender: sender,
          reciber: reciber,
          currency: currency,
        };

        /*  api.post('/orders/newSendMoney', bodyPost); */
        navigation.navigate('CardScreen', {...bodyPost});
      }
    } catch (error) {
      console.log(error);
    }
    /* setTitle('Contáctanos vía WhatsApp');
  setBody('Para realizar su remesa, contáctenos vía WhatsApp');
  setOpenModal(true); */
  };

  const handleButtonHelp = () => {};
  return (
    <>
      <ScrollView>
        <View style={{backgroundColor: '#5096ff', padding: 20}}>
          <Text style={{...styles.info, marginTop: top + 10}}>
            Estimado cliente, realizamos remesas desde Ecuador. Si está enviando
            desde otro país contáctenos vía WhatsApp.
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <Text style={{color: 'black', alignSelf: 'flex-start', fontSize: 16}}>
            Envías
          </Text>
          <View style={styles.inputBox}>
            <View style={{flex: 1, alignItems: 'center', marginRight: -10}}>
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

          <Text
            style={{
              color: 'black',
              alignSelf: 'flex-start',
              fontSize: 16,
              marginTop: 30,
            }}>
            Reciben
          </Text>

          <View style={styles.inputBox}>
            <View style={{flex: 1, alignItems: 'center', marginRight: -10}}>
              <Text style={{color: '#000'}}>CU</Text>
            </View>
            <TextInput
              keyboardType="decimal-pad"
              value={reciber}
              onChangeText={setReciberFunction}
              placeholder="0"
              style={{
                height: 50,
                fontSize: 20,
                color: 'black',
                backgroundColor: 'white',
                flex: 4,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={setCUPFunc}
              style={{
                backgroundColor: currency === 'CUP' ? '#5096ff' : '#ffffff',
                borderRadius: 4,
                flex: 1,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
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
                backgroundColor: currency === 'MLC' ? '#5096ff' : '#ffffff',
                borderRadius: 4,
                flex: 1,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
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
            <Text style={{fontSize: 16, fontWeight: '400', color: '#000'}}>
              Envías
            </Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#000'}}>
              Recibes
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#000'}}>
              100 USD
            </Text>
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
            <Text style={{fontSize: 16, fontWeight: '400', color: '#000'}}>
              {prices.mlc} USD
            </Text>
            <Text style={{fontSize: 16, fontWeight: '400', color: '#0cb415'}}>
              100 MLC
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#f8f7f7', marginTop: 10, padding: 10}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              marginLeft: 7,
              color: '#000',
            }}>
            (USD) Dolar Estadounidense
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              marginLeft: 7,
              color: '#000',
            }}>
            (CUP) Peso Nacional Cubano
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              marginLeft: 7,
              color: '#000',
            }}>
            (MLC) Moneda Libremente Convertible
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleButtonHelp}
          style={styles.buttonHelp}>
          <Image
            source={require('../assets/whatsapp.png')}
            style={{height: 60, width: 60}}
          />
          <Text style={{alignSelf: 'center', color: 'rgb(16,141,9)'}}>
            Ayuda
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
  info: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  inputsContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f7f7',
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
    marginBottom: Platform.OS === 'ios' ? 15 : 5,
  },
  buttonHelp: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    margin: 5,
    alignSelf: 'flex-end',
  },
  icon: {},
});
