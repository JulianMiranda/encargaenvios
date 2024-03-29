import React from 'react';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {StyleSheet, Text, View} from 'react-native';
import {SliderSubcategories} from './SliderSubcategories';

interface Props {
  subcategory?: Subcategory;
}

export const SubcategoryModalize = ({subcategory}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{subcategory?.name}</Text>
        {subcategory && subcategory.images.length > 0 && (
          <SliderSubcategories images={subcategory?.images} />
        )}
        {subcategory && subcategory?.info.length > 0 && (
          <Text style={styles.info}>Detalles</Text>
        )}
        {subcategory?.info.map((info, index) => (
          <Text key={index}>• {info}</Text>
        ))}
      </View>
      <View style={{height: 150}} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {fontSize: 22, fontWeight: 'bold'},
  info: {fontSize: 16, fontWeight: '700', marginTop: 10},
});
