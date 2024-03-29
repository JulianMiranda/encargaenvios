import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../../navigator/AccountStack';
import {FadeInImage} from '../../components/common/FadeInImage';
import {SingleTrack} from '../../components/account/SingleTrack';
import {Factura} from './Factura';
import {TopScrollGradient} from '../../components/common/TopScrollGradient';
import {SingleTrackMar} from '../../components/account/SingleTrackMar';
import {NoTrackCancel} from '../../components/account/NoTrackCancel';
import {ShopContext} from '../../context/shop/ShopContext';
import api from '../../api/api';
import {useToast} from 'react-native-toast-notifications';

const {height} = Dimensions.get('window');

interface Props
  extends StackScreenProps<RootStackParams, 'SingleOrderScreen'> {}

export const SingleOrderScreen = (props: Props) => {
  const {route, navigation} = props;
  const {
    carItem,
    selectedCarnet,
    trackcode,
    codes,
    order,
    number,
    createdAt,
    status,
  } = route.params;
  const {category} = carItem;
  const openModalize = () => {
    navigation.navigate('CorreosScreen', {
      code: codes.length > 0 ? codes[number].code : '',
    });
  };
  const {setItem} = useContext(ShopContext);

  const toast = useToast();
  const shopNow = async () => {
    api
      .get('/categories/getOne/' + category.id)
      .then(async product => {
        console.log(product.data);
        if (!product.data.status) {
          toast.show('Producto no disponible', {
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
        } else if (product.data.soldOut) {
          toast.show('Producto agotado', {
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
        } else {
          await setItem({category: product.data, cantidad: 1});
          navigation.navigate<any>('Shop', {screen: 'ShopScreen'});
        }
      })
      .catch(error => {
        console.log('error', JSON.stringify(error.response.status));
        console.log('error', error.status);
        if (error.response.status == 404) {
          toast.show('Producto no disponible', {
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
        } else {
          toast.show('Ha ocurrido un error, inténtelo más tarde', {
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
      });
    /*  await setItem({category, cantidad: 1});
    navigation.navigate<any>('Shop', {screen: 'ShopScreen'}); */
  };
  return (
    <>
      <TopScrollGradient
        title={
          category.name === category.subname ? category.name : category.subname
        }>
        {category.image && (
          <FadeInImage uri={category.image.url} style={styles.image} />
        )}
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <View>
              <Text style={{...styles.totalTitle}}>Orden</Text>
              <Text style={{...styles.totalTitle}}>No. {order}</Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                borderColor: '#4EB2E4',
                backgroundColor: '#4EB2E4',
              }}
              activeOpacity={0.8}
              onPress={() => shopNow()}>
              <Text style={styles.textButton}>Recomprar</Text>
            </TouchableOpacity>
          </View>

          <Factura
            carItem={carItem}
            selectedCarnet={selectedCarnet}
            trackcode={trackcode}
            codes={codes}
            number={number}
          />
          {!status && (
            <>
              <NoTrackCancel />
            </>
          )}
          {carItem.category.ship === 'MARITIMO' && status && (
            <>
              <SingleTrackMar
                createdAt={createdAt}
                trackcode={trackcode}
                codes={codes}
                openModalize={openModalize}
              />
            </>
          )}
          {carItem.category.ship === 'AEREO' && status && (
            <>
              <SingleTrack
                createdAt={createdAt}
                trackcode={trackcode}
                codes={codes}
                openModalize={openModalize}
              />
            </>
          )}
        </View>
        <View style={{height: 100}} />
      </TopScrollGradient>
    </>
  );
};

const styles = StyleSheet.create({
  totalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: height * 0.07,
    marginBottom: 20,
    resizeMode: 'center',
  },
  textButton: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    marginHorizontal: 15,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
