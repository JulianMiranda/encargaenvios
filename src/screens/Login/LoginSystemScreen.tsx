import React, {useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../../context/auth/AuthContext';
import {Info} from '../../components/login/Info';
import CodeScreen from './CodeScreen';
import PhoneNumber from './Phone';
import NameScreen from './NameScreen';
import {GoogleScreen} from './GoogleScreen';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '342589001739-ru3cumhtvfh6d50uoer9h1414skpobuh.apps.googleusercontent.com',
});

export type Screens = 'info' | 'phone' | 'google' | 'code' | 'name';

export const LoginSystemScreen = () => {
  const [screen, setScreen] = useState<Screens>('info');

  const {signUpCompra, login, wait, errorMessage} = useContext(AuthContext);
  const toast = useToast();
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [wrongCode, setWrongCode] = useState(false);
  const [wrongGoogle, setWrongGoogle] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      toast.show(errorMessage, {
        type: 'danger',
        placement: 'top',
        duration: 5000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 20},
        animationType: 'slide-in',
      });
    }
  }, [errorMessage, toast]);

  const signIn = async () => {
    setIsLoading(true);
    try {
      console.log('Empieza a singin firebase');
      auth()
        .signInWithPhoneNumber(number)
        .then(confirmation => {
          console.log('Si Confirmacion firebase');
          setIsLoading(false);
          setConfirm(confirmation);
          setScreen('code');
        })
        .catch(error => {
          setIsLoading(false);
          console.log('erroRFirebase', error);
          if (error && error.code === 'auth/network-request-failed') {
            return toast.show('Comprueba tu conexión a internet.', {
              type: 'danger',
              placement: 'top',
              duration: 5000,
              style: {width: '100%', justifyContent: 'center', marginTop: 30},
              textStyle: {fontSize: 18},
              animationType: 'slide-in',
            });
          } else {
            toast.show(error.message, {
              type: 'danger',
              placement: 'top',
              duration: 5000,
              style: {width: '100%', justifyContent: 'center', marginTop: 30},
              textStyle: {fontSize: 20},
              animationType: 'slide-in',
            });
          }
        });
    } catch (error: any) {
      console.log('Error en catch de Firebase', error);
      setIsLoading(false);

      if (error && error.code === 'auth/network-request-failed') {
        return toast.show('Comprueba tu conexión a internet.', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          style: {width: '100%', justifyContent: 'center', marginTop: 30},
          textStyle: {fontSize: 18},
          animationType: 'slide-in',
        });
      } else {
        toast.show(error.message, {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          style: {width: '100%', justifyContent: 'center', marginTop: 30},
          textStyle: {fontSize: 20},
          animationType: 'slide-in',
        });
      }
    }
  };

  const confirmGoogle = async () => {
    try {
      setIsLoading(true);

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      auth()
        .signInWithCredential(googleCredential)
        .then(result => {
          if (result !== null) {
            setIsLoading(false);
            login();
          } else {
            setIsLoading(false);
          }
        })

        .catch(err => {
          setIsLoading(false);
          setWrongGoogle(true);
        });
    } catch (error) {
      setIsLoading(false);
      setWrongGoogle(true);
    }
  };

  const confirmCode = async (code: string) => {
    try {
      setIsLoading(true);
      confirm
        .confirm(code)
        .then(result => {
          if (result !== null && !result.user.displayName) {
            setIsLoading(false);
            setScreen('name');
          } else {
            setIsLoading(false);
            login();
          }
        })
        .catch(err => {
          setIsLoading(false);
          setWrongCode(true);
        });
    } catch (error) {
      setIsLoading(false);
      setWrongCode(true);
    }
  };

  const signUpPhone = async (names: string, mail: string) => {
    try {
      await auth().currentUser?.updateProfile({displayName: names});
      auth()
        .currentUser?.getIdToken(true)
        .then(() => signUpCompra(names, number, mail));
    } catch (error) {
      toast.show('Error al actualizar nombre', {
        type: 'danger',
        placement: 'top',
        duration: 5000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 20},
        animationType: 'slide-in',
      });
    }
  };

  if (screen === 'info') {
    return <Info setScreen={setScreen} confirmGoogle={confirmGoogle} />;
  }

  if (screen === 'google') {
    return <GoogleScreen setScreen={setScreen} />;
  }
  if (screen === 'code') {
    return (
      <CodeScreen
        onSubmit={confirmCode}
        setScreen={setScreen}
        phone={number}
        wrongCode={wrongCode}
        isLoading={isLoading}
        signIn={signIn}
      />
    );
  }
  if (screen === 'name') {
    return <NameScreen signUpPhone={signUpPhone} wait={wait} />;
  }

  return (
    <>
      <PhoneNumber
        onSubmit={signIn}
        setNumber={setNumber}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};
