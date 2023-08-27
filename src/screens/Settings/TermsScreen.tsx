import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import {BackButton} from '../../components/common/BackButton';
import {useNavigation} from '@react-navigation/core';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {STRING} from '../../forkApps/forkApps';

export const TermsScreen = () => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <>
      <BackButton navigation={navigation} />
      <WebView
        source={{
          uri: STRING.terms,
        }}
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
