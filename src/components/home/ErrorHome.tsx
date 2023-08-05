import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

interface Props {
  text: string;
  onPress: any;
}
export const ErrorHome = ({text, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error al obtener las {text}</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('dsds');
          onPress();
        }}
        activeOpacity={0.8}
        style={styles.button}>
        <Text style={styles.text}>Recargar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 130,
    zIndex: 99999999999,
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 10,
    backgroundColor: '#A0A3FF',
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    zIndex: 9999,
    height: 45,
    marginTop: 15,
    backgroundColor: '#fb2331',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
});
