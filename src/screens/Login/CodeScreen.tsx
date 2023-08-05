import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';

export default function OTP(params: any) {
  const {onSubmit, phone, wrongCode, signIn, setScreen} = params;
  const {loadingLogin} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const CELL_COUNT = 6;
  const [verificationCode, setVerificationCode] = useState('');
  const codeRef = useBlurOnFulfill({
    value: verificationCode,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
  });

  const [mins, setMinutes] = useState(0);
  const [secs, setSeconds] = useState(30);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  }, [mins, secs]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setScreen('phone')}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          zIndex: 999999999,
          left: 10,
          top: 5,
          marginLeft: 10,
          padding: 5,
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
        <Ionicons name="arrow-back-outline" color={'black'} size={26} />
      </TouchableOpacity>
      <View style={loginStyles.codeContainer}>
        <Text style={{...loginStyles.title, marginBottom: 0}}>
          Ingresa el código enviado al
        </Text>
        <Text style={{...loginStyles.title}}>{phone}</Text>
        <CodeField
          ref={codeRef}
          {...props}
          value={verificationCode}
          autoFocus
          onChangeText={setVerificationCode}
          cellCount={CELL_COUNT}
          rootStyle={loginStyles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[loginStyles.cell, isFocused && loginStyles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {wrongCode && (
          <Text style={loginStyles.wrongCode}>Código incorrecto.</Text>
        )}
        {loadingLogin ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{marginTop: 40}}>
            <ActivityIndicator size={26} color={colors.card} />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={verificationCode.length === 6 ? 0.8 : 1}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...loginStyles.buttonConfirm,
              backgroundColor:
                verificationCode.length === 6 ? colors.primary : '#EAEAEA',
            }}
            onPress={
              verificationCode.length === 6
                ? () => onSubmit(verificationCode)
                : () => console.log('No Code valid')
            }>
            <Text style={loginStyles.textButton}>Confirmar</Text>
            <Icon
              name="arrow-right"
              color="white"
              size={20}
              style={{...loginStyles.icon}}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={secs === 0 ? 0.8 : 1}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...loginStyles.buttonConfirmResend,
            backgroundColor: colors.card,
          }}
          onPress={() => {
            if (secs === 0) {
              setSeconds(30);
              signIn();
            }
          }}>
          <Text style={loginStyles.textButtonResend}>
            {secs !== 0 && '00:'}
            {secs !== 0 && secs} REENVIAR CÓDIGO
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
