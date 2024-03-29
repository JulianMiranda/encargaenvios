import React from 'react';
import {StyleSheet, Text, Dimensions, StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const {height} = Dimensions.get('window');

export const TopGradient = ({text, style = {}}: Props) => {
  return (
    <>
      <LinearGradient
        colors={['#4EB2E4', '#94CFEC', '#fff']}
        style={{
          ...styles.linearGradient,
          height: height * 0.2,
          marginBottom: -height * 0.1,
          ...(style as any),
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
