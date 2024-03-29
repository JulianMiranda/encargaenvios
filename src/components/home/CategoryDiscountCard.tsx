/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {FadeInImage} from '../common/FadeInImage';
import {RootStackParams} from '../../navigator/HomeStack';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {ShopContext} from '../../context/shop/ShopContext';
import {PromoString} from './PromoString';

interface Props {
  item: Category;
}
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}

export const CategoryDiscountCard = ({item}: Props) => {
  const {price, priceDiscount, image, name, nodes} = item;

  const navigation = useNavigation<PropsNavigation>();

  const [nodeInPromo, setNodeInPromo] = useState(false);
  const discount = (100 * (price - priceDiscount)) / price;
  const {discountPromo} = useContext(ShopContext);

  useEffect(() => {
    const nodesList = nodes.map(n => n.id);
    const nodesPromo = discountPromo.nodes.map(n => {
      if (n !== undefined) {
        return n;
      }
    });
    if (nodesList.some(node => nodesPromo.includes(node))) {
      setNodeInPromo(true);
    }
  }, [nodes, discountPromo]);
  return (
    <>
      <View style={styles.line} />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('CategoryScreen', {
            category: item,
          });
        }}>
        <View style={{flexDirection: 'row', marginVertical: 2}}>
          <View style={styles.image}>
            <FadeInImage uri={image.url} style={styles.image} />
            {nodeInPromo && <PromoString />}
          </View>
          <View style={{flex: 4, justifyContent: 'space-between'}}>
            <View style={styles.discount}>
              <Text style={{fontSize: 20, color: '#fff'}}>
                {discount.toFixed(0)}%
              </Text>
            </View>

            <View style={styles.card}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16, color: '#c0c0c0'}}>Antes {''}</Text>
                <Text style={styles.textLine}>{formatToCurrency(price)}</Text>
              </View>
              <View style={styles.viewNow}>
                <Text style={styles.text18}>Ahora {''}</Text>
                <Text style={styles.text18} numberOfLines={1}>
                  {formatToCurrency(priceDiscount)}
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.name} numberOfLines={1}>
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
  image: {
    flex: 2,
    width: '100%',
    height: 100,
    alignSelf: 'flex-start',
  },
  discount: {
    backgroundColor: 'red',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewNow: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    flexDirection: 'row',
    marginLeft: 20,
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLine: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#c0c0c0',
  },
  text18: {fontSize: 18, color: '#ffffff'},
  name: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
    marginRight: 15,
    marginBottom: 5,
  },
});
