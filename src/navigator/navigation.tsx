import React, {useContext, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Tabs} from './Tabs';
import {AuthContext} from '../context/auth/AuthContext';
import {Loading} from '../components/common/Loading';
import {NotInternetConection} from '../components/common/NotInternetConection';
import {LoginStack} from './LoginStack';
import {
  NotificationListener,
  requestUserPermission,
} from '../utils/pushNotification_helper';
import {useToast} from 'react-native-toast-notifications';
import {ChatContext} from '../context/chat/ChatContext';

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

export type RootStackParams = {
  MoneyScreen: undefined;
  CardScreen: {
    sender: string;
    reciber: string;
    currency: any;
  };
};

const Stack = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    // navigationRef.navigate('Settings', {screen: 'MessagesScreen'});
    navigationRef.navigate(name, params);
  }
}

export const StackNavigator = () => {
  const {status, user} = useContext(AuthContext);
  const {setNewMessages} = useContext(ChatContext);

  const toast = useToast();

  const redirectFunction = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log('Redirecting', remoteMessage.data);
    if (
      remoteMessage.data &&
      remoteMessage.data.type &&
      remoteMessage.data.type === 'MESSAGE'
    ) {
      navigate('Settings', {screen: 'MessagesScreen'});
    }
    if (
      remoteMessage.data &&
      remoteMessage.data.type &&
      remoteMessage.data.type === 'NOTIFYCOMBO'
    ) {
      navigate('Tienda', {
        screen: 'CategoryScreen',
        params: {category: JSON.parse(remoteMessage.data.combo)},
      });
    }
    if (
      remoteMessage.data &&
      remoteMessage.data.type &&
      remoteMessage.data.type === 'NEWPROMOCODE'
    ) {
      console.log(remoteMessage.data);

      navigate('Settings', {screen: 'PromocodeScreen'});
      navigate('Settings', {
        screen: 'PromocodeScreen',
        params: {
          name: remoteMessage.data.name ? remoteMessage.data.name : '',
        },
      });
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      requestUserPermission(user?.id, user?.notificationTokens);
      NotificationListener(toast, setNewMessages, redirectFunction);
    }
  }, [status]);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      'Message handled in the background!- NAVIGATION',
      remoteMessage,
    );
    setNewMessages();
  });

  /*   return <LoginSystemScreen />; */
  if (status === 'checking') {
    return <Loading />;
  }
  if (status === 'not-internet') {
    return <NotInternetConection />;
  }

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgba(255,255,255,0.92)',
    },
  };

  const linking = {
    prefixes: [
      'encargaenvios://',
      'https://encargaenvios.com',
      'http://email.encargaenvios.com',
    ],
    config: {
      screens: {
        Tabs: {
          screens: {
            Settings: {
              screens: {
                SettingsScreen: 'settings',
              },
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking} ref={navigationRef} theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {elevation: 0},
          cardStyle: {backgroundColor: 'white'},
        }}>
        {status === 'login' ? (
          <>
            <Stack.Screen name="LoginStack" component={LoginStack} />
          </>
        ) : (
          <Stack.Screen name="Tabs" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
