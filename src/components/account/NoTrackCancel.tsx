import React from 'react';
import {Text, View} from 'react-native';

export const NoTrackCancel = () => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: 'red',
          marginBottom: 3,
        }}>
        Envío cancelado
      </Text>
    </View>
  );
};
