import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import WebView from 'react-native-webview';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ShopContext} from '../../context/shop/ShopContext';
import {calcularCombo} from '../../utils/calculateCost';
import {AuthContext} from '../../context/auth/AuthContext';

interface Props {
  url: string;
  setStatePage: (statePage: string) => void;
  statePage: string;
  totalShop: number;
  selectedCarnet: string[];
}
const {height} = Dimensions.get('screen');
export const PaymentWebView = ({
  url,
  statePage,
  setStatePage,
  totalShop,
  selectedCarnet,
}: Props) => {
  const {makeShop, costoTotal, pesoTotal} = useContext(ShopContext);
  const {prices} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  console.log('totalShopen Screen PaymentWebView', totalShop);
  useEffect(() => {
    makeShop(
      totalShop + calcularCombo({costoTotal, pesoTotal, prices}),
      selectedCarnet,
    );
  }, []);

  return (
    <>
      <View
        style={{height: height * 0.68, width: '100%', paddingHorizontal: 5}}>
        <WebView
          source={{
            uri: url,
          }}
          onNavigationStateChange={param => {
            console.log('Navigation state changed', param);
            setStatePage(param.url);
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
      </View>
    </>
  );
};
