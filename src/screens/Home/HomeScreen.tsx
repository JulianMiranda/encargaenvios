/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NodeCarousel} from '../../components/home/NodeCarousel';
import {useHome} from '../../hooks/useHome';
import {Rebajas} from '../../components/home/Rebajas';
import {HomeCategories} from '../../components/home/HomeCategories';
import {PromoUp} from '../../components/home/PromoUp';
import {PromoDown} from '../../components/home/PromoDown';
import {CategoryCardRecomended} from '../../components/home/CategoryCardRecomended';
import {useCategoryRecomendedPaginated} from '../../hooks/useCategoryRecomendedPaginated';
import {ErrorHome} from '../../components/home/ErrorHome';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Modalize} from 'react-native-modalize';
import {SearchModalize} from './SearchModalize';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {
    nodes,
    offers,
    errorHome,
    lastCategories,
    mostSaleLastMonth,
    promoUp,
    loaoadByError,
    promoDown,
  } = useHome();

  const {categoryRecomendedList, loadCategoriesRecomended} =
    useCategoryRecomendedPaginated();
  const modalizeRef = useRef<Modalize>(null);

  const navigation = useNavigation();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 80
    );
  };
  return (
    <>
      <View
        style={{
          position: 'absolute',
          zIndex: 9999999,
          width: width,
          left: 0,
          backgroundColor: 'rgba(255,255,255,0.92)',
        }}>
        <Image
          source={require('../../assets/slogan_nofondo.png')}
          style={{
            alignSelf: 'center',
            marginTop: top,
            height: height * 0.04,
            width: 85,
            resizeMode: 'contain',
          }}
        />
        <TouchableOpacity
          /*  onPress={() => modalizeRef.current?.open()} */
          onPress={() => navigation.navigate('Search', {screen: 'Searchcreen'})}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: 10,
            paddingHorizontal: 15,
          }}>
          <Icon name="search" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView
        scrollEventThrottle={0}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            loadCategoriesRecomended();
            console.log('final');
          }
        }}
        style={{}}>
        <PromoUp promoUp={promoUp} />

        {nodes.slice(0, 2).map((node, index) => (
          <NodeCarousel key={index} node={node} />
        ))}
        {offers.length > 0 && <Rebajas offers={offers} />}

        {nodes.slice(2).map((node, index) => (
          <NodeCarousel key={index} node={node} />
        ))}
        {errorHome.errorHome && (
          <ErrorHome text="Ofertas" onPress={loaoadByError} />
        )}

        {mostSaleLastMonth.length > 0 && (
          <HomeCategories
            data={mostSaleLastMonth}
            title={'TOP VENTAS'}
            color={'#96D573'}
          />
        )}
        <View style={{marginBottom: -100, zIndex: 100}}>
          {lastCategories.length > 0 && (
            <HomeCategories
              data={lastCategories}
              title={'LO ULTIMO'}
              color={'#8673D5'}
            />
          )}
        </View>
        <PromoDown imagesPromoFinal={promoDown} />
        <View style={{marginTop: -25}}>
          <CategoryCardRecomended
            categoryRecomendedList={categoryRecomendedList}
            promoDown={promoDown}
          />
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        modalHeight={height * 0.8}
        modalStyle={{zIndex: 99999999}}>
        <SearchModalize />
      </Modalize>
    </>
  );
};
