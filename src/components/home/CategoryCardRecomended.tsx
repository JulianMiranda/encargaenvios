import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {PromoDown} from './PromoDown';
import {RecomendedCard} from './RecomendedCard';

interface Props {
  categoryRecomendedList: Category[];
  promoDown: any;
}
export const CategoryCardRecomended = ({
  categoryRecomendedList,
  promoDown,
}: Props) => {
  return (
    <View style={{marginTop: 10}}>
      {categoryRecomendedList.length > 0 && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>PARA TI</Text>
        </View>
      )}
      {categoryRecomendedList.map((item, index) => (
        <View key={index}>
          <View
            style={{
              zIndex: 100,
              marginBottom: index % 4 === 0 && index !== 0 ? -50 : 0,
              marginTop: index % 5 === 0 && index !== 0 ? -50 : 0,
            }}>
            <RecomendedCard category={item} />
          </View>
          {index % 4 === 0 && index !== 0 && (
            <View>
              <PromoDown imagesPromoFinal={promoDown} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  line: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
});
