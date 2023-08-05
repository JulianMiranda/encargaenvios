/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import api from '../../api/api';
import {useDebouncedValue} from '../../hooks/useDebouncedValue';
import {
  Category,
  CategoryResponse,
} from '../../interfaces/CategoryResponse.interface';
import {FadeInImage} from '../common/FadeInImage';

interface Props {
  searchQuery: string;
  onSearch: (reuseSearch: any) => Promise<void>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const SuggestionsSearch = ({
  searchQuery,
  onSearch,
  setSearchQuery,
}: Props) => {
  const [suggestions, setSuggestions] = useState<Category[]>([]);

  const deboncedValue = useDebouncedValue(searchQuery);

  useEffect(() => {
    searchSuggestions(deboncedValue);
  }, [deboncedValue]);

  const searchSuggestions = async (search: string) => {
    const body = {
      filter: {status: ['=', true]},
      docsPerPage: 5,
      sort: 'desc',
      search: {text: search, fields: ['textSearch']},
      population: [
        {
          path: 'subcategories',
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

    api.post<CategoryResponse>('/queries/searchByText', body).then(response => {
      setSuggestions(response.data.data.map(item => item));
    });
  };
  return (
    <View style={{marginTop: 20, marginLeft: 5}}>
      {suggestions.length > 0 && (
        <Text style={{fontWeight: 'bold', color: '#000'}}>Sugerencias</Text>
      )}
      {suggestions.map((item, index) => (
        <View key={index} style={{}}>
          <TouchableOpacity
            style={{
              paddingVertical: 3,
              marginVertical: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setSearchQuery(item.name);
              onSearch(item.name);
            }}>
            <FadeInImage
              uri={item.image.url}
              style={{height: 50, width: 50, borderRadius: 8}}
            />
            <Text style={{marginHorizontal: 20, fontSize: 16, color: '#000'}}>
              {item.name}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#f1f1f1',
            }}
          />
        </View>
      ))}
    </View>
  );
};
