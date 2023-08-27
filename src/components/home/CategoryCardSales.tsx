import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {FadeInImage} from '../common/FadeInImage';
import {RootStackParams} from '../../navigator/HomeStack';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {discount} from '../../utils/discount';
import {Category} from '../../interfaces/CategoryResponse.interface';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface Props {
  item: Category;
  index: number;
}
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}

const {width} = Dimensions.get('window');
export const CategoryCardHomeSales = ({item, index}: Props) => {
  const {price, priceDiscount, image, name, soldOut, createdAt} = item;
  const [argument, setArgument] = useState('');
  const [icon, setIcon] = useState('history');

  const navigation = useNavigation<PropsNavigation>();

  useEffect(() => {
    makeArgument();
  }, []);

  const makeArgument = () => {
    switch (index) {
      case 0:
        setArgument('Frecuente');
        setIcon('star');
        break;
      case 1:
        setArgument('Reciente');
        setIcon('history');
        break;
      case 2:
        setArgument('Comprado');
        setIcon('credit-card');
        break;
      case 3:
        setArgument('Sugerido');
        setIcon('bolt');
        break;
      default:
        setArgument('');
        setIcon('history');
        break;
    }
  };

  const fechaInicio = new Date(createdAt).getTime();
  const fechaFin = new Date().getTime();
  const diff = fechaFin - fechaInicio;
  const days = diff / (1000 * 60 * 60 * 14);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{}}
      onPress={() => {
        navigation.navigate('CategoryScreen', {
          category: item,
        });
      }}>
      <View
        style={{
          ...styles.cardContainer,
        }}>
        <View style={{borderRadius: 10}}>
          {days < 24 && (
            <Image
              source={require('../../assets/nuevo2.png')}
              style={styles.newImageProduct}
            />
          )}
          {soldOut && (
            <Image
              source={require('../../assets/agotado.png')}
              style={{...styles.soldOut}}
            />
          )}
          <FadeInImage uri={image.url} style={styles.productImage} />
          <View style={{...styles.textContainer}}>
            <Text
              style={{
                ...styles.price,
                ...styles.price2,
              }}>
              {formatToCurrency(discount(price, priceDiscount))}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 5,
              bottom: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 6,
              paddingHorizontal: 5,
              padding: 2,
            }}>
            <AwesomeIcon
              name={icon}
              size={12}
              color={'rgba(0,0,0,0.3)'}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.3)',
              }}
              numberOfLines={1}>
              {argument}
            </Text>
          </View>
          <Text
            style={{
              ...styles.name,
              textDecorationLine: soldOut ? 'line-through' : 'none',
            }}
            numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    height: width * 0.5,
    width: width * 0.5 - 10,
    marginTop: 50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textContainer: {},
  name: {
    fontSize: 14,
    top: 4,
    left: 10,
    color: 'black',
    fontWeight: '300',
    maxWidth: '75%',
  },
  price: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10,
    color: 'black',
    fontWeight: '500',
  },
  price2: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    color: 'white',
  },
  productImage: {
    height: width * 0.45,
    width: width * 0.45,
    borderRadius: 8,
  },
  soldOut: {
    zIndex: 9999999,
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: width * 0.37,
    width: width * 0.37,
    borderRadius: 10,
  },
  newImageProduct: {
    position: 'absolute',
    zIndex: 999999,
    top: 0,
    left: 0,
    height: 80,
    width: 80,
  },
});
