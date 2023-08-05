import React, {useContext, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
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

import messaging from '@react-native-firebase/messaging';

export type RootStackParams = {
  MoneyScreen: undefined;
  CardScreen: {
    sender: string;
    reciber: string;
    currency: any;
  };
};

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {status, user} = useContext(AuthContext);
  const {setNewMessages} = useContext(ChatContext);

  const toast = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      requestUserPermission(user?.id, user?.notificationTokens);
      NotificationListener(toast, setNewMessages);
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

  return (
    <NavigationContainer theme={navTheme}>
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
