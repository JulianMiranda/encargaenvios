import React, {useContext, useEffect, useState} from 'react';
import {TopScrollGradient} from '../../components/common/TopScrollGradient';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {AuthContext} from '../../context/auth/AuthContext';
import api from '../../api/api';
import {BackButton} from '../../components/common/BackButton';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {AxiosError} from 'axios';
import {ModalComponentPromo} from '../../components/common/ModalComponentPromo';
import {Promocode} from '../../interfaces/Promocode.interface';
import {RootStackParams} from '../../navigator/SettingsStack';
import {StackScreenProps} from '@react-navigation/stack';

const {height} = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'PromocodeScreen'> {}

export const PromocodeScreen = ({route, navigation}: Props) => {
  const {params} = route;
  const name = params?.name;

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {user, status, updateUser} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [promo, setPromo] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (name) {
      setPromo(name);
    }
  }, [name]);

  const handleButton = () => {
    setIsLoading(true);

    api
      .get<{status: boolean; message: string; promo: Promocode}>(
        '/promocode/checkPromo/' + promo.trim().toUpperCase(),
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data.status) {
            if (user?.promocode && user?.promocode === response.data.promo.id) {
              setTitle('Ya tienes este código de promoción activado');
              setOpenModal(true);
            } else {
              updateUser({...user!, promocode: response.data.promo.id});
              setTitle(response.data.message);
              if (response.data.promo.description) {
                setBody(response.data.promo.description);
              } else {
                setBody(
                  `Disfruta de un ${
                    response.data.promo.discount * 100
                  }% de descuento en tu próxima compra`,
                );
              }

              setOpenModal(true);
            }
            /* setTitle(response.data.message);
            setOpenModal(true); */
          } else {
            setTitle(response.data.message);
            setOpenModal(true);
          }
        } else {
          setTitle('Error, inténtelo más tarde');
          setOpenModal(true);
        }
      })
      .catch((err: Error | AxiosError) => {
        if (err.message === 'Request failed with status code 404') {
          setTitle('Código de promoción no válido');
          setOpenModal(true);
        } else {
          setTitle('Error, inténtelo más tarde');
          setOpenModal(true);
        }
      })
      .finally(() => setIsLoading(false));
  };
  const confirmModal = () => {
    setTitle('');
    setBody('');
    setOpenModal(false);
  };
  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }
  return (
    <>
      <TopScrollGradient title="Promociones">
        <View style={{padding: 10, marginTop: 90}}>
          <Text style={styles.totalTitle}>Código promocional</Text>
          <TextInput
            placeholder="Código promocional"
            /* onSubmitEditing={() => dos.current.focus()} */
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 14,
              paddingLeft: 5,
              height: 40,
              borderColor: '#f7f7f7',
              borderWidth: 1,
              borderRadius: 8,
              top: Platform.OS === 'ios' ? 0 : 2,
            }}
            keyboardType="default"
            autoCapitalize="characters"
            autoCorrect={false}
            value={promo}
            onChangeText={value => setPromo(value)}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.buttonContinue,
            {
              backgroundColor:
                promo.trim().length > 2 ? colors.card : '#c5c5c5',
            },
            promo.trim().length > 2 ? styles.shadow : {},
          ]}
          activeOpacity={isLoading ? 1 : 0.8}
          onPress={() => {
            isLoading ? {} : handleButton();
          }}>
          <Text style={styles.buttonText}>Continuar</Text>
          {isLoading && (
            <ActivityIndicator
              size={22}
              color={'#fff'}
              style={{position: 'absolute', right: 12, top: 12}}
            />
          )}
        </TouchableOpacity>
        <View
          style={{
            height: height * 0.2,
          }}
        />
      </TopScrollGradient>
      <ModalComponentPromo
        isLoading={false}
        title={title}
        body={body}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  totalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 7,
  },

  buttonContinue: {
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  shadow: {
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
