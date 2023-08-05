import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen} from '../screens/Search/SearchScreen';
import {CategorySearchScreen} from '../screens/Search/CategorySearchScreen';
import {Category} from '../interfaces/CategoryResponse.interface';

const Stack = createStackNavigator();

export type RootStackParams = {
  SearchScreen: undefined;
  CategorySearchScreen: {category: Category};
};

export const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="CategorySearchScreen"
        component={CategorySearchScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
    </Stack.Navigator>
  );
};
