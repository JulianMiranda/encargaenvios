import React, {useContext} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  pressNavigate: () => void;
}
const {height} = Dimensions.get('window');
export const ShopSuccessComponent = ({pressNavigate}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: height < 600 ? 0 : height * 0.1,
        }}>
        <Image
          source={require('../../assets/successShop2.png')}
          style={{width: 150, height: 150}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 28,
            marginBottom: 50,
            color: '#000',
          }}>
          Gracias por tu Compra!!
        </Text>

        <Text style={{fontSize: 16, marginBottom: 50, color: '#000'}}>
          Comenzaremos tu envío de inmediato
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: height * 0.1,
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
            backgroundColor: colors.card,
          }}
          activeOpacity={0.8}
          onPress={pressNavigate}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 20,
              marginHorizontal: 15,
            }}>
            Ver mi compra
          </Text>

          <Icon
            name="arrow-right"
            color="white"
            size={24}
            style={{position: 'absolute', right: 14, top: 10}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
