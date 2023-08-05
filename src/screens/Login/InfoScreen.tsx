import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Info} from '../../components/login/Info';
import {ShopSuccessComponent} from '../../components/shop/ShopSuccessComponent';
import {ThemeContext} from '../../context/theme/ThemeContext';

import {RootStackParams} from '../../navigator/LoginStack';

interface Props extends StackScreenProps<RootStackParams, 'EnterPhoneScreen'> {}

export const InfoScreen = ({navigation}: Props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const modalizeRef = useRef<Modalize>(null);
  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  return (
    <>
      <Image
        source={require('../../assets/info_shop.jpg')}
        style={{width: '100%', height: '100%', resizeMode: 'cover'}}
      />
      <Modalize ref={modalizeRef}>
        <Info />
        {/*  <Image
          source={require('../../assets/info_shop.jpg')}
          style={{width: '100%', height: '100%', flex: 1, resizeMode: 'cover'}}
        />
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.primary,
          }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EnterPhoneScreen')}>
          <Text style={styles.buttonText}>Comencemos</Text>

          <Icon
            name="arrow-right"
            color="white"
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity> */}
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  icon: {position: 'absolute', right: 14, top: 10},
});
