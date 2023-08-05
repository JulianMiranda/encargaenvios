import React from 'react';
import {StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Screens} from './LoginSystemScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '342589001739-ru3cumhtvfh6d50uoer9h1414skpobuh.apps.googleusercontent.com',
});

interface Props {
  setScreen: (screen: Screens) => void;
}

export const GoogleScreen = ({setScreen}: Props) => {
  const {top} = useSafeAreaInsets();

  const onPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setScreen('info')}
        activeOpacity={0.8}
        style={{
          ...styles.backButton,
          zIndex: 100,
          top: top + 10,
          marginLeft: 10,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Icon name="arrow-back-outline" color={'black'} size={26} />
      </TouchableOpacity>
      <Button
        title="Google Sign-In"
        onPress={async () => {
          const a = await onPress();
          if (a.user) {
          }
          console.log('Google Sign-In', a);
        }}
      />
      <Button
        title="Google Sign-Out"
        onPress={async () => {
          auth().signOut();
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 999999999,
    left: 10,
  },
});
