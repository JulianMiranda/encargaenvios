import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {FadeInImage} from '../common/FadeInImage';
import {useGetModalizeProps} from '../../hooks/useGetModalizeProps';
import {ShopContext} from '../../context/shop/ShopContext';
import {SetItemCar} from '../shop/SetItemCar';
import {Category} from '../../interfaces/CategoryResponse.interface';

interface Props {
  category: Category;
}

const {height} = Dimensions.get('window');
export const ModalizeContent = ({category}: Props) => {
  const {setItem} = useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {isLoading, subcategoriesAsc} = useGetModalizeProps(category);

  const [imageFront, setImageFront] = useState<string>('');
  const [cantidad, setCantidad] = useState<number>(1);

  const updateCantidad = (subcategoryRef: Category, cantidadRef: number) => {
    if (cantidadRef > 0) {
      setCantidad(cantidadRef);
    }
  };

  useEffect(() => {
    setImageFront(category.image.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={{flex: 1, height: height * 0.8}}>
        {imageFront && (
          <FadeInImage
            uri={imageFront}
            style={{height: height * 0.3, width: '100%'}}
          />
        )}
        {isLoading && (
          <ActivityIndicator style={{flex: 1}} color={colors.card} size={32} />
        )}
        <View style={styles.viewImageButton}>
          {subcategoriesAsc.map((subcat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageButton}
              onPress={() => {
                setImageFront(subcat.images ? subcat.images[0].url : '');
              }}>
              {subcat.images && (
                <FadeInImage
                  uri={subcat.images[0].url}
                  style={{height: 20, width: 20}}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.setItem}>
          <SetItemCar
            category={category}
            cantidad={cantidad}
            updateCantidad={updateCantidad}
          />
        </View>
        <View style={styles.contenidoView}>
          <Text style={styles.contenidoText}>Contenido</Text>
          {subcategoriesAsc.map((subcat, index) => (
            <View key={index}>
              <Text style={{color: '#000'}}>{subcat.name}</Text>
            </View>
          ))}
        </View>
        {/*  <Text>{category.name}</Text> */}
      </View>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.card}}
        activeOpacity={0.8}
        onPress={() => setItem({category, cantidad})}>
        <Text style={styles.textButton}>Añadir</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  textButton: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  button: {
    position: 'absolute',
    bottom: 0,

    alignSelf: 'center',
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
    width: 170,
  },
  contenidoView: {marginLeft: 15},
  contenidoText: {fontSize: 22, fontWeight: 'bold', color: '#000'},
  imageButton: {
    borderRadius: 50,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewImageButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  setItem: {alignSelf: 'flex-end'},
});
