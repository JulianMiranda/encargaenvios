import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MoneyScreen} from '../screens/Money/MoneyScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  MoneyScreen: undefined;
};

export const MoneyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoneyScreen"
        component={MoneyScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
