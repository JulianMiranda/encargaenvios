/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Node} from '../../interfaces/Node.interface';
import {FadeInImage} from '../../components/common/FadeInImage';
import {CategoryCard} from '../../components/home/CategoryCard';
import {useCategoryPaginatedWithNodes} from '../../hooks/useCategoryPaginatedWithNodes';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/HomeStack';

const {height} = Dimensions.get('screen');
const HEADER_MAX_HEIGHT = height * 0.15;
const HEADER_MIN_HEIGHT = height < 600 ? 50 : 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
interface Props {
  node: Node;
}
interface Props
  extends StackScreenProps<RootStackParams, 'CategoryListScreen'> {}

export const CategoryListScreen = (props: Props) => {
  const {route, navigation} = props;
  const {node} = route.params;
  const {isLoading, categoryList, loadCategories} =
    useCategoryPaginatedWithNodes(node.id);
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

  console.log(categoryList.length);

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
          elevation: headerZindex, //required for android
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
            {node.name}
          </Text>
        </Animated.View>
      </Animated.View>
      <FlatList
        data={categoryList}
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
                borderColor: 'white',
                borderWidth: 3,
                overflow: 'hidden',
                marginTop: profileImageMarginTop,
                marginLeft: 10,
              }}>
              <FadeInImage
                uri={node.image.url}
                style={{flex: 1, width: 75, height: 75}}
              />
            </Animated.View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 26,
                  paddingLeft: 10,
                  marginTop: -100,
                }}>
                {node.name}
              </Text>
            </View>
          </>
        }
        keyExtractor={(subcategory, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        renderItem={({item}) => <CategoryCard category={item} />}
        onEndReached={() => loadCategories(node.id)}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <>
            {isLoading && (
              <ActivityIndicator
                style={{marginTop: categoryList.length === 0 ? 150 : 0}}
                color={'#fb2331'}
              />
            )}

            <View style={{height: 130}} />
          </>
        }
      />
    </View>
  );
};
