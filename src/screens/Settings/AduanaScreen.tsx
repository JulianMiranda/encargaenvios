import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../components/common/BackButton';

export const AduanaScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <BackButton navigation={navigation} />
      <ScrollView>
        <Text style={styles.title}>Valor de pago Aduanal </Text>
        <View style={styles.divider} />
        <Image
          style={styles.image}
          source={require('../../assets/precios_aduana.png')}
        />

        <View style={styles.space} />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 600,
    width: '99%',
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    marginTop: 120,
    fontSize: 18,
    marginRight: 10,
    marginLeft: 15,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  space: {height: 60},
});
