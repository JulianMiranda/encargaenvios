/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHome} from '../../hooks/useHome';
import {Rebajas} from '../../components/home/Rebajas';
import {HomeCategories} from '../../components/home/HomeCategories';
import {PromoUp} from '../../components/home/PromoUp';
import {PromoDown} from '../../components/home/PromoDown';
import {CategoryCardRecomended} from '../../components/home/CategoryCardRecomended';
import {useCategoryRecomendedPaginated} from '../../hooks/useCategoryRecomendedPaginated';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {NodesList} from '../../components/home/NodesList';
import {MostSales} from '../../components/home/MostSales';
import {UpdateVersion} from '../../components/common/UpdateVersion';
import {AuthContext} from '../../context/auth/AuthContext';
import VersionNumber from 'react-native-version-number';

const {width, height} = Dimensions.get('window');

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {
    nodes,
    offers,
    lastCategories,
    mostSaleLastMonth,
    promoUp,
    mainCategories,
    promoDown,
    nodesLoading,
    loadNodes,
    loadPromoUp,
    loadHome,
    loadMainCategories,
    mainCategoriesLoading,
  } = useHome();

  const {categoryRecomendedList, loadCategoriesRecomended} =
    useCategoryRecomendedPaginated();

  const navigation = useNavigation<any>();
  const {minimumVersion} = useContext(AuthContext);

  useEffect(() => {
    if (!nodesLoading && !mainCategoriesLoading) {
      SplashScreen.hide();
    }
  }, [nodesLoading, mainCategoriesLoading]);
  useEffect(() => {
    loadPromoUp();
    loadNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadMainCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    // Obtener la versión actual de la aplicación
    // Comprobar si se debe mostrar el modal de actualización
    if (compareVersions(VersionNumber.appVersion, minimumVersion) < 0) {
      setShowUpdateModal(true);
    }
  }, []);

  // Función para comparar versiones
  const compareVersions = (versionDevice: string, versionActual: number) => {
    const partsA = versionDevice.split('.').map(Number);
    const partsB = versionActual;
    if (partsA[0] < partsB) {
      return -1;
    } else {
      return 1;
    }
  };

  return (
    <>
      {showUpdateModal && <UpdateVersion />}
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
            width: 100,
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
        <NodesList nodes={nodes} />
        {mainCategories.length > 0 && <MostSales categories={mainCategories} />}
        {offers.length > 0 && <Rebajas offers={offers} />}
        {mostSaleLastMonth.length > 0 && (
          <HomeCategories
            data={mostSaleLastMonth}
            title={'TOP VENTAS'}
            color={'#96D573'}
          />
        )}
        <View style={{marginBottom: 0, zIndex: 100}}>
          {lastCategories.length > 0 && (
            <HomeCategories
              data={lastCategories}
              title={'LO ULTIMO'}
              color={'#8673D5'}
            />
          )}
        </View>
        <PromoDown imagesPromoFinal={promoDown} />
        <View style={{marginTop: 0}}>
          <CategoryCardRecomended
            categoryRecomendedList={categoryRecomendedList}
            promoDown={promoDown}
          />
        </View>

        <View
          style={{
            height: 150,
            width: '100%',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={18} color={'#5f5f5f'} />
        </View>
      </ScrollView>
    </>
  );
};
