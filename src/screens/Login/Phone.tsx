import React, {useContext, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {loginStyles} from '../../styles/loginTheme';
import {Country} from '../../utils/countryTypes';
import {AuthContext} from '../../context/auth/AuthContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {Platform} from 'react-native';
import {isIphoneXorAbove} from '../../utils/isIphone';

interface Props {
  onSubmit: () => void;
  setNumber: (number: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}
const {height, width} = Dimensions.get('window');
export default function PhoneNumber({
  onSubmit,
  setNumber,
  setIsLoading,
  isLoading,
}: Props) {
  const {countryCode, setCountryCode} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const inputRef = useRef<any>();
  const countryPickerRef = useRef<any>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {top} = useSafeAreaInsets();
  const onChangePhone = (number: string) => {
    if (inputRef.current.isValidNumber()) {
      inputRef.current.blur();
      setPhoneNumber(number);
      setNumber(number);
    } else {
      setPhoneNumber('');
    }
  };
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    inputRef.current.setValue(country.callingCode[0]);
  };

  return (
    <>
      <Text style={{...loginStyles.title, marginTop: top + 10, marginLeft: 20}}>
        Ingresa tu número de teléfono
      </Text>

      <View
        style={{
          ...loginStyles.screen,
          flex: 1,
          height: height * 0.85,
        }}>
        <View style={{marginLeft: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: 'transparent',

                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <CountryPicker
                {...{
                  countryCode,
                  onSelect,
                  theme: {flagSizeButton: 25},
                }}
                withCallingCode
                withFilter
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                /* renderCountryFilter={placeholder='Buscar'} */
              />
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', alignSelf: 'center'}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon
                name="sort-down"
                color="black"
                size={16}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <PhoneInput
                ref={inputRef}
                onChangePhoneNumber={onChangePhone}
                initialCountry={countryCode.toLocaleLowerCase()}
                textProps={{
                  placeholder: '0962914922',
                  autoFocus: true,
                  autoCompleteType: 'tel',
                  paddingLeft: 15,
                }}
                autoFormat
                flagStyle={loginStyles.flagStyle}
                textStyle={loginStyles.flagInputText}
                style={{height: 45}}
              />
            </View>
          </View>
        </View>
        {isLoading ? (
          <View style={{marginTop: 33}}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={phoneNumber ? 0.8 : 1}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.button,
              backgroundColor: phoneNumber ? colors.primary : '#f1b2b3',

              bottom: isIphoneXorAbove ? 120 : 80,
            }}
            onPress={
              phoneNumber
                ? () => {
                    console.log('Press');
                    setIsLoading(true);
                    onSubmit();
                  }
                : () => {
                    console.log('Press');
                  }
            }>
            <Text style={loginStyles.textButton}>Continuar</Text>
            <Icon
              name="arrow-right"
              color="white"
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        <Text style={loginStyles.text}>
          Si continúas, es posible que recibas un SMS de verificación. Pueden
          aplicarse las tarifas de mensajes y datos
        </Text>
        {/* <MovilButtons /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
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
  icon: {position: 'absolute', right: 14, top: 10},
});
