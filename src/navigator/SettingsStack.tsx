import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../screens/Settings/SettingsScreen';
import {ThemeContext} from '../context/theme/ThemeContext';
import {NotificationScreen} from '../screens/Settings/NotificationScreen';
import {AppScreen} from '../screens/Settings/AppScreen';
import {TandCScreen} from '../screens/Settings/TandCScreen';
import {AduanaScreen} from '../screens/Settings/AduanaScreen';
import {CarnetScreen} from '../screens/Settings/CarnetScreen';
import {MessagesScreen} from '../screens/Settings/MessagesScreen';
import {PerfilScreen} from '../screens/Settings/PerfilScreen';
import {PrivacityScreen} from '../screens/Settings/PrivacityScreen';
import {TermsScreen} from '../screens/Settings/TermsScreen';
import {MyCards} from '../screens/Settings/MyCards';
import {AddCard} from '../screens/Settings/AddCard';
import {ShowCard} from '../screens/Settings/ShowCard';
import {Card} from '../interfaces/Card.interface';
import {Chat} from '../interfaces/Chat.interface';
import {AdminPersonalChatScreen} from '../screens/Settings/AdminPersonalChatScreen';
import {PromocodeScreen} from '../screens/Settings/PromocodeScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  SettingsScreen: undefined;
  TandCScreen: undefined;
  AppScreen: undefined;
  AduanaScreen: undefined;
  CarnetScreen: undefined;
  NotificationScreen: undefined;
  MessagesScreen: undefined;
  PerfilScreen: undefined;
  PrivacityScreen: undefined;
  TermsScreen: undefined;
  MyCards: undefined;
  AddCard: undefined;
  PromocodeScreen: {name?: string};
  ShowCard: {card: Card};
  AdminPersonalChatScreen: {userChat: Chat};
};

export const SettingsStack = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          /* title: 'Configuración',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="TandCScreen"
        component={TandCScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="AppScreen"
        component={AppScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
        headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="AduanaScreen"
        component={AduanaScreen}
        options={{
          headerShown: false,
          /* 	title: 'Home',
					headerBackTitleVisible: false */
        }}
      />
      <Stack.Screen
        name="CarnetScreen"
        component={CarnetScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="PrivacityScreen"
        component={PrivacityScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="MyCards"
        component={MyCards}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="PromocodeScreen"
        component={PromocodeScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="ShowCard"
        component={ShowCard}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
      <Stack.Screen
        name="AdminPersonalChatScreen"
        component={AdminPersonalChatScreen}
        options={{
          headerShown: false,
          /* title: 'Orden',
          headerBackTitleVisible: false, */
        }}
      />
    </Stack.Navigator>
  );
};
