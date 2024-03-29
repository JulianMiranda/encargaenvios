import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackButton} from '../../components/common/BackButton';
import {FadeInImage} from '../../components/common/FadeInImage';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useForm} from '../../hooks/useForm';
import {usePerfil} from '../../hooks/usePerfil';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const PerfilScreen = () => {
  const {user, status} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const name = user ? user.name : '';
  const email = user ? user.email : '';
  const phone = user ? user.phone : '';

  const {
    isLoading,
    handleButton,
    showSaveButton,
    setShowSaveButton,
    nameRef,
    phoneRef,
    emailRef,
  } = usePerfil();

  const {form, onChange, setFormValue} = useForm({
    name,
    email,
    phone,
  });
  useEffect(() => {
    if (name || email || phone) {
      setFormValue({
        email,
        name,
        phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, name, phone]);

  useEffect(() => {
    console.log(user?.id);
  }, [user]);

  useEffect(() => {
    if (name !== form.name || email !== form.email || phone !== form.phone) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, form.email, form.name, form.phone, name, phone]);

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
  const navigation = useNavigation<any>();
  const {top} = useSafeAreaInsets();
  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex,
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: headerTitleBottom,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            activeOpacity={0.8}
            style={{position: 'absolute', left: 5, bottom: -5}}>
            <Icon name="arrow-back-outline" color="white" size={35} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            {form.name ? form.name : ''}
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <>
          <BackButton navigation={navigation} style={{marginTop: top / 2}} />
          <LinearGradient
            colors={['#4EB2E4', '#94CFEC', '#fff']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              height: height * 0.2,
              marginBottom: 10,
            }}>
            <Animated.View
              style={{
                height: profileImageHeight,
                width: profileImageHeight,
                borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                borderColor: 'white',
                borderWidth: 3,
                overflow: 'hidden',
                marginTop: top,
                marginRight: 10,
                alignSelf: 'flex-end',
              }}>
              <FadeInImage
                uri={
                  user?.image.url
                    ? user.image.url
                    : 'https://cdn2.vectorstock.com/i/1000x1000/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg'
                }
                style={{flex: 1, width: 75, height: 75}}
              />
            </Animated.View>
            <View style={{alignItems: 'center'}}>
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: 'bold',
                  fontSize: 26,
                  paddingLeft: 10,
                  marginTop: -80,
                  maxWidth: '50%',
                }}>
                {form.name ? form.name : ''}
              </Text>
            </View>
          </LinearGradient>
        </>
        {isLoading && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              height: height,
              width: '100%',
              zIndex: 999999999999,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.6)',
            }}>
            <ActivityIndicator />
          </View>
        )}

        {/* <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{form.name ? form.name : ''}</Text>
        </View> */}

        <View style={{marginTop: 70, padding: 10}}>
          <Text style={styles.buttonText}>{user?.phone}</Text>
          <TextInput
            ref={nameRef}
            style={styles.inputStyle}
            placeholder="Nombre"
            autoCorrect={false}
            autoCapitalize="words"
            value={form.name}
            onChangeText={value => onChange(value, 'name')}
          />

          <TextInput
            ref={phoneRef}
            editable={false}
            style={styles.inputStyle}
            placeholder="Teléfono"
            value={form.phone}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => onChange(value, 'phone')}
            keyboardType="email-address"
            keyboardAppearance="dark"
          />

          <TextInput
            ref={emailRef}
            style={styles.inputStyle}
            placeholder="Email"
            value={form.email}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => onChange(value, 'email')}
            keyboardType="email-address"
            keyboardAppearance="dark"
          />
        </View>
        {showSaveButton && (
          <TouchableOpacity
            style={{...styles.saveButton, backgroundColor: colors.card}}
            activeOpacity={0.8}
            onPress={() =>
              handleButton(
                name,
                form.name,
                email,
                form.email,
                phone,
                form.phone,
              )
            }>
            <View>
              <Text style={styles.saveText}>Guardar Cambios</Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#94CFEC',
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
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
    marginTop: -100,
    color: '#000',
  },
  shortView: {
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  saveText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    paddingHorizontal: 5,
  },
  saveButton: {
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 100,
    padding: 5,
    marginBottom: Platform.OS === 'ios' ? 110 : 80,
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
