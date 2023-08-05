import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ShopScreen} from '../screens/Shop/ShopScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  ShopScreen: undefined;
};

export const ShopStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
