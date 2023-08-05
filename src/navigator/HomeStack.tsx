import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {Category} from '../interfaces/CategoryResponse.interface';
import {CategoryScreen} from '../screens/Home/CategoryScreen';
import {OffersScreen} from '../screens/Home/OffersScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  OffersScreen: undefined;
  CategoryScreen: {category: Category};
};

const Stack = createStackNavigator<RootStackParams>();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="OffersScreen"
        component={OffersScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
