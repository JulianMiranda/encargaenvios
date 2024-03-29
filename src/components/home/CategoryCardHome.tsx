import React from 'react';
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
import {PromoString} from './PromoString';
import {useNodeInPromo} from '../../hooks/useNodeInPromo';

interface Props {
  item: Category;
}
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}

const {width} = Dimensions.get('window');
export const CategoryCardHome = ({item}: Props) => {
  const {price, priceDiscount, image, name, soldOut, createdAt, nodes} = item;

  const navigation = useNavigation<PropsNavigation>();

  const fechaInicio = new Date(createdAt).getTime();
  const fechaFin = new Date().getTime();
  const diff = fechaFin - fechaInicio;
  const days = diff / (1000 * 60 * 60 * 14);
  const {nodeInPromo} = useNodeInPromo(nodes);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{marginLeft: 5}}
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
          {nodeInPromo && <PromoString />}
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

          <Text
            style={{
              ...styles.name,
              textDecorationLine: soldOut ? 'line-through' : 'none',
            }}
            numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={{
              ...styles.price,
              ...styles.price2,
            }}>
            {formatToCurrency(discount(price, priceDiscount))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
    height: width * 0.37,
    width: width * 0.37,
    marginBottom: 60,
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
    fontSize: 16,
    top: 4,
    left: 10,
    color: 'black',
    fontWeight: '500',
    maxWidth: '75%',
  },
  price: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
    fontWeight: '500',
  },
  price2: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    color: 'white',
    borderRadius: 2,
  },
  productImage: {
    height: width * 0.37,
    width: width * 0.37,
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
