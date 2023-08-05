/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {AuthContext} from '../../context/auth/AuthContext';
import {LoginSystemScreen} from '../../screens/Login/LoginSystemScreen';

export const NoPropsInvited = () => {
  const {user} = useContext(AuthContext);
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (user) {
      modalizeRef.current?.close();
    }
  }, [user]);
  /* useEffect(() => {
    modalizeRef.current?.open();
  }, []);
 */
  return (
    <>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../assets/lock.gif')}
          style={{height: 150, width: 150, alignSelf: 'center'}}
        />
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 10,
            alignSelf: 'center',
            color: '#000',
          }}>
          Inicia sesión para obtener mejor experiencia
        </Text>
        <TouchableOpacity
          onPress={() => modalizeRef.current?.open()}
          style={{
            height: 45,
            width: 220,
            marginTop: 15,
            backgroundColor: '#fb2331',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            elevation: 6,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
              color: 'white',
            }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
      </View>
      <Modalize modalStyle={{zIndex: 1000000000, flex: 1}} ref={modalizeRef}>
        <LoginSystemScreen />
      </Modalize>
    </>
  );
};
