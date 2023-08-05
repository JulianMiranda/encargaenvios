import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <ActivityIndicator size={32} color="white" />
    </View>
  );
};
