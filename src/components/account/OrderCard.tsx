import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import {Order} from '../../interfaces/Order.interface';
import {RootStackParams} from '../../navigator/AccountStack';
import {FadeInImage} from '../common/FadeInImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  order: Order;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SingleTrackScreen'> {}
export const OrderCard = ({order}: Props) => {
  const {car, currency, cost, trackcode} = order;

  const navigation = useNavigation<PropsNavigation>();

  return (
    <>
      <View style={styles.line} />

      <TouchableOpacity
        activeOpacity={0.9}
        style={{width: '95%'}}
        onPress={() =>
          navigation.navigate('SingleTrackScreen', {order: order})
        }>
        <View style={styles.imageView}>
          <FadeInImage
            uri={car[0].category.image.url}
            style={styles.imageProps}
          />

          <View style={{flex: 4, justifyContent: 'space-around'}}>
            <View>
              <Text style={styles.nameCategory} numberOfLines={1}>
                {car[0].category.name}
              </Text>
            </View>
            <View style={styles.priceBefore}>
              <View style={{}}>
                {/*  <Text style={styles.text16}>Antes {''}</Text> */}
                <Text style={styles.text12}>
                  Comprada {moment(order.createdAt).calendar()}
                </Text>
              </View>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Icon name="chevron-right" size={24} color={'#101010'} />
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
  imageProps: {
    flex: 2,
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
  text12: {
    fontSize: 12,
    color: '#000',
    fontWeight: '300',
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
    color: '#000',
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
