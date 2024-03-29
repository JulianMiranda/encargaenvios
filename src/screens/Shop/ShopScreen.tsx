import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Modalize, useModalize} from 'react-native-modalize';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShopContext} from '../../context/shop/ShopContext';
import {useShop} from '../../hooks/useShop';
import {AnimatedProgress} from '../../components/shop/AnimatedProgress';
import {ShopStepOne} from '../../components/shop/ShopStepOne';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ShopStepTwo} from '../../components/shop/ShopStepTwo';
import {ShopStepThree} from '../../components/shop/ShopStepThree';
import {CarnetButton} from '../../components/shop/CarnetButton';
import LinearGradient from 'react-native-linear-gradient';
import {BackButtonShop} from '../../components/common/BackButtonShop';
import {useCarnets} from '../../hooks/useCarnets';
import {ShopSuccessComponent} from '../../components/shop/ShopSuccessComponent';
import {AuthContext} from '../../context/auth/AuthContext';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {TermsButton} from '../../components/shop/TermsButton';
import {isIphoneXorAbove} from '../../utils/isIphone';
import {STRING} from '../../forkApps/forkApps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../../components/common/FadeInImage';

const {width, height} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const ShopScreen = () => {
  const {car, successShop, combo} = useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {status} = useContext(AuthContext);
  const [progress, setProgress] = useState(2);
  const [addLabel, setAddLabel] = useState(false);
  const [addLabel2, setAddLabel2] = useState(false);
  const [statePage, setStatePage] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const {ref, open} = useModalize();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp',
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [-30, -30, -30, 5],
    extrapolate: 'clamp',
  });

  const toast = useToast();
  const scrollRef = useRef<any>();
  const modalizeRef = useRef<Modalize>(null);
  const modalizeRefSesion = useRef<Modalize>(null);
  const [selectedCarnet, setSelectedCarnet] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const {} = useShop();
  const {carnets, loadCarnets, cantCarnets, isLoading} = useCarnets();

  const barWidth = useRef(new Animated.Value(0)).current;

  const [terms, setTerms] = useState(true);

  const pressNavigate = () => {
    modalizeRef.current?.close();
    navigation.navigate('Account', {screen: 'AccountScreen'});
  };
  useEffect(() => {
    (progress === 1 || progress === 0) &&
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  }, [progress]);

  useEffect(() => {
    if (status !== 'authenticated' && progress === 1) {
      modalizeRefSesion.current?.open();
    } else {
      modalizeRefSesion.current?.close();
    }
  }, [status, progress]);

  const handleButton = async () => {
    if (!terms) {
      return toast.show('Debe aceptar nuestro Términos y Condiciones', {
        type: 'normal',
        placement: 'bottom',
        duration: 3000,
        style: {
          justifyContent: 'center',
          marginBottom: 150,
          borderRadius: 50,
          paddingHorizontal: 20,
          backgroundColor: 'rgba(0,0,0,0.8)',
        },
        textStyle: {fontSize: 16},
        animationType: 'zoom-in',
      });
    }
    if (progress === 1 && selectedCarnet.length < cantCarnets()) {
      return noCarnetSelected();
    }
    if (progress >= 1) {
      const newBarWith =
        progress === 2
          ? (width * 0.8) / progress - 20
          : (width * 0.8) / progress - 50;
      Animated.spring(barWidth, {
        toValue: newBarWith,
        bounciness: 0,
        speed: 2,
        useNativeDriver: false,
      }).start();
      setProgress(progress - 1);
    } else {
      await successShop();
      setProgress(2);
      const newBarWith =
        progress === 2
          ? (width * 0.8) / progress - 20
          : (width * 0.8) / progress - 50;
      Animated.spring(barWidth, {
        toValue: newBarWith,
        bounciness: 0,
        speed: 2,
        useNativeDriver: false,
      }).reset();

      modalizeRef.current?.open();
    }
  };

  const noCarnetSelected = () => {
    if (carnets.length >= cantCarnets()) {
      setAddLabel2(true);
      toast.show(
        `Seleccione ${cantCarnets() - selectedCarnet.length}  ${
          cantCarnets() - selectedCarnet.length > 1
            ? 'destinatarios'
            : 'destinatario'
        } más`,
        {
          type: 'normal',
          placement: 'bottom',
          duration: 3000,
          style: {
            justifyContent: 'center',
            marginBottom: 150,
            borderRadius: 50,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
          textStyle: {fontSize: 16},
          animationType: 'zoom-in',
        },
      );
    } else if (carnets.length > 0 && carnets.length < cantCarnets()) {
      setAddLabel(true);
      toast.show('Añada otro destinatario', {
        type: 'normal',
        placement: 'bottom',
        duration: 3000,
        style: {
          justifyContent: 'center',
          marginBottom: 150,
          borderRadius: 50,
          paddingHorizontal: 20,
          backgroundColor: 'rgba(0,0,0,0.8)',
        },
        textStyle: {fontSize: 16},
        animationType: 'zoom-in',
      });
    } else {
      setAddLabel(true);
      toast.show('Añada al menos 1 destinatario', {
        type: 'normal',
        placement: 'bottom',
        duration: 3000,
        style: {
          justifyContent: 'center',
          marginBottom: 150,
          borderRadius: 50,
          paddingHorizontal: 20,
          backgroundColor: 'rgba(0,0,0,0.8)',
        },
        textStyle: {fontSize: 16},
        animationType: 'zoom-in',
      });
    }
  };

  const pressBack = () => {
    setProgress(progress + 1);
  };
  useEffect(() => {
    console.log('Cambio estado statePage', statePage);
    if (statePage === STRING.success_url) {
      console.log('Navegar a Home');
      handleButton();
      /* navigation.navigate('Tienda', {screen: 'HomeScreen'}); */
    } else if (statePage === STRING.failure_url) {
      console.log('Quedarse por false');
      setProgress(progress + 1);
    } else {
      console.log('Quedarse todavia sin respuesta');
    }
  }, [statePage]);

  const {bottom} = useSafeAreaInsets();

  return (
    <>
      <Animated.View
        style={{
          ...styles.top,
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex,
        }}>
        <Animated.View
          style={{
            ...styles.topBox,
            bottom: headerTitleBottom,
          }}>
          {progress < 2 && (
            <TouchableOpacity
              onPress={() => setProgress(progress + 1)}
              activeOpacity={0.8}
              style={{position: 'absolute', left: 5, bottom: -5}}>
              <Ionicons name="arrow-back-outline" color="white" size={35} />
            </TouchableOpacity>
          )}

          {progress === 2 && (
            <Text
              style={{
                ...styles.textTitle,
              }}>
              Mi Compra
            </Text>
          )}
          {progress === 1 && (
            <Text
              style={{
                ...styles.textTitle,
              }}>
              Datos de envío
            </Text>
          )}
          {progress === 0 && (
            <Text
              style={{
                ...styles.textTitle,
              }}>
              Finalizar compra
            </Text>
          )}
        </Animated.View>
      </Animated.View>

      <ScrollView
        style={{flex: 1}}
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <LinearGradient
          colors={['#4EB2E4', '#94CFEC', '#fff']}
          style={{
            ...styles.linearGradient,
            height: height * 0.2,
            marginBottom: -height * 0.1,
          }}>
          {progress === 2 && (
            <Text
              style={{
                ...styles.buttonTextScroll,
              }}>
              Mi Compra
            </Text>
          )}
          {progress === 1 && (
            <Text
              style={{
                ...styles.buttonTextScroll,
              }}>
              Datos de envío
            </Text>
          )}
          {progress === 0 && (
            <Text
              style={{
                ...styles.buttonTextScroll,
              }}>
              Finalizar compra
            </Text>
          )}
        </LinearGradient>
        {progress !== 2 && <BackButtonShop pressBack={pressBack} />}
        {(car.length > 0 || combo.length > 0) && (
          <>
            <View
              style={{
                marginTop: 80,
                marginBottom: 30,
              }}>
              <AnimatedProgress progress={progress} barWidth={barWidth} />
            </View>
          </>
        )}
        {progress === 2 && (
          <ShopStepOne total={total} setTotal={setTotal} openModalize={open} />
        )}
        {status === 'authenticated' && progress === 1 && (
          <ShopStepTwo
            carnets={carnets}
            isLoading={isLoading}
            selectedCarnet={selectedCarnet}
            setSelectedCarnet={setSelectedCarnet}
          />
        )}
        {progress === 0 && (
          <ShopStepThree
            statePage={statePage}
            setStatePage={setStatePage}
            totalShop={total}
            selectedCarnet={selectedCarnet}
          />
        )}
        {progress !== 0 && <View style={{height: 80}} />}
      </ScrollView>

      {status === 'authenticated' && car.length > 0 && progress === 1 && (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 150 : 120,
              right: 0,
              zIndex: 1000,
            }}>
            <TermsButton terms={terms} setTerms={setTerms} />
            <CarnetButton setAddLabel={setAddLabel} loadCarnets={loadCarnets} />
          </View>
        </>
      )}

      {((status === 'not-authenticated' &&
        progress === 2 &&
        (car.length > 0 || combo.length > 0)) ||
        (status === 'authenticated' &&
          (car.length > 0 || combo.length > 0) &&
          progress !== 0)) && (
        <TouchableOpacity
          style={{
            ...styles.buttonContinue,
            backgroundColor: colors.card,
            marginBottom: bottom / 2 + 90,
          }}
          activeOpacity={0.8}
          onPress={() => {
            handleButton();
          }}>
          <Text style={styles.buttonText}>
            {progress === 0 ? 'Finalizar' : 'Continuar'}
          </Text>

          <Icon
            name="arrow-right"
            color="white"
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {addLabel && car.length > 0 && progress === 1 && (
        <TouchableOpacity
          onPress={() => setAddLabel(false)}
          activeOpacity={0.95}
          style={{
            flex: 1,
            position: 'absolute',
            width,
            height,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 100,
          }}>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 250 : 220,
              right: width * 0.1,
            }}>
            <View
              style={{
                backgroundColor: '#E9ECF5',
                padding: 20,
                borderRadius: 30,
              }}>
              <Text style={{color: '#000'}}>Debe Añadir otro Carnet</Text>
            </View>
            <Image
              source={require('../../assets/flecha.png')}
              style={{height: 50, width: 30, alignSelf: 'flex-end'}}
            />
          </View>
        </TouchableOpacity>
      )}

      {addLabel2 && car.length > 0 && progress === 1 && (
        <TouchableOpacity
          onPress={() => setAddLabel2(false)}
          activeOpacity={0.95}
          style={{
            flex: 1,
            position: 'absolute',
            width,
            height,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 100,
          }}>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 250 : 220,
              left: width * 0.1,
            }}>
            <Image
              source={require('../../assets/flecha.png')}
              style={{
                height: 50,
                width: 30,
                transform: [{rotate: '180deg'}],
                alignSelf: 'flex-start',
              }}
            />
            <View
              style={{
                backgroundColor: '#E9ECF5',
                padding: 20,
                borderRadius: 30,
              }}>
              <Text style={{color: '#000'}}>Seleccione un Destinatario</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      <Modalize
        modalTopOffset={top}
        disableScrollIfPossible
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        ref={modalizeRefSesion}>
        <View
          style={{
            flex: 12,
            zIndex: 99999,
            height: height * 0.9 - bottom * 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NoPropsInvited />
        </View>
      </Modalize>

      <Modalize ref={modalizeRef} modalTopOffset={top + 20}>
        <ShopSuccessComponent pressNavigate={pressNavigate} />
      </Modalize>
      <Modalize
        modalStyle={{...styles.modalize}}
        ref={ref}
        modalTopOffset={height * 0.3}>
        <>
          <Text style={styles.modalizeTitle}>Contenido Mi Cesta</Text>
        </>
        {combo.map((item, index) => (
          <View key={index + 'prev'} style={styles.comboItem}>
            <View style={styles.info}>
              <Text style={styles.textCantidad}>{item.cantidad}</Text>
              <FadeInImage
                uri={item.subcategory.images[0].url}
                style={styles.image}
              />
              <Text style={styles.textItem}>{item.subcategory.name}</Text>
            </View>
          </View>
        ))}
      </Modalize>
    </>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFB0A5',
    height: height * 0.15,
    overflow: 'hidden',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleList: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  loadingContainer: {
    zIndex: 9999999,
    position: 'absolute',
    flex: 1,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '100%',
    width: '100%',
  },
  button: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: 10,
    zIndex: 999999999,
    left: 10,
  },
  buttonContinue: {
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'lightskyblue',
  },
  topBox: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonTextScroll: {
    fontSize: 28 /* 
    fontFamily: 'Gill Sans', */,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
  modalize: {
    zIndex: 99999,
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  modalizeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalizeCombo: {
    padding: 5,
  },
  comboItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  info: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  textItem: {marginLeft: 5, flex: 12},
  textCantidad: {marginLeft: 3, flex: 1},
  image: {height: 25, width: 25, flex: 1},
});
