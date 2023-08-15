import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {CategoryCardHomeSales} from './CategoryCardSales';

interface Props {
  categories: Category[];
}
export const MostSales = ({categories}: Props) => {
  return (
    <>
      <View style={{...styles.container}}>
        <Text style={styles.text1}>Para</Text>
        <Text style={styles.text2}>ti</Text>
      </View>
      <View style={styles.containerCat}>
        {categories.map((category, index) => (
          <View key={index}>
            <CategoryCardHomeSales item={category} index={index} />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: -25,
    marginTop: 10,
  },
  containerCat: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  text1: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  text2: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
});
