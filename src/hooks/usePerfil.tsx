import {useState, useContext, useRef} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../context/auth/AuthContext';
import auth from '@react-native-firebase/auth';
import api from '../api/api';
import {User} from '../interfaces/User.interface';

export const usePerfil = () => {
  const {user, updateUser} = useContext(AuthContext);
  const toast = useToast();
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const [showSaveButton, setShowSaveButton] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleButton = async (
    name: string,
    formName: string,
    email: string,
    formEmail: string,
    phone: string,
    formPhone: string,
  ) => {
    setIsLoading(true);

    const userFirebase = auth().currentUser;

    if (name !== formName) {
      userFirebase
        ?.updateProfile({
          displayName: formName,
        })
        .then(async () => {
          try {
            const resp = await api.put<User>(`users/update/${user?.id}`, {
              name: formName,
            });
            console.log(resp.data);
            updateUser(resp.data);
            setShowSaveButton(false);
            setIsLoading(false);
            if (resp.status === 200) {
              toast.show('Nombre actualizado', {
                type: 'normal',
                placement: 'top',
                duration: 3000,
                style: {
                  zIndex: 9999,
                  justifyContent: 'center',
                  borderRadius: 50,
                  marginTop: 50,
                  paddingHorizontal: 20,
                  backgroundColor: 'green',
                },
                textStyle: {fontSize: 16},
                animationType: 'zoom-in',
              });
            }
          } catch (error) {
            setIsLoading(false);
            toast.show('Error de servidor, inténtelo más tarde', {
              type: 'normal',
              placement: 'top',
              duration: 3000,
              style: {
                zIndex: 9999,
                justifyContent: 'center',
                borderRadius: 50,
                marginTop: 50,
                paddingHorizontal: 20,
                backgroundColor: 'red',
              },
              textStyle: {fontSize: 16},
              animationType: 'zoom-in',
            });
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.show('Error de servidor, inténtelo más tarde', {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {
              zIndex: 9999,
              justifyContent: 'center',
              borderRadius: 50,
              marginTop: 50,
              paddingHorizontal: 20,
              backgroundColor: 'red',
            },
            textStyle: {fontSize: 16},
            animationType: 'zoom-in',
          });
        });
    } else if (email !== formEmail) {
      setIsLoading(true);
      try {
        const resp = await api.put<User>(`users/update/${user?.id}`, {
          email: formEmail,
        });
        updateUser(resp.data);
        nameRef.current?.blur();
        phoneRef.current?.blur();
        emailRef.current?.blur();
        setShowSaveButton(false);
        setIsLoading(false);
        if (resp.status === 200) {
          toast.show('Nombre actualizado', {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {
              zIndex: 9999,
              justifyContent: 'center',
              borderRadius: 50,
              marginTop: 50,
              paddingHorizontal: 20,
              backgroundColor: 'green',
            },
            textStyle: {fontSize: 16},
            animationType: 'zoom-in',
          });
        }
      } catch (error) {
        setIsLoading(false);
        toast.show('Error de servidor, inténtelo más tarde', {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            zIndex: 9999,
            justifyContent: 'center',
            borderRadius: 50,
            marginTop: 50,
            paddingHorizontal: 20,
            backgroundColor: 'red',
          },
          textStyle: {fontSize: 16},
          animationType: 'zoom-in',
        });
      }
      /* userFirebase?.updateProfile({}) */

      /* userFirebase
        ?.updateEmail(formEmail)
        .then(async () => {
          console.log('Actualizando email: ' + formEmail);
          try {
            await api.put<User>(`users/update/${user?.id}`, {email: formEmail});
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            toast.show('Error de servidor, inténtelo más tarde', {
              type: 'normal',
              placement: 'top',
              duration: 3000,
              style: {
                zIndex: 9999,
                justifyContent: 'center',
                borderRadius: 50,
                marginTop: 50,
                paddingHorizontal: 20,
                backgroundColor: 'red',
              },
              textStyle: {fontSize: 16},
              animationType: 'zoom-in',
            });
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error);
          toast.show('Firebase Error', {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {
              zIndex: 9999,
              justifyContent: 'center',
              borderRadius: 50,
              marginTop: 50,
              paddingHorizontal: 20,
              backgroundColor: 'red',
            },
            textStyle: {fontSize: 16},
            animationType: 'zoom-in',
          });
        }); */
    }
  };

  return {
    isLoading,
    showSaveButton,
    setShowSaveButton,
    handleButton,
    nameRef,
    phoneRef,
    emailRef,
  };
};
