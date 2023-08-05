import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FadeInImage} from '../common/FadeInImage';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {SetItemCar} from './SetItemCar';
import {ShopContext} from '../../context/shop/ShopContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetModalizeProps} from '../../hooks/useGetModalizeProps';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  cantidad: number;
  category: Category;
  navigateCategory: (id: string) => void;
}
export const ProductShop = ({category, cantidad, navigateCategory}: Props) => {
  const {image, name, status, soldOut} = category;
  const {isLoading} = useGetModalizeProps(category);
  const {updateCarItem, unsetItem} = useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const updateCantidad = (categoryRef: Category, cantidadRef: number) => {
    updateCarItem({category: categoryRef, cantidad: cantidadRef});
  };

  return (
    <>
      <View style={styles.container}>
        {!status && (
          <View style={styles.noStatus}>
            <Text style={styles.textnoStatus}>
              Este producto ya no está disponible
            </Text>
          </View>
        )}
        {soldOut && (
          <View style={styles.noStatus}>
            <Text style={styles.textnoStatus}>Este producto está agotado</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => unsetItem(category)}>
          <Icon
            name="close-circle-outline"
            size={26}
            color="red"
            style={{position: 'absolute', top: 5, right: 5}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigateCategory(category.id)}>
          <FadeInImage uri={image.url} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.subContainer2}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigateCategory(category.id)}>
            <Text numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            {isLoading ? (
              <ActivityIndicator color={colors.card} />
            ) : (
              <>
                {category.priceDiscount && category.priceDiscount !== 0 ? (
                  <>
                    <Text style={styles.text16Line}>
                      {formatToCurrency(category.price)}
                    </Text>
                    <Text style={styles.text18}>
                      {formatToCurrency(category.priceDiscount)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.text18}>
                    {formatToCurrency(category.price)}
                  </Text>
                )}
              </>
            )}
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <SetItemCar
              category={category}
              cantidad={cantidad}
              updateCantidad={updateCantidad}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    width: '90%',
    height: 100,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    height: 100,
    width: 90,
    borderRadius: 8,
    flex: 2,
    alignSelf: 'flex-start',
  },
  subContainer2: {flex: 6, paddingLeft: 5},
  name: {fontSize: 18, marginRight: 50, color: '#000'},
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999999999,
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginEnd: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 1000,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  noStatus: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    justifyContent: 'center',
  },
  textnoStatus: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'red',
  },
});
