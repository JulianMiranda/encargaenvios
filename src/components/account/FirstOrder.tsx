import React, {useContext} from 'react';
import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import {ThemeContext} from '../../context/theme/ThemeContext';

export const FirstOrder = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 5,
        }}>
        <Image
          style={{
            height: 250,
            width: 250,
            borderRadius: 250,
          }}
          source={require('../../assets/firstshop.gif')}
        />
        <Text style={{fontSize: 22, color: '#000'}}>Haz tu primera compra</Text>
      </View>
      <View
        style={{
          flex: 2,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Tienda', {screen: 'HomeScreen'})}
          style={{
            ...styles.emptyCarButton,
            backgroundColor: colors.card,
          }}>
          <Text style={styles.emptyText}>Ir a la tienda</Text>
          <Icon
            name="arrow-right"
            color="white"
            size={24}
            style={{position: 'absolute', right: 14, top: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCarButton: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
});
