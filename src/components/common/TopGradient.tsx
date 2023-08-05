import React from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  text: string;
}

const {height} = Dimensions.get('window');

export const TopGradient = ({text}: Props) => {
  return (
    <>
      <LinearGradient
        colors={['#4EB2E4', '#94CFEC', '#fff']}
        style={{
          ...styles.linearGradient,
          height: height * 0.2,
          /* 
          paddingTop: top + 50,*/
          marginBottom: -height * 0.1,
        }}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </>
  );
};
var styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 28 /* 
    fontFamily: 'Gill Sans', */,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
});
