import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../api/api';
import {ShopContext} from '../../context/shop/ShopContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {RootStackParams} from '../../navigator/HomeStack';
import {ProductShop} from './ProductShop';
import {FacturaShop} from './FacturaShop';
import {ComboShop} from './ComboShop';
interface Props {
  total: number;
  setTotal: (value: number) => void;
  openModalize: (dest?: 'top' | 'default' | undefined) => void;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}

const {height} = Dimensions.get('window');
export const ShopStepOne = ({total, setTotal, openModalize}: Props) => {
  const navigation = useNavigation<PropsNavigation>();
  const toast = useToast();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {car, combo} = useContext(ShopContext);

  const navigateCategory = async (id: string) => {
    try {
      const category = await api.get(`/categories/getOneUnAuth/${id}`);
      navigation.navigate('CategoryScreen', {
        category: category.data,
      });
    } catch (error) {
      toast.show('Error al navegar al Producto', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  };
  useEffect(() => {
    let totalCalc = 0;
    car.map(carItem => {
      if (!carItem.category.status || carItem.category.soldOut) {
        return;
      }
      if (
        carItem.category.priceDiscount &&
        carItem.category.priceDiscount !== 0
      ) {
        totalCalc =
          totalCalc + carItem.cantidad * carItem.category.priceDiscount;
      } else {
        totalCalc = totalCalc + carItem.cantidad * carItem.category.price;
      }
    });
    setTotal(totalCalc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car]);
  return (
    <>
      <View style={{}}>
        <View style={{marginLeft: 7}}>
          {combo.length > 0 && <ComboShop openModal={openModalize} />}
          {car.map((carItem, index) => (
            <ProductShop
              key={index}
              category={carItem.category}
              cantidad={carItem.cantidad}
              navigateCategory={navigateCategory}
            />
          ))}
          {(car.length > 0 || combo.length > 0) && <FacturaShop />}
          {car.length < 1 && combo.length < 1 && (
            <View style={{...styles.emptyImage, height: height - 250}}>
              <Image
                source={require('./../../assets/shop-emptycar.gif')}
                style={{width: 150, height: 150}}
              />
              <Text style={{marginTop: 10, fontSize: 16, color: '#000'}}>
                Tu carrito de compras está vacío
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('HomeScreen')}
                style={{
                  ...styles.emptyCarButton,
                  backgroundColor: colors.card,
                }}>
                <Text style={styles.emptyText}>Ir a la tienda</Text>
                <Icon
                  name="arrow-right"
                  color="white"
                  size={24}
                  style={{position: 'absolute', right: 14, top: 10}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  emptyCarButton: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  emptyImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  modalize: {
    zIndex: 99999,
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
});
