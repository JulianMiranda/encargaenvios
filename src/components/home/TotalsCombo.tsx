import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {calcularCombo} from '../../utils/calculateCost';
import {ShopContext} from '../../context/shop/ShopContext';
import {AuthContext} from '../../context/auth/AuthContext';

export const TotalsCombo = () => {
  const {pesoTotal, costoTotal} = useContext(ShopContext);
  const {prices} = useContext(AuthContext);
  const gramosALibras = (gramos: number) => {
    const factorConversion = 453.59237;
    const libras = gramos / factorConversion;
    return libras;
  };

  return (
    <View style={styles.totales}>
      <View>
        {pesoTotal !== 0 ? (
          <Text>
            Peso total:{' '}
            <Text style={styles.boldText}>
              {pesoTotal / 1000} Kg = {gramosALibras(pesoTotal).toFixed(2)} lbs
            </Text>
          </Text>
        ) : (
          <View>
            <Text> </Text>
          </View>
        )}
        {costoTotal !== 0 ? (
          <Text>
            Costo de productos:{' '}
            <Text style={styles.boldText}>{formatToCurrency(costoTotal)}</Text>
            {/*  <Text style={styles.boldText}>
            {calcularCombo({costoTotal, pesoTotal, prices}) !== 0
              ? formatToCurrency(calcularCombo({costoTotal, pesoTotal, prices}))
              : 'Error'}
          </Text> */}
          </Text>
        ) : (
          <View>
            <Text> </Text>
          </View>
        )}
      </View>
      <View>
        {costoTotal !== 0 ? (
          <Text>
            Total:{' '}
            <Text style={styles.boldText}>
              {calcularCombo({costoTotal, pesoTotal, prices}) !== 0
                ? formatToCurrency(
                    calcularCombo({costoTotal, pesoTotal, prices}),
                  )
                : 'Error'}
            </Text>
          </Text>
        ) : (
          <View>
            <Text> </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  totales: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {fontWeight: 'bold'},
});
