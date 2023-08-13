import React, {useContext, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../../navigator/AccountStack';
import {FadeInImage} from '../../components/common/FadeInImage';
import {SingleTrack} from '../../components/account/SingleTrack';
import {Factura} from './Factura';
import {TopScrollGradient} from '../../components/common/TopScrollGradient';
import {SingleTrackMar} from '../../components/account/SingleTrackMar';
import {Modalize} from 'react-native-modalize';
import {BackButton} from '../../components/common/BackButton';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import WebView from 'react-native-webview';
import {NoTrackCancel} from '../../components/account/NoTrackCancel';

const {height} = Dimensions.get('window');

interface Props
  extends StackScreenProps<RootStackParams, 'SingleOrderScreen'> {}

export const SingleOrderScreen = (props: Props) => {
  const {route} = props;
  const {
    carItem,
    selectedCarnet,
    trackcode,
    codes,
    order,
    number,
    createdAt,
    status,
  } = route.params;
  const {category} = carItem;

  const navigation = useNavigation();
  const openModalize = () => {
    navigation.navigate('CorreosScreen', {
      code: codes.length > 0 ? codes[number].code : '',
    });
  };
  return (
    <>
      <TopScrollGradient
        title={
          category.name === category.subname ? category.name : category.subname
        }>
        {category.image && (
          <FadeInImage uri={category.image.url} style={styles.image} />
        )}
        <View style={{padding: 10}}>
          <Text style={{...styles.totalTitle}}>Pedido</Text>
          <Text style={{...styles.totalTitle}}>No. {order}</Text>

          <Factura
            carItem={carItem}
            selectedCarnet={selectedCarnet}
            trackcode={trackcode}
            codes={codes}
            number={number}
          />
          {!status && (
            <>
              <NoTrackCancel />
            </>
          )}
          {carItem.category.ship === 'MARITIMO' && status && (
            <>
              <SingleTrackMar
                createdAt={createdAt}
                trackcode={trackcode}
                codes={codes}
                openModalize={openModalize}
              />
            </>
          )}
          {carItem.category.ship === 'AEREO' && status && (
            <>
              <SingleTrack
                createdAt={createdAt}
                trackcode={trackcode}
                codes={codes}
                openModalize={openModalize}
              />
            </>
          )}
        </View>
        <View style={{height: 100}} />
      </TopScrollGradient>
    </>
  );
};

const styles = StyleSheet.create({
  totalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    marginTop: height * 0.07,
    marginBottom: 20,
  },
});
