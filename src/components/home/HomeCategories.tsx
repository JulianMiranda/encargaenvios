import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {CategoryCardHome} from './CategoryCardHome';

interface Props {
  data: Category[];
  title: string;
  color: string;
}

export const HomeCategories = ({data, title, color}: Props) => {
  return (
    <>
      <View style={{...styles.container, backgroundColor: color}}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(category, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        horizontal
        renderItem={({item}) => <CategoryCardHome item={item} />}
      />
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
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
