import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ShopContext} from '../../context/shop/ShopContext';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {RootStackParams} from '../../navigator/HomeStack';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {FadeInImage} from '../common/FadeInImage';

interface Props {
  category: Category;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}
export const RecomendedCard = ({category}: Props) => {
  const {name, image, priceDiscount, price} = category;

  const {setItem} = useContext(ShopContext);
  const navigation = useNavigation<PropsNavigation>();

  const shopNow = async () => {
    await setItem({category: {...category}, cantidad: 1});
    navigation.navigate('Shop', {screen: 'ShopScreen'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <TouchableOpacity
        activeOpacity={0.9}
        style={{width: '95%'}}
        onPress={() => {
          navigation.navigate('CategoryScreen', {
            category: category,
          });
        }}>
        <View style={styles.imageView}>
          <FadeInImage uri={image.url} style={styles.imageProps} />

          <View style={{flex: 4}}>
            <View style={{flex: 1}}>
              <View>
                <Text style={styles.nameCategory} numberOfLines={1}>
                  {name}
                </Text>
              </View>
              <View style={styles.priceBefore}>
                <View style={styles.now}>
                  <Text style={styles.text18} numberOfLines={1}>
                    {formatToCurrency(
                      priceDiscount && priceDiscount !== 0
                        ? priceDiscount
                        : price,
                    )}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                borderColor: '#4EB2E4',
                backgroundColor: '#4EB2E4',
                alignSelf: 'flex-end',
                zIndex: 1000,
              }}
              activeOpacity={0.8}
              onPress={() => shopNow()}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.textButton}>Comprar ahora</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {height: 170},
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
    height: 150,
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
    alignItems: 'center',
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
    marginLeft: 15,
    color: '#000',
    marginRight: 15,
    marginBottom: 5,
  },
  textButton: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    borderRadius: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
