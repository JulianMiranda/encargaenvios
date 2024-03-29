import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import {FacturasCarousel} from './FacturasCarousel';
import {OrderContext} from '../../context/order/OrderContext';
import LinearGradient from 'react-native-linear-gradient';
import {BackButton} from '../common/BackButton';
import {NoPropsInvited} from '../common/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';
import {FirstOrder} from './FirstOrder';

const {height} = Dimensions.get('screen');
const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const PerfilCarousel = () => {
  const {status} = useContext(AuthContext);
  const {orders, checkOrders, isLoading} = useContext(OrderContext);
  const navigation = useNavigation();

  const [numOrder, setnumOrder] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

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
  useEffect(() => {
    if (status === 'authenticated') {
      checkOrders();
    }
  }, [status]);

  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }

  const loadOrders = () => {
    console.log('LoadOrders');
    setnumOrder(prevState => prevState + 2);
    filteredOrders();
  };
  const filteredOrders = () => {
    return orders.slice(0, numOrder + 2);
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            ...styles.containerTop,
            height: headerHeight,
            zIndex: headerZindex,
            elevation: headerZindex,
          }}>
          <Animated.View
            style={{
              bottom: headerTitleBottom,
              ...styles.view,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Mis órdenes
            </Text>
          </Animated.View>
        </Animated.View>
        <FlatList
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          ListHeaderComponent={
            <View style={{marginBottom: 70}}>
              <LinearGradient
                colors={['#4EB2E4', '#94CFEC', '#fff']}
                style={{
                  ...styles.linearGradient,
                  height: height * 0.2,
                  marginBottom: -height * 0.1,
                }}>
                <Text style={styles.buttonText}>Mis Órdenes</Text>
              </LinearGradient>
            </View>
          }
          numColumns={1}
          data={filteredOrders()}
          keyExtractor={(order, index) => index.toString()}
          onEndReached={() => loadOrders()}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => <FacturasCarousel order={item} />}
          ListFooterComponent={<View style={{height: 100}} />}
        />
        {/* */}
      </View>
      {orders.length === 0 && !isLoading && <FirstOrder />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#4EB2E4',
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  listFooter: {
    width: 100,
  },
  containerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightskyblue',
    alignItems: 'center',
  },
  view: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  shortView: {
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
    marginTop: -100,
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
