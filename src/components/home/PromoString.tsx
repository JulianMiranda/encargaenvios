import React, {useContext} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ShopContext} from '../../context/shop/ShopContext';

interface Props {
  style?: StyleProp<ViewStyle>;
}
export const PromoString = ({style}: Props) => {
  const {discountPromo} = useContext(ShopContext);
  return (
    <View
      style={{
        ...styles.container,
        ...(style as any),
      }}>
      <Text style={styles.text}>{discountPromo.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    zIndex: 99999,
    position: 'absolute',
    right: 3,
    top: 3,
    backgroundColor: '#8B4513',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  text: {fontSize: 10, color: '#fff'},
});
