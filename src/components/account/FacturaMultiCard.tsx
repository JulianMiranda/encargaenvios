import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FadeInImage} from '../common/FadeInImage';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/AccountStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {CarItemProps} from '../../interfaces/Shop.Interface';
import {Code, Trackcode} from '../../interfaces/Order.interface';

interface Props {
  cantidad: number;
  carItem: CarItemProps;
  trackcode: Trackcode;
  selectedCarnet: any[];
  codes: Code[];
  createdAt: Date;
  order: string;
  status: boolean;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SingleOrderScreen'> {}
const {width} = Dimensions.get('window');
export const FacturaMultiCard = ({
  carItem,
  trackcode,
  selectedCarnet,
  cantidad,
  codes,
  order,
  createdAt,
  status,
}: Props) => {
  const navigation = useNavigation<PropsNavigation>();
  const array = [];
  for (let i = 0; i < cantidad; i++) {
    array.push(i);
  }
  const repetCodes = codes.filter(
    code => code.category === carItem.category.id,
  );
  return (
    <>
      {array.map(a => (
        <View key={a}>
          <TouchableOpacity
            style={{marginBottom: 50}}
            onPress={() =>
              navigation.navigate('SingleOrderScreen', {
                number: a,
                carItem,
                trackcode,
                selectedCarnet,
                codes: repetCodes,
                createdAt,
                order,
                status,
              })
            }
            activeOpacity={0.8}>
            {carItem.category.name !== carItem.category.subname && (
              <Text style={{...styles.date}}>{carItem.category.subname}</Text>
            )}

            <View
              style={{
                ...styles.cardContainer,
              }}>
              {!status && (
                <Image
                  source={require('../../assets/cancelled.png')}
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
              )}
              <View style={styles.cardInside}>
                {carItem.category.image && (
                  <FadeInImage
                    uri={carItem.category.image.url}
                    style={styles.productImage}
                  />
                )}

                <Text style={{...styles.name}}>{carItem.category.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: width * 0.4,
    width: width * 0.4,
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
  name: {
    fontSize: 16,
    top: 4,
    left: 10,
    color: 'black',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    top: 4,
    left: 10,
    color: 'black',
    marginBottom: 10,
  },
  productImage: {
    height: width * 0.4,
    width: width * 0.4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  cardInside: {borderRadius: 10},
});
