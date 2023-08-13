import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {Screens} from '../../screens/Login/LoginSystemScreen';
import {Platform} from 'react-native';
import {isIphoneXorAbove} from '../../utils/isIphone';

interface Props {
  setScreen: (screen: Screens) => void;
  confirmGoogle: () => void;
}
const {height} = Dimensions.get('window');
export const Info = ({setScreen, confirmGoogle}: Props) => {
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
        }}>
        <Image
          source={require('../../assets/info_shop.jpg')}
          style={{width: '100%', height: height}}
        />
        <View style={styles.buttons}>
          {/* <TouchableOpacity
            style={{
              ...styles.button1,
              backgroundColor: colors.card,
            }}
            activeOpacity={0.8}
            onPress={() => {
              confirmGoogle();
            }}>
            <Icon
              name="google"
              color="white"
              size={24}
              style={styles.iconStart}
            />
            <Text style={styles.buttonText}>Cuenta de Google</Text>

            <Icon
              name="arrow-right"
              color="white"
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={{color: 'green', alignSelf: 'center', fontSize: 22}}>
            o
          </Text> */}

          <TouchableOpacity
            style={{
              ...styles.button2,
              backgroundColor: colors.primary,

              alignItems: 'center' /* 
              width: '90%', */,
            }}
            activeOpacity={0.8}
            onPress={() => {
              setScreen('phone');
            }}>
            {/* <Icon
              name="phone"
              color="white"
              size={24}
              style={styles.iconStart}
            /> */}
            <Text style={styles.buttonText}>Continuar</Text>

            <Icon
              name="arrow-right"
              color="white"
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    bottom: isIphoneXorAbove ? 150 : 110,
    width: '100%',
  },
  button1: {
    flexDirection: 'row',
    marginTop: 15,
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
  button2: {
    flexDirection: 'row',
    marginTop: 15,
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
  },
  icon: {
    position: 'absolute',
    right: 14,
    top: 10,
  },
  iconStart: {
    alignSelf: 'flex-start',

    /* position: 'absolute', left: 14, top: 10 */
  },
});
