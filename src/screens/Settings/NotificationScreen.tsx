/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import api from '../../api/api';
import {CustomSwitch} from '../../components/common/CustomSwitch';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../components/common/BackButton';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {TopGradient} from '../../components/common/TopGradient';

export const NotificationScreen = () => {
  const {status, user, updateReciveNotifications} = useContext(AuthContext);
  const toast = useToast();
  const navigation = useNavigation();

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [reciveNot, setReciveNot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (status === 'authenticated') {
      setReciveNot(user!.reciveNotifications);
    }
  }, [status, user]);

  const onChange = (value: boolean) => {
    setReciveNot(value);
  };
  const handleButton = async () => {
    try {
      setIsLoading(true);
      if (reciveNot) {
        await obteinToken();
      }
      const resp = await api.put(`/users/update/${user!.id}`, {
        reciveNotifications: reciveNot,
      });

      if (resp.status === 200) {
        const newUserProps = {...user, reciveNotifications: reciveNot};

        updateReciveNotifications(newUserProps);

        setIsLoading(false);
        toast.show(
          reciveNot
            ? 'Te mantendremos informado de todas las novedades de encarga Envios'
            : 'Ya no recibirás notificaciones de encarga Envios',
          {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {width: '100%', justifyContent: 'center', marginTop: 30},
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          },
        );
      } else {
        setIsLoading(false);
        toast.show(
          'Problemas para conectarse al servidor, inténtelo mas tarde',
          {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {width: '100%', justifyContent: 'center', marginTop: 30},
            textStyle: {fontSize: 16},
            animationType: 'slide-in',
          },
        );
      }
    } catch (error) {
      setIsLoading(false);
      toast.show('Problemas para conectarse al servidor, inténtelo mas tarde', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {width: '100%', justifyContent: 'center', marginTop: 30},
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  };
  const obteinToken = () => {
    /* PushNotification.configure({
      onRegister: async function (token) {
        if (token.token) {
          console.log('TOKEN:', token);

          await api.put(`/users/update/${user!.id}`, {
            notificationTokens: token.token,
          });
        }
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    }); */
  };
  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }
  return (
    <>
      <BackButton navigation={navigation} />
      <TopGradient text="Notificaciones" />
      <View style={{marginTop: 80}} />
      <Text style={styles.title}>
        encarga Envios quiere mantenerte informado
      </Text>
      <View
        style={{
          ...styles.line,
          marginTop: 20,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 15,
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
          }}>
          Recibir Notificaciones
        </Text>
        <CustomSwitch isOn={user!.reciveNotifications} onChange={onChange} />
      </View>
      <View style={styles.line} />
      {user!.reciveNotifications !== reciveNot && (
        <TouchableOpacity
          style={{...styles.saveButton, backgroundColor: colors.card}}
          activeOpacity={0.8}
          onPress={handleButton}>
          <View>
            <Text style={styles.saveText}>Guardar Cambios</Text>
          </View>
        </TouchableOpacity>
      )}
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.card} size={32} />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  saveText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    paddingHorizontal: 5,
  },
  saveButton: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 100,
    padding: 5,
    marginBottom: Platform.OS === 'ios' ? 110 : 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 26,
    marginRight: 10,
    marginLeft: 15,
    marginBottom: 20,
  },
});
