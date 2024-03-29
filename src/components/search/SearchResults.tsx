/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Image, View, Text, ActivityIndicator, FlatList} from 'react-native';
import api from '../../api/api';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {CategoryResponse} from '../../interfaces/CategoryResponse.interface';
import {CategoryCardSearch} from './CategoryCardSearch';

interface Props {
  search: string;
}

export const SearchResults = ({search}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductsApi(search);
      setProducts(response);
    })();
  }, [search]);

  const searchProductsApi = async (searchWord: string) => {
    const body = {
      filter: {status: ['=', true]},
      docsPerPage: 22,
      sort: {name: 'asc'},
      search: {text: searchWord.trim(), fields: ['textSearch']},
      population: [
        {
          path: 'category',
          filter: {status: true},
          fields: {
            name: true,
          },
        },
        {
          path: 'nodes',
          filter: {status: true},
          fields: {
            name: true,
          },
        },
        {
          path: 'image',
          filter: {status: true},
          fields: {
            url: true,
          },
        },
      ],
    };
    api
      .post<CategoryResponse>('/queries/searchByText', body)

      .then(response => {
        setProducts(response.data.data);
      })
      .catch(() => setProducts(null));
  };

  if (!search) {
    return null;
  }
  return (
    <>
      {!products ? (
        <View
          style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
          <ActivityIndicator color={colors.card} size={26} />
        </View>
      ) : products.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/perch.png')}
            style={{
              height: 80,
              width: 120,
            }}
          />
          <Text style={{color: '#000'}}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>"{search}"</Text>{' '}
            No coincide con ningún producto
          </Text>
        </View>
      ) : (
        <View style={{margin: 5}}>
          <FlatList
            data={products}
            scrollEventThrottle={16}
            keyExtractor={(subcategory, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            // Header
            ListHeaderComponent={
              <View
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                }}
              />
            }
            renderItem={({item}) => <CategoryCardSearch item={item} />}
            // infinite scroll
            ListFooterComponent={
              <>
                <View style={{height: 150}} />
              </>
            }
          />
        </View>
      )}
    </>
  );
};
