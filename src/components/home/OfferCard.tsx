import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {RootStackParams} from '../../navigator/HomeStack';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {FadeInImage} from '../common/FadeInImage';
import {PromoString} from './PromoString';
import {useNodeInPromo} from '../../hooks/useNodeInPromo';

interface Props {
  offer: Category;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}
export const OfferCard = ({offer}: Props) => {
  const {name, image, priceDiscount, price, nodes} = offer;
  const navigation = useNavigation<PropsNavigation>();

  const discount = (100 * (price - priceDiscount)) / price;

  const {nodeInPromo} = useNodeInPromo(nodes);
  return (
    <>
      <View style={styles.line} />

      <TouchableOpacity
        activeOpacity={0.9}
        style={{width: '95%'}}
        onPress={() => {
          navigation.navigate('CategoryScreen', {
            category: offer,
          });
        }}>
        <View style={styles.imageView}>
          <View style={styles.imageContainer}>
            <FadeInImage uri={image.url} style={styles.imageProps} />
            {nodeInPromo && <PromoString />}
          </View>

          <View style={{flex: 4, justifyContent: 'space-between'}}>
            <View style={styles.discountText}>
              <Text style={styles.text20}>{discount.toFixed(0)}%</Text>
            </View>

            <View style={styles.priceBefore}>
              <View style={{flexDirection: 'row'}}>
                {/*  <Text style={styles.text16}>Antes {''}</Text> */}
                <Text style={styles.text16Line}>{formatToCurrency(price)}</Text>
              </View>
              <View style={styles.now}>
                <Text style={styles.text18}>Ahora {''}</Text>
                <Text style={styles.text18} numberOfLines={1}>
                  {formatToCurrency(priceDiscount)}
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.nameCategory} numberOfLines={1}>
                {name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  imageView: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  imageContainer: {
    flex: 2,
    width: '100%',
    height: 100,
    alignSelf: 'flex-start',
  },
  imageProps: {
    width: '100%',
    height: 100,
    alignSelf: 'flex-start',
  },
  discountText: {
    backgroundColor: 'red',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    marginLeft: 10,
  },
  priceBefore: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  now: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    flexDirection: 'row',
    marginLeft: 20,
    borderRadius: 4,
    paddingHorizontal: 5,
  },

  text16: {
    fontSize: 16,
    color: '#c0c0c0',
  },
  text16Line: {
    fontSize: 16,
    color: '#c0c0c0',
    textDecorationLine: 'line-through',
  },
  text18: {
    fontSize: 18,
    color: '#ffffff',
  },
  text20: {
    fontSize: 20,
    color: '#fff',
  },
  nameCategory: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
    marginRight: 15,
    marginBottom: 5,
  },
});
