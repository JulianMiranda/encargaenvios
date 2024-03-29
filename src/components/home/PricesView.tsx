/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {PromoString} from './PromoString';
interface Props {
  price: number;
  priceDiscount: number;
  nodeInPromo: boolean;
}
export const PricesView = ({price, priceDiscount, nodeInPromo}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <>
      <View style={styles.divider} />
      <View style={styles.rowView}>
        <Text
          style={{
            ...styles.price,
            fontSize: priceDiscount !== 0 ? 18 : 26,
            textDecorationLine:
              priceDiscount !== 0 && typeof priceDiscount === 'number'
                ? 'line-through'
                : 'none',
            color:
              priceDiscount !== 0 && typeof priceDiscount === 'number'
                ? '#c0c0c0'
                : colors.primary,
          }}>
          {formatToCurrency(price)}
        </Text>
        {priceDiscount !== 0 && typeof priceDiscount === 'number' && (
          <Text
            style={{
              marginLeft: 10,
              ...styles.price,
              color: colors.primary,
            }}>
            {formatToCurrency(priceDiscount)}
          </Text>
        )}
        {nodeInPromo && (
          <PromoString
            style={{
              left: 5,
              position: 'relative',
              alignSelf: 'flex-start',
            }}
          />
        )}
      </View>
      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 5,
  },
  price: {fontWeight: 'bold', fontSize: 28},
  viewGalorePrice: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 3,
  },
  viewUnitPrice: {
    backgroundColor: 'white',
    padding: 3,
    marginBottom: 3,
  },
  divider: {
    marginTop: 5,
    height: 1,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  aviableSizes: {fontSize: 18},
  gramos: {fontSize: 16},
});
