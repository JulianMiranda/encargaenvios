/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useRef, useState} from 'react';
import {
  ActivityIndicator,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackButton} from '../../components/common/BackButton';
import {CarnetComponent} from '../../components/shop/CarnetComponent';
import {Fab} from '../../components/common/Fab';
import {ModalAddCarnet} from '../../components/shop/ModalAddCarnet';
import {ModalComponent} from '../../components/common/ModalComponent';
import {ModalEditCarnet} from '../../components/shop/ModalEditCarnet';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCarnets} from '../../hooks/useCarnets';
import {Carnet} from '../../interfaces/CarnetResponse.interface';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
export const CarnetScreen = () => {
  const {carnets, loadCarnets, deleteCarnet, isLoading} = useCarnets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {status} = useContext(AuthContext);
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [carnetEdit, setCarnetEdit] = useState<Partial<Carnet>>({});
  const [selectedDeleteCarnet, setSelectedDeleteCarnet] = useState<
    Partial<Carnet>
  >({});

  const addCarnet = () => {
    setTitle('Datos');
    setBody('');

    setOpenModal(true);
  };
  const editCarnet = () => {
    setOpenModalEdit(true);
  };

  const confirmCloseModal = () => {
    if (selectedDeleteCarnet.id) {
      deleteCarnet(selectedDeleteCarnet.id);
    }
    setOpenConfirmModal(false);
  };

  const buttonDeleteCarnet = (carnet: Carnet) => {
    setSelectedDeleteCarnet(carnet);
    setTitle('Eliminar Datos');
    setBody('¿Deseas eliminar los datos de esta persona?');
    setOpenConfirmModal(true);
  };

  const confirmModal = () => {
    setOpenModal(false);
    setOpenModalEdit(false);
    setCarnetEdit({});
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5,
    ],
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
          <TouchableOpacity
            onPress={() => navigation.pop()}
            activeOpacity={0.8}
            style={{position: 'absolute', left: 5, bottom: -5}}>
            <Ionicons name="arrow-back-outline" color="white" size={35} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Datos</Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{flex: 1, marginBottom: 120}}
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
          <Text style={styles.buttonText}>Datos</Text>
        </LinearGradient>

        <BackButton navigation={navigation} />
        <View style={styles.bodyContainer}>
          {carnets.map((carnet, index) => (
            <View
              key={index}
              style={{
                width: '90%',
              }}>
              <View style={styles.line} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setCarnetEdit(carnet);
                  editCarnet();
                }}>
                <CarnetComponent carnet={carnet} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => buttonDeleteCarnet(carnet)}
                style={styles.button}>
                <Icon
                  name="trash"
                  size={22}
                  color="red"
                  style={{position: 'absolute', top: 5, right: 5}}
                />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.line} />
        </View>
        {!isLoading && carnets.length === 0 && (
          <View style={styles.image}>
            <Image
              style={{height: 180, width: 200}}
              source={require('../../assets/no_id.png')}
            />
            <Text style={{fontSize: 18, color: '#000'}}>
              No tienes datos guardados
            </Text>
          </View>
        )}
        {isLoading && (
          <View style={styles.activity}>
            <ActivityIndicator size={32} color={colors.card} />
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addCarnet}
        style={styles.buttonAdd}>
        <View style={styles.add}>
          <Text
            style={{
              color: 'white',
            }}>
            Añadir
          </Text>
        </View>
        <Fab iconName={'add-outline'} onPress={addCarnet} style={{}} />
      </TouchableOpacity>
      <ModalAddCarnet
        title={title}
        body={body}
        setBody={setBody}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
        loadCarnets={loadCarnets}
      />

      <ModalEditCarnet
        carnetEdit={carnetEdit}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        loadCarnets={loadCarnets}
      />
      <ModalComponent
        isLoading={false}
        title={title}
        body={body}
        openModal={openConfirmModal}
        setOpenModal={setOpenConfirmModal}
        onConfirmModal={confirmCloseModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    overflow: 'hidden',
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
    borderBottomLeftRadius: 0,
  },
  card: {
    margin: 5,
    backgroundColor: '#f8f7f7',
    borderRadius: 3,
    padding: 5,
  },
  titleList: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 80,
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
  bodyContainer: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 15,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    backgroundColor: '#fb2331',
    marginRight: -10,
    height: 30,
    paddingRight: 20,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 28 /* 
    fontFamily: 'Gill Sans', */,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
});
