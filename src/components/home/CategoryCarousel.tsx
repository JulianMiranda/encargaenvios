import React from 'react';
import {FlatList, Text} from 'react-native';
import {CategoryCard} from './CategoryCard';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';

export const CategoryCarousel = () => {
  const {categoryList, loadCategories} = useCategoryPaginated();

  return (
    <>
      <FlatList
        ListHeaderComponent={<Text style={{color: '#000'}}>Categorías</Text>}
        data={categoryList}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadCategories}
        onEndReachedThreshold={0.4}
        horizontal
        renderItem={({item}) => <CategoryCard category={item} />}
      />
    </>
  );
};
