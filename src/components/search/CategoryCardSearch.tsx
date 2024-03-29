import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {FadeInImage} from '../common/FadeInImage';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {discount} from '../../utils/discount';
import {RootStackParams} from '../../navigator/SearchStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useNodeInPromo} from '../../hooks/useNodeInPromo';
import {PromoString} from '../home/PromoString';

interface Props {
  item: Category;
}
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategorySearchScreen'> {}

const {width} = Dimensions.get('window');
export const CategoryCardSearch = ({item}: Props) => {
  const {price, priceDiscount, image, name, soldOut, createdAt, nodes} = item;

  const navigation = useNavigation<PropsNavigation>();

  const {nodeInPromo} = useNodeInPromo(nodes);

  const fechaInicio = new Date(createdAt).getTime();
  const fechaFin = new Date().getTime();
  const diff = fechaFin - fechaInicio;
  const days = diff / (1000 * 60 * 60 * 14);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{marginBottom: 40}}
      onPress={() => {
        navigation.navigate('CategorySearchScreen', {
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
              style={styles.soldOut}
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
    height: width * 0.47,
    width: width * 0.47,
    marginBottom: 60,
    borderRadius: 10,
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
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    color: 'white',
    borderRadius: 2,
  },
  productImage: {
    height: width * 0.47,
    width: width * 0.47,
    borderRadius: 10,
  },
  soldOut: {
    zIndex: 9999999,
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: width * 0.47,
    width: width * 0.47,
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
