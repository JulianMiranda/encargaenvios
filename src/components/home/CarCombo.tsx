import React, {useContext, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ShopContext} from '../../context/shop/ShopContext';
import {FadeInImage} from '../common/FadeInImage';
import {AnimatedText} from '../common/AnimatedText';

export const CarCombo = () => {
  const {combo, comboPrev, unsetItemCombo, unsetItemComboPrev} =
    useContext(ShopContext);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleContentSizeChange = (
    contentWidth: number,
    contentHeight: number,
  ) => {
    // Desplaza automáticamente al final de la lista cuando cambia el contenido
    scrollViewRef.current?.scrollToEnd({animated: true});
  };
  return (
    <ScrollView
      style={styles.container}
      ref={scrollViewRef}
      onContentSizeChange={handleContentSizeChange}>
      {combo.length === 0 && comboPrev.length === 0 && (
        <AnimatedText text="Añade artículos a tu cesta" />
      )}

      {combo.map((item, index) => (
        <View key={index} style={styles.comboItem}>
          <View style={styles.info}>
            <Text style={styles.textCantidad}>{item.cantidad}</Text>
            <FadeInImage
              uri={item.subcategory.images[0].url}
              style={styles.image}
            />
            <Text style={{...styles.textItem, color: '#40A649'}}>
              {item.subcategory.name}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.trash}
            activeOpacity={0.8}
            onPress={() => unsetItemCombo(item.subcategory)}>
            <Icon style={styles.icon} name={'trash'} color={'red'} size={18} />
          </TouchableOpacity>
        </View>
      ))}
      {comboPrev.map((item, index) => (
        <View key={index + 'prev'} style={styles.comboItem}>
          <View style={styles.info}>
            <Text style={styles.textCantidad}>{item.cantidad}</Text>
            <FadeInImage
              uri={item.subcategory.images[0].url}
              style={styles.image}
            />
            <Text style={styles.textItem}>{item.subcategory.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.trash}
            activeOpacity={0.8}
            onPress={() => unsetItemComboPrev(item.subcategory)}>
            <Icon style={styles.icon} name={'trash'} color={'red'} size={18} />
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.separator} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    borderColor: 'rgba(0, 0, 0,0.5)',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    padding: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  table: {flex: 1 /* , minHeight: 150 */},
  comboItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    justifyContent: 'space-between',
  },
  info: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  textItem: {marginLeft: 5, flex: 12},
  textCantidad: {marginLeft: 3, flex: 1},
  image: {height: 25, width: 25, flex: 1},
  icon: {},
  trash: {padding: 5, alignItems: 'center'},
  separator: {height: 15},
});
