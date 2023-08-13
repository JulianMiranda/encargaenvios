import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/Account/AccountScreen';
import {SingleOrderScreen} from '../screens/Account/SingleOrderScreen';
import {Code, Trackcode} from '../interfaces/Order.interface';
import {TrackScreen} from '../screens/Account/TrackScreen';
import {CarItemProps} from '../interfaces/Shop.Interface';
import {CorreosScreen} from '../screens/Account/CorreosScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  AccountScreen: undefined;
  TrackScreen: undefined;
  CorreosScreen: {code: string};
  SingleOrderScreen: {
    carItem: CarItemProps;
    number: number;
    createdAt: Date;
    trackcode: Trackcode;
    codes: Code[];
    selectedCarnet: any[];
    order: string;
    status: boolean;
  };
};

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />

      <Stack.Screen
        name="SingleOrderScreen"
        component={SingleOrderScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />

      <Stack.Screen
        name="TrackScreen"
        component={TrackScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="CorreosScreen"
        component={CorreosScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
    </Stack.Navigator>
  );
};
