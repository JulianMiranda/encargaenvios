import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';
import {useToast} from 'react-native-toast-notifications';

export default function NameScreen(props: any) {
  const {signUpPhone, wait} = props;

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  const toast = useToast();
  const expName = new RegExp('^[A-Z]{1}[A-Za-z áéúíó ñ]{2,14}$');
  const mailRegex = new RegExp(
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  );
  const handleSave = () => {
    console.log('Nombre', name.trim().length);
    const nameDividido = name.trim().split(' ').length;
    if (nameDividido < 2 || nameDividido > 4) {
      console.log('Nombre inválido, entre 2 o 4 palabras');
      toast.show(
        'Nombre invalido, su nombre y apellido debe tener de 2 a 4 palabras',
        {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            zIndex: 9999,
            justifyContent: 'center',
            borderRadius: 50,
            marginTop: 50,
            paddingHorizontal: 20,
            backgroundColor: 'red',
          },
          textStyle: {fontSize: 16},
          animationType: 'zoom-in',
        },
      );
    } else if (!mailRegex.test(mail.trim())) {
      console.log('Correo invalido');
      toast.show('Correo invalido, ingrese una dirección de correo correcta', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          zIndex: 9999,
          justifyContent: 'center',
          borderRadius: 50,
          marginTop: 50,
          paddingHorizontal: 20,
          backgroundColor: 'red',
        },
        textStyle: {fontSize: 16},
        animationType: 'zoom-in',
      });
    } else {
      signUpPhone(name.trim(), mail.trim());
    }
  };
  return (
    <View style={{...loginStyles.screen, marginTop: 25}}>
      <Text style={loginStyles.title}>Nombre y Apellido</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoFocus
        placeholder="Ej: Juan Pérez"
        style={loginStyles.nameTextInput}
      />
      <Text style={{...loginStyles.title, marginTop: 15}}>
        Correo electrónico
      </Text>
      <TextInput
        value={mail}
        onChangeText={setMail}
        placeholder="Ej: micorreo@gmail.com"
        autoCorrect={false}
        inputMode="email"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        style={loginStyles.nameTextInput}
      />
      {wait ? (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{marginTop: 33}}>
          <ActivityIndicator color={colors.card} />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={name.trim().length > 0 ? 0.8 : 1}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...loginStyles.buttonConfirm,
            backgroundColor: name.trim().length > 0 ? 'black' : '#EAEAEA',
          }}
          onPress={name.trim().length > 0 ? () => handleSave() : () => {}}>
          <Text style={loginStyles.textButton}>Guardar</Text>
          <Icon
            name="arrow-right"
            color="white"
            size={20}
            style={{...loginStyles.icon}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
