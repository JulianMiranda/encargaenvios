import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../../context/auth/AuthContext';
import PhoneNumber from './Phone';
import CodeScreen from './CodeScreen';
import NameScreen from './NameScreen';

export const EnterPhoneScreen = () => {
  const {signUpCompra, login, errorMessage} = useContext(AuthContext);
  const toast = useToast();
  const [name, setName] = useState(false);
  const [confirm, setConfirm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [wrongCode, setWrongCode] = useState(false);

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
      const confirmation = await auth().signInWithPhoneNumber(number);

      setIsLoading(false);
      setConfirm(confirmation);
    } catch (error: any) {
      setIsLoading(false);
      console.log('Error de Firebas', error);
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

  const confirmCode = async (code: string) => {
    try {
      setIsLoading(true);
      /*  const r = await confirm */
      const result = await confirm.confirm(code);
      if (!result.user.displayName) {
        setIsLoading(false);
        setName(true);
      } else {
        login();
      }
    } catch (error) {
      setIsLoading(false);
      setWrongCode(true);
    }
  };

  const signUpPhone = async (names: string) => {
    try {
      await auth().currentUser?.updateProfile({displayName: names});
      auth()
        .currentUser?.getIdToken(true)
        .then(() => signUpCompra(names, number));
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

  if (name) {
    return <NameScreen signUpPhone={signUpPhone} wait={false} />;
  }

  if (confirm) {
    return (
      <CodeScreen
        onSubmit={confirmCode}
        phone={number}
        wrongCode={wrongCode}
        isLoading={isLoading}
        signIn={signIn}
      />
    );
  }

  return (
    <PhoneNumber
      onSubmit={signIn}
      setNumber={setNumber}
      isLoading={isLoading}
    />
  );
};
