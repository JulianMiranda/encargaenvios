import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {FacturaCard} from './FacturaCard';
import {Order} from '../../interfaces/Order.interface';
import moment from 'moment';
import {FacturaMultiCard} from './FacturaMultiCard';
import {FacturaComboCard} from './FacturaComboCard';

interface Props {
  order: Order;
}

export const FacturasCarousel = ({order}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{moment(order.createdAt).calendar()}</Text>
      </View>

      <FlatList
        data={order.car}
        keyExtractor={(order, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => (
          <>
            {order.combo.length > 0 && (
              <FacturaComboCard
                codes={order.codes}
                comboCode={order.comboCode}
                comboItem={order.combo}
                selectedCarnet={order.selectedCarnet}
                trackcode={order.trackcode}
                createdAt={order.createdAt}
                order={order.order}
                status={order.status}
              />
            )}
            {item.cantidad > 1 ? (
              <>
                <FacturaMultiCard
                  cantidad={item.cantidad}
                  codes={order.codes}
                  carItem={item}
                  selectedCarnet={order.selectedCarnet}
                  trackcode={order.trackcode}
                  createdAt={order.createdAt}
                  order={order.order}
                  status={order.status}
                />
              </>
            ) : (
              <FacturaCard
                codes={order.codes}
                carItem={item}
                selectedCarnet={order.selectedCarnet}
                trackcode={order.trackcode}
                createdAt={order.createdAt}
                order={order.order}
                status={order.status}
              />
            )}
          </>
        )}
        ListFooterComponentStyle={styles.listFooter}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#4EB2E4',
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  listFooter: {
    width: 100,
  },
});
