import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {OfferCard} from './OfferCard';
import {Category} from '../../interfaces/CategoryResponse.interface';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/HomeStack';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'OffersScreen'> {}

interface Props {
  offers: Category[];
}
export const Rebajas = ({offers}: Props) => {
  const navigation = useNavigation<PropsNavigation>();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View style={{marginTop: 10}}>
      {offers.length > 0 && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>REBAJAS</Text>
        </View>
      )}
      {offers.map(offer => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
      <View style={styles.line} />
      {offers.length > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate('OffersScreen')}
          activeOpacity={0.8}
          style={{...styles.more, backgroundColor: colors.card}}>
          <Text style={{color: 'white'}}>Más...</Text>
        </TouchableOpacity>
      )}
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
  more: {
    padding: 3,
    alignSelf: 'flex-end',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
