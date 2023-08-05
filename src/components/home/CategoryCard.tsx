import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {FadeInImage} from '../common/FadeInImage';

interface Props {
  category: Category;
}

const {width} = Dimensions.get('window');
export const CategoryCard = ({category}: Props) => {
  return (
    <>
      <View
        style={{
          ...styles.cardContainer,
        }}>
        <View style={styles.cardInside}>
          <FadeInImage uri={category.image.url} style={styles.productImage} />
          <Text numberOfLines={1} style={{...styles.name}}>
            {category.name}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: width * 0.4,
    width: width * 0.4,
    marginBottom: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    fontSize: 22,
    top: 4,
    left: 10,
    color: 'black',
    marginBottom: 10,
  },
  productImage: {
    height: width * 0.4,
    width: width * 0.4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  cardInside: {borderRadius: 10},
});
