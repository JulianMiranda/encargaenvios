import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {AuthProvider} from './src/context/auth/AuthContext';
import {ChatProvider} from './src/context/chat/ChatContext';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {OrderProvider} from './src/context/order/OrderContext';
import {ShopProvider} from './src/context/shop/ShopContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';

import moment from 'moment';
import 'moment/locale/es';
import {StackNavigator} from './src/navigator/navigation';
moment.locale('es');

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const AppState = ({children}: any) => {
  LogBox.ignoreLogs([
    'Warning: isMounted(...) is deprecated', // works
    'Module RCTImageLoader', // works
    'Require cycle:', // doesn't work
    'Failed prop type', // doesn't work
    'react-native-snap-carousel', // doesn't work
  ]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetch('https://cdn.paymentez.com/ccapi/sdk/payment_sdk_stable.min.js').then(
      response => {},
    );
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaProvider>
        <ToastProvider>
          <AuthProvider>
            <ChatProvider>
              <ThemeProvider>
                <OrderProvider>
                  <ShopProvider>{children}</ShopProvider>
                </OrderProvider>
              </ThemeProvider>
            </ChatProvider>
          </AuthProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </>
  );
};
const App = () => {
  return (
    <AppState>
      <StackNavigator />
    </AppState>
  );
};
export default App;
