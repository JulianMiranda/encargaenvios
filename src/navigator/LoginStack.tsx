import React, {useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {InfoScreen} from '../screens/Login/InfoScreen';
import {EnterPhoneScreen} from '../screens/Login/EnterPhoneScreen';
import {Modalize} from 'react-native-modalize';

export type RootStackParams = {
  InfoScreen: undefined;
  EnterPhoneScreen: undefined;
};
const Stack = createStackNavigator<RootStackParams>();
export const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          headerShown: false,

          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="EnterPhoneScreen"
        component={EnterPhoneScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
