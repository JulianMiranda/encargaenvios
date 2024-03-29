import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/AccountStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {ComboItemProps} from '../../interfaces/Shop.Interface';
import {Code, Trackcode} from '../../interfaces/Order.interface';

interface Props {
  comboItem: ComboItemProps[];
  trackcode: Trackcode;
  codes: Code[];
  selectedCarnet: any[];
  createdAt: Date;
  order: string;
  comboCode: string;
  status: boolean;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SingleOrderScreen'> {}
const {width} = Dimensions.get('window');
export const FacturaComboCard = ({
  comboItem,
  trackcode,
  selectedCarnet,
  codes,
  createdAt,
  order,
  status,
  comboCode,
}: Props) => {
  const navigation = useNavigation<PropsNavigation>();

  const repetCodes = codes.filter(code => code.category);
  return (
    <>
      <TouchableOpacity
        style={{marginBottom: 50}}
        onPress={() =>
          navigation.navigate('SingleOrderComboScreen', {
            number: 0,
            comboItem,
            trackcode,
            codes: repetCodes,
            selectedCarnet,
            createdAt,
            order,
            status,
            comboCode,
          })
        }
        activeOpacity={0.8}>
        <Text style={{...styles.date}}>Combo</Text>
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
            <Image
              source={require('../../assets/Micesta.png')}
              style={styles.productImage}
            />

            <Text style={{...styles.name}}>Mi Cesta</Text>
          </View>
        </View>
      </TouchableOpacity>
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
