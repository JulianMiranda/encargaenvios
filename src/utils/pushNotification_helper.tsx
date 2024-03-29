import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {ToastType} from 'react-native-toast-notifications';
import api from '../api/api';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export async function requestUserPermission(
  userId: string,
  notificationTokens: string[],
) {
  try {
    const authStatus = await messaging().requestPermission({
      sound: true,
      announcement: true,
      // ... other permission settings
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken(userId, notificationTokens);
    } else {
      console.log('NoAuthorization status:', authStatus);
    }
  } catch (error) {
    console.log('Error Firebase Messaging getTpken Device', error);
  }
}
const getFCMToken = async (userId: string, notificationTokens: string[]) => {
  messaging()
    .getToken()
    .then(tokenM => {
      console.log('TokenM:' + Platform.OS, tokenM);
      if (!notificationTokens.includes(tokenM)) {
        api
          .put(`users/update/${userId}`, {notificationTokens: tokenM})
          .then(response => {
            console.log('Notification Succecfull', response.status);
          });
      } else {
        console.log('Ya tiene ese Token');
      }
    })
    .catch(error => {
      console.log('Error Firebase Messaging', error);
    });
};
export const NotificationListener = (
  toast?: ToastType,
  setNewMessages?: () => void,
  handleTouch: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void,
) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    handleTouch(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Remote Message - pushNotificationHelper', remoteMessage);
    if (setNewMessages) {
      setNewMessages();
    }
    if (toast)
      // eslint-disable-next-line curly
      toast.show(
        remoteMessage.notification?.title
          ? remoteMessage.notification?.title
          : 'Nueva notificación',
        {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            zIndex: 9999,
            justifyContent: 'center',
            borderRadius: 15,
            marginTop: 50,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          textStyle: {fontSize: 16},
          animationType: 'zoom-in',
        },
      );
  });
};
