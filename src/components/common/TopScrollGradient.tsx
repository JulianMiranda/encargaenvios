import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackButton} from './BackButton';

const {height} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

interface Props {
  title: string;
  children: any;
}

export const TopScrollGradient = ({children, title}: Props) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<any>();

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
          <Text style={styles.textTitle}>{title}</Text>
        </Animated.View>
      </Animated.View>

      <ScrollView
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
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>

        <BackButton navigation={navigation} />
        {children}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
  buttonText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
});
