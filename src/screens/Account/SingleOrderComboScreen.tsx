import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../../navigator/AccountStack';
import {SingleTrack} from '../../components/account/SingleTrack';
import {TopScrollGradient} from '../../components/common/TopScrollGradient';
import {NoTrackCancel} from '../../components/account/NoTrackCancel';
import {FacturaCombo} from './FacturaCombo';
import {ShopContext} from '../../context/shop/ShopContext';

const {height} = Dimensions.get('window');

interface Props
  extends StackScreenProps<RootStackParams, 'SingleOrderComboScreen'> {}

export const SingleOrderComboScreen = (props: Props) => {
  const {route, navigation} = props;
  const {
    comboItem,
    selectedCarnet,
    trackcode,
    codes,
    order,
    number,
    createdAt,
    status,
    comboCode,
  } = route.params;

  const {setItemCombo} = useContext(ShopContext);

  const openModalize = () => {
    navigation.navigate('CorreosScreen', {
      code: comboCode ? comboCode : '',
    });
  };
  const shopNow = async () => {
    comboItem.map(item => {
      setItemCombo({
        subcategory: item.subcategory,
        cantidad: item.cantidad,
        node: item.node,
      });
    });
    navigation.navigate<any>('Shop', {screen: 'ShopScreen'});
  };
  return (
    <>
      <TopScrollGradient title={'Mi Cesta'}>
        <Image
          source={require('../../assets/Micesta.png')}
          style={styles.image}
        />
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <View>
              <Text style={{...styles.totalTitle}}>Orden</Text>
              <Text style={{...styles.totalTitle}}>No. {order}</Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                borderColor: '#4EB2E4',
                backgroundColor: '#4EB2E4',
              }}
              activeOpacity={0.8}
              onPress={() => shopNow()}>
              <Text style={styles.textButton}>Recomprar</Text>
            </TouchableOpacity>
          </View>
          <FacturaCombo
            comboItem={comboItem}
            comboCode={comboCode}
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

          {status && (
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
    resizeMode: 'center',
  },
  textButton: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    marginHorizontal: 15,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
