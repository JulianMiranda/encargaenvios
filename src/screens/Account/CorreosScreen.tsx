import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {BackButton} from '../../components/common/BackButton';
import {useNavigation} from '@react-navigation/core';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {RootStackParams} from '../../navigator/AccountStack';
import {StackScreenProps} from '@react-navigation/stack';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends StackScreenProps<RootStackParams, 'CorreosScreen'> {}

const {height} = Dimensions.get('window');
export const CorreosScreen = (props: Props) => {
  const {route} = props;
  const {code} = route.params;
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const toast = useToast();
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (code) copyToClipboard(code);
  }, []);

  const copyToClipboard = (copyCode: string) => {
    Clipboard.setString(copyCode);
    /*  Clipboard.setString(code); */
    setCopiedText(true);
    toast.show('Copiado', {
      type: 'normal',
      placement: 'top',
      duration: 1500,
      style: {
        borderRadius: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginTop: height / 2,
      },
      textStyle: {fontSize: 16},
      animationType: 'slide-in',
    });
  };
  return (
    <>
      <BackButton navigation={navigation} />
      {code ? (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => copyToClipboard(code)}
            style={{
              position: 'absolute',
              top: 100,
              left: 100,
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.8)',
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
              }}>
              Tú código: {code}{' '}
            </Text>
            <Icon
              style={{marginLeft: 10, fontSize: 22}}
              color={copiedText ? 'green' : 'gray'}
              name={
                copiedText
                  ? 'clipboard-check-multiple-outline'
                  : 'clipboard-multiple-outline'
              }
              size={32}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View
            style={{
              position: 'absolute',
              top: 200,
              left: 5,
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.8)',
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
              }}>
              Código no disponible aún, solicite ayuda con un administrador
            </Text>
          </View>
        </>
      )}

      <WebView
        source={{
          uri: 'https://www.correos.cu/rastreador-de-envios/',
        }}
        style={{alignSelf: 'stretch'}}
        startInLoadingState
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.card} size={32} />
          </View>
        )}
      />
    </>
  );
};
