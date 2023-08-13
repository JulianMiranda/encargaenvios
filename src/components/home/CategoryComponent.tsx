/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {FadeInImage} from '../common/FadeInImage';
import {useGetModalizeProps} from '../../hooks/useGetModalizeProps';
import {ShopContext} from '../../context/shop/ShopContext';
import {SetItemCar} from '../shop/SetItemCar';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {BackButton} from '../common/BackButton';
import {useNavigation} from '@react-navigation/native';
import {DescriptionCategory} from './DescriptionCategory';
import {AviablesColors} from './AviablesColors';
import {InfoCategory} from './InfoCategory';
import {RootStackParams} from '../../navigator/ShopStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {PricesView} from './PricesView';
import {Slider} from './Slider';
import {Image as PImage} from '../../interfaces/Image.interface';
import {ModalImages} from '../common/ModalImages';
import {isIphoneXorAbove} from '../../utils/isIphone';

interface Props {
  category: Category;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'ShopScreen'> {}

const {height} = Dimensions.get('window');
export const CategoryComponent = ({category}: Props) => {
  const {
    description,
    price,
    priceDiscount,
    ship,
    soldOut,
    name,
    subname,
    createdAt,
    image,
    info,
    aviableColors,
  } = category;
  const {setItem} = useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {isLoading, subcategoriesAsc} = useGetModalizeProps(category);
  const navigation = useNavigation<PropsNavigation>();
  const [imageFront, setImageFront] = useState<PImage[]>([image]);
  const [cantidad, setCantidad] = useState<number>(1);

  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(image);

  const [colorSelected, setColorSelected] = useState<string[]>([]);

  const fechaInicio = new Date(createdAt).getTime();
  const fechaFin = new Date().getTime();
  const diff = fechaFin - fechaInicio;
  const days = diff / (1000 * 60 * 60 * 14);

  const updateCantidad = (subcategoryRef: Category, cantidadRef: number) => {
    if (cantidadRef > 0) {
      setCantidad(cantidadRef);
    }
  };

  const shopNow = async () => {
    await setItem({category, cantidad});
    navigation.navigate('Shop', {screen: 'ShopScreen'});
  };

  useEffect(() => {
    if (aviableColors && aviableColors.length === 1) {
      setColorSelected(aviableColors);
    }
  }, []);

  useEffect(() => {
    subcategoriesAsc.map(subcat =>
      subcat.images.map(imageSubc => imageFront.push(imageSubc)),
    );
  }, [subcategoriesAsc]);

  return (
    <>
      <BackButton navigation={navigation} />
      <ScrollView>
        <Slider
          images={imageFront}
          setIsVisible={setIsVisible}
          setImageIndex={setImageIndex}
        />
        {soldOut && (
          <View style={styles.soldOut}>
            <Image
              source={require('../../assets/agotado.png')}
              style={{width: 500, height: 500}}
            />
          </View>
        )}
        {days < 24 && (
          <Image
            source={require('../../assets/nuevo_producto3.png')}
            style={styles.newImageProduct}
          />
        )}

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.name}>{name}</Text>
            {name !== subname && <Text style={styles.subname}>{subname}</Text>}
          </View>
          {!soldOut && (
            <View style={styles.setItem}>
              <SetItemCar
                category={category}
                cantidad={cantidad}
                updateCantidad={updateCantidad}
              />
            </View>
          )}
        </View>
        <PricesView price={price} priceDiscount={priceDiscount} />
        {subcategoriesAsc.length > 1 && (
          <View style={styles.contenidoView}>
            <Text style={styles.contenidoText}>Contenido</Text>
            {subcategoriesAsc.map((subcat, index) => (
              <View key={index}>
                <Text style={{color: '#000'}}>{subcat.name}</Text>
              </View>
            ))}
            <View style={styles.divider} />
          </View>
        )}
        <AviablesColors
          aviableColors={
            aviableColors && aviableColors.length > 0 ? aviableColors : []
          }
          cantidad={cantidad}
          colorSelected={colorSelected}
          setColorSelected={setColorSelected}
        />
        <DescriptionCategory ship={ship} description={description} />
        <InfoCategory info={info} />

        <TouchableOpacity
          style={{
            ...styles.button,
            borderColor: soldOut ? '#f1f1f1' : '#4EB2E4',
            backgroundColor: soldOut ? '#f1f1f1' : '#4EB2E4',
          }}
          activeOpacity={soldOut ? 1 : 0.8}
          onPress={() => {
            soldOut ? {} : shopNow();
          }}>
          <View style={{justifyContent: 'center'}}>
            <View
              style={{
                borderColor: soldOut ? '#f1f1f1' : '#4EB2E4',
                ...styles.addbutton,
              }}>
              <Text style={{color: soldOut ? '#f1f1f1' : '#4EB2E4'}}>
                {cantidad}
              </Text>
            </View>
            <Text style={styles.textButton}>Comprar ahora</Text>
          </View>
        </TouchableOpacity>

        {/*  <View style={{height: 150}} /> */}
        <ModalImages
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          images={[
            imageIndex,
            ...imageFront.filter(image => image.id !== imageIndex.id),
          ]}
        />
      </ScrollView>
      <View
        style={{
          height: isIphoneXorAbove ? 150 : 120,
          /*  height:
            Platform.OS === 'ios' ? height * 0.14 + 40 : height * 0.11 + 40, */
        }}
      />
      <TouchableOpacity
        style={{
          ...styles.button,
          borderColor: soldOut ? '#f1f1f1' : colors.card,
          backgroundColor: soldOut ? '#f1f1f1' : colors.card,
          position: 'absolute',
          bottom: isIphoneXorAbove ? 110 : 80,
          /* bottom: Platform.OS === 'ios' ? height * 0.14 : height * 0.11, */
        }}
        activeOpacity={soldOut ? 1 : 0.8}
        onPress={() => {
          soldOut ? {} : setItem({category, cantidad});
        }}>
        <View style={{justifyContent: 'center'}}>
          <View
            style={{
              borderColor: soldOut ? '#f1f1f1' : colors.card,
              ...styles.addbutton,
            }}>
            <Text style={{color: soldOut ? '#f1f1f1' : colors.card}}>
              {cantidad}
            </Text>
          </View>

          <Text style={styles.textButton}>Añadir al carrito</Text>
        </View>
      </TouchableOpacity>
      {isLoading && (
        <ActivityIndicator style={{flex: 1}} color={colors.card} size={32} />
      )}
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
    width: '80%',
  },
  contenidoView: {marginLeft: 15},
  contenidoText: {fontSize: 22, fontWeight: 'bold', color: '#000'},
  imageButton: {
    borderRadius: 50,
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
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  setItem: {alignSelf: 'flex-end'},
  newImageProduct: {
    position: 'absolute',
    top: height * 0.33,
    alignSelf: 'flex-start',
    marginLeft: 5,
    height: 75,
    width: 75,
  },
  soldOut: {
    alignSelf: 'center',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#000',
  },
  subname: {
    fontSize: 18,
    marginLeft: 5,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  column: {
    maxWidth: '70%',
    flexDirection: 'column',
  },
  addbutton: {
    position: 'absolute',
    right: -25,
    backgroundColor: 'white',
    borderRadius: 100,
    height: 27,
    borderWidth: 1,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  divider: {
    height: 1,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
});
