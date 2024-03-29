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
import {isIphoneXorAbove} from '../../utils/isIphone';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  setScreen: (screen: Screens) => void;
  confirmGoogle: () => void;
}
const {height} = Dimensions.get('window');
export const Info = ({setScreen, confirmGoogle}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top, bottom} = useSafeAreaInsets();
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/encargaInfo.png')}
          style={{
            width: '100%',
            height: height,
            bottom: 100 + bottom,
          }}
        />
        <View
          style={{
            ...styles.buttons,
            bottom: bottom * 2 + 120,
          }}>
          <TouchableOpacity
            style={{
              ...styles.button2,
              backgroundColor: colors.primary,
              alignItems: 'center',
            }}
            activeOpacity={0.8}
            onPress={() => {
              setScreen('phone');
            }}>
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
      <View
        style={{
          height: 400,
          position: 'relative',
          top: 0,
          backgroundColor: 'red',
          zIndex: 99999999999,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
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
