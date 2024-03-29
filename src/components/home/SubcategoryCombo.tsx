import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {FadeInImage} from '../common/FadeInImage';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ShopContext} from '../../context/shop/ShopContext';
import {formatToCurrency} from '../../utils/formatToCurrency';

interface Props {
  subcategory: Subcategory;
  openModal: (subcategory: Subcategory) => void;
  node: string;
}
export const SubcategoryCombo = ({subcategory, openModal, node}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {setItemComboPrev} = useContext(ShopContext);
  const handleSubcategory = () => {
    openModal(subcategory);
  };

  const handleAdd = () => {
    setItemComboPrev({subcategory, cantidad: 1, node: node});
  };
  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.8}
          onPress={handleSubcategory}>
          <FadeInImage uri={subcategory.images[0].url} style={styles.image} />
          <Text numberOfLines={1} style={styles.name}>
            {subcategory.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.price}
          activeOpacity={0.8}
          onPress={handleSubcategory}>
          <Text style={{...styles.price1}}>
            {formatToCurrency(subcategory.cost)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAdd}
          style={{...styles.add, backgroundColor: colors.card}}>
          <Text numberOfLines={1} style={styles.addText}>
            Añadir
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 50,
  },
  price: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 2,
    paddingHorizontal: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  add: {
    flex: 1,
    paddingHorizontal: 10,
    marginRight: 5,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {paddingLeft: 3},
  addText: {color: '#fff'},
  image: {
    height: 30,
    width: 30,
  },
  modalize: {
    zIndex: 99999,
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: 'red',
  },
  price1: {
    fontWeight: '500',
    color: 'white',
    borderRadius: 2,
    paddingVertical: 1,
  },
});
