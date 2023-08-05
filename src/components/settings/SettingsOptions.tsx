import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/auth/AuthContext';
import {ModalComponent} from '../common/ModalComponent';
import api from '../../api/api';
import {RootStackParams} from '../../navigator/SettingsStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {TopGradient} from '../common/TopGradient';
import {OrderContext} from '../../context/order/OrderContext';
import {ShopContext} from '../../context/shop/ShopContext';
import {Modalize} from 'react-native-modalize';
import {LoginSystemScreen} from '../../screens/Login/LoginSystemScreen';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ChatContext} from '../../context/chat/ChatContext';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'SettingsScreen'> {}

type Key =
  | 'historial'
  | 'whatsapp'
  | 'logout'
  | 'about'
  | 'radar'
  | 'invitedLogin'
  | 'app'
  | 'money'
  | 'delete'
  | 'privacity'
  | 'terms'
  | 'carnet'
  | 'aduana'
  | 'perfil'
  | 'cards'
  | 'token';

const {width} = Dimensions.get('window');

export default function SettingsOptions() {
  const navigation = useNavigation<PropsNavigation>();
  const {user, status, logOut, loginAuth} = useContext(AuthContext);
  const modalizeRef = useRef<Modalize>(null);
  const {emptyOrders} = useContext(OrderContext);
  const {emptyCar} = useContext(ShopContext);
  const {newMessages} = useContext(ChatContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [handleOpt, setHandleOpt] = useState(0);

  useEffect(() => {
    if (user) {
      modalizeRef.current?.close();
    }
  }, [user]);

  const confirmModal = () => {
    switch (handleOpt) {
      case 0:
        closeSesion();
        break;
      case 1:
        redirectWhatsapp();
        break;
      case 2:
        redirectCorreo();
        break;
      case 3:
        deleteAccount();
        break;
      case 4:
        privacity();
        break;
      default:
        break;
    }
  };
  const deleteAccountOpt = () => {
    setHandleOpt(3);
    setTitle('Eliminar cuenta');
    setBody('¿Deseas eliminar tu cuenta?');
    setOpenModal(true);
  };
  const irPrivacity = () => {
    setHandleOpt(4);
    setTitle('Ver Políticas');
    setBody('¿Quieres ver nuestras políticas de privacidad de datos?');
    setOpenModal(true);
  };
  const closeSesion = async () => {
    setOpenModal(false);
    emptyCar();
    emptyOrders();

    logOut();
  };
  const invitedLogin = () => {
    /*  loginAuth(); */
    modalizeRef.current?.open();
  };
  const redirectWhatsapp = () => {
    setOpenModal(false);
    Linking.openURL(
      'http://api.whatsapp.com/send?text=Hola 📦 *baria Envios*, me podría ayudar?&phone=+593995687985',
    );
  };
  const deleteAccount = async () => {
    setOpenModal(false);
    if (status !== 'authenticated') {
      return;
    }

    try {
      await api.put('/users/delete/' + user?.id);
    } catch (error) {
      console.log('Error delete user', error);
    }

    logOut();
  };

  const privacity = () => {
    setOpenModal(false);
    Linking.openURL('https://baria-politics.web.app');
  };
  const redirectCorreo = () => {
    setOpenModal(false);
    Linking.openURL('https://www.correos.cu/rastreador-de-envios/');
  };

  const sinOut = () => {
    setHandleOpt(0);
    setTitle('Cerrar sesión');
    setBody('¿Deseas cerrar sesión?');
    setOpenModal(true);
  };

  const rastrearCompra = () => {
    setHandleOpt(2);
    setTitle('Rastrear mi Compra');
    setBody('¿Desea visitar Correos de Cuba?');
    setOpenModal(true);
  };

  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'token':
        navigation.navigate('NotificationScreen');
        break;
      case 'about':
        navigation.navigate('TandCScreen');
        break;
      case 'app':
        navigation.navigate('AppScreen');
        break;
      case 'carnet':
        navigation.navigate('CarnetScreen');
        break;
      case 'aduana':
        navigation.navigate('AduanaScreen');
        break;
      case 'whatsapp':
        navigation.navigate('MessagesScreen');
        break;
      case 'perfil':
        navigation.navigate('PerfilScreen');
        break;
      case 'radar':
        //navigation.navigate('TrackScreen');
        rastrearCompra();
        break;
      case 'delete':
        deleteAccountOpt();
        break;
      case 'privacity':
        navigation.navigate('PrivacityScreen');
        break;
      case 'terms':
        navigation.navigate('TermsScreen');
        break;
      case 'logout':
        sinOut();
        break;
      case 'cards':
        navigation.navigate('MyCards');
        break;
      case 'invitedLogin':
        invitedLogin();
        break;
    }
  };
  const menuOptions = generateOptions(selectedComponent, status);

  return (
    <>
      <ScrollView style={{}}>
        <TopGradient text={'Ajustes'} />
        <View
          style={{
            marginTop: 70,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {menuOptions.map((menu, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.cardContainer}
              onPress={menu.onPress}
              activeOpacity={0.8}>
              <View style={styles.cardInside}>
                {menu.title === 'Contáctanos vía WhatsApp' &&
                  newMessages !== 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 100,
                        top: 0,
                        right: -10,
                        backgroundColor: colors.card,
                        borderRadius: 100,
                        height: 22,
                        width: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                      }}>
                      <Text style={{color: 'white'}}>
                        {newMessages < 10 ? newMessages : '+9'}
                      </Text>
                    </View>
                  )}
                {/*  <Text style={{...styles.name}}> {menu.title}</Text> */}
                <Image source={menu.image} style={styles.productImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <ModalComponent
          isLoading={false}
          title={title}
          body={body}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onConfirmModal={confirmModal}
        />
        <View
          style={{
            height: 100,
          }}
        />
      </ScrollView>

      <Modalize modalStyle={{zIndex: 99999999, flex: 1}} ref={modalizeRef}>
        <LoginSystemScreen />
      </Modalize>
    </>
  );
}

function generateOptions(selectedComponent: any, status: any) {
  return [
    {
      title: 'Notificaciones',
      iconType: 'material-community',
      iconNameLeft: 'bell',
      iconNameRight: 'chevron-right',
      iconSizeRight: 32,
      color: '#FF2E00',
      onPress: () => selectedComponent('token'),
      image: require('../../assets/Diapositiva1.png'),
    },
    {
      title: 'Contáctanos vía WhatsApp',
      iconType: 'material-community',
      iconNameLeft: 'whatsapp',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('whatsapp'),
      image: require('../../assets/Diapositiva11.png'),
    },
    {
      title: 'Carnet',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('carnet'),
      image: require('../../assets/Diapositiva9.png'),
    },
    {
      title: 'Acerca de la aplicacón',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('app'),
      image: require('../../assets/Diapositiva2.png'),
    },
    {
      title: 'Información al comprar',
      iconType: 'material-community',
      iconNameLeft: 'shield-star-outline',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#b621e4',
      onPress: () => selectedComponent('about'),
      image: require('../../assets/Diapositiva3.png'),
    },

    {
      title: 'Política de Privacidad',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('privacity'),
      image: require('../../assets/Diapositiva6.png'),
    },

    {
      title: 'Términos y Condiciones',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('terms'),
      image: require('../../assets/Diapositiva12.png'),
    },
    {
      title: 'MyCards',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('cards'),
      image: require('../../assets/Diapositiva14.png'),
    },
    {
      title: 'Perfil',
      iconType: 'material-community',
      iconNameLeft: 'cellphone-lock',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#24A10A',
      onPress: () => selectedComponent('perfil'),
      image: require('../../assets/Diapositiva13.png'),
    },
    {
      title: 'Borrar mi Cuenta',
      iconType: 'material-community',
      iconNameLeft: 'delete-alert-outline',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#FF5733',
      onPress: () => selectedComponent('delete'),
      image: require('../../assets/Diapositiva5.png'),
    },
    {
      title: status === 'authenticated' ? 'Cerrar sesión' : 'Iniciar sesión',
      iconType: 'material-community',
      iconNameLeft: 'power',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#fa1818',
      onPress: () =>
        selectedComponent(
          status === 'authenticated' ? 'logout' : 'invitedLogin',
        ),
      image:
        status === 'authenticated'
          ? require('../../assets/Diapositiva7.png')
          : require('../../assets/Diapositiva8.png'),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  cardContainer: {
    height: width * 0.28,
    width: width * 0.28,
    marginBottom: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    fontSize: 14,
    position: 'absolute',
    top: 4,
    left: 10,
    color: 'black',
    marginBottom: 5,
  },
  productImage: {
    height: width * 0.28,
    width: width * 0.28,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    /* resizeMode: 'center', */
  },
  cardInside: {borderRadius: 10},
});
