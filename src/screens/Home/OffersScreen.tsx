/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CategoryDiscountCard} from '../../components/home/CategoryDiscountCard';
import {useOffersPaginated} from '../../hooks/useOffersPaginated';
import {RootStackParams} from '../../navigator/HomeStack';

const {height} = Dimensions.get('screen');
const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'OffersScreen'> {}

export const OffersScreen = () => {
  const {isLoading, loadCategories, categories} = useOffersPaginated();
  const navigation = useNavigation<PropsNavigation>();
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
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          ...styles.container,
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex,
        }}>
        <Animated.View
          style={{
            bottom: headerTitleBottom,
            ...styles.view,
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
            Rebajas
          </Text>
        </Animated.View>
      </Animated.View>
      <FlatList
        data={categories}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        ListHeaderComponent={
          <>
            <Animated.View
              style={{
                height: profileImageHeight,
                width: profileImageHeight,
                borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                marginTop: profileImageMarginTop,
                ...styles.shortView,
              }}>
              <Image
                source={require('../../assets/porciento.jpg')}
                style={{flex: 1, width: 75, height: 75}}
              />
            </Animated.View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>Rebajas</Text>
            </View>
          </>
        }
        keyExtractor={(subcategory, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={({item}) => <CategoryDiscountCard item={item} />}
        onEndReached={loadCategories}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <>
            {isLoading && <ActivityIndicator color={'#fb2331'} />}

            <View style={{height: 80}} />
          </>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
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
    color: '#000',
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
    marginTop: -100,
  },
});
