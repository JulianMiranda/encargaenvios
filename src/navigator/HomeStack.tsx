import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {Category} from '../interfaces/CategoryResponse.interface';
import {CategoryScreen} from '../screens/Home/CategoryScreen';
import {OffersScreen} from '../screens/Home/OffersScreen';
import {CategoryListScreen} from '../screens/Home/CategoryListScreen';
import {Node} from '../interfaces/Node.interface';
import {CategoryListComboScreen} from '../screens/Home/CategoryListComboScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  OffersScreen: undefined;
  CategoryScreen: {category?: Category};
  CategoryListScreen: {node: Node};
  CategoryListComboScreen: {node: Node};
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
        name="CategoryListScreen"
        component={CategoryListScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="CategoryListComboScreen"
        component={CategoryListComboScreen}
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
