import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/HomeStack';
import {BackButton} from '../../components/common/BackButton';
import {useSubcategoryPaginated} from '../../hooks/useSubcategoryPaginated';
import {SubcategoryCombo} from '../../components/home/SubcategoryCombo';
import {Modalize, useModalize} from 'react-native-modalize';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {SubcategoryModalize} from '../../components/home/SubcategoryModalize';
import {CarCombo} from '../../components/home/CarCombo';
import {FilterHalls} from '../../components/home/FilterHalls';
import {Hall} from '../../interfaces/Hall.interface';
import {useHalls} from '../../hooks/useHalls';
import {DropCombo} from '../../components/home/DropCombo';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import {SearchSubcategory} from '../../components/home/SearchSubcategory';

const {height} = Dimensions.get('screen');
interface Props
  extends StackScreenProps<RootStackParams, 'CategoryListComboScreen'> {}

export const CategoryListComboScreen = ({route, navigation}: Props) => {
  const {node} = route.params;
  const {
    isLoading,
    subcategoryList,
    subcategoryFilteredList,
    searchSubcategories,
    resetFilter,
    loadMoreFilteredData,
    loadMoreData,
  } = useSubcategoryPaginated();
  const {halls, isLoadingHals, loadHalls} = useHalls();
  const {ref, open} = useModalize();
  const [subactegorySelected, setSubactegorySelected] = useState<Subcategory>();
  const [term, setTerm] = useState('');
  const [textValue, setTextValue] = useState('');
  const [selectedHall, setSelectedHall] = useState<Hall>();

  const openModal = (subcategory: Subcategory) => {
    setSubactegorySelected(subcategory);
    open();
  };
  /*   useEffect(() => {
    setSelectedHall
  }, [third])
   */
  useEffect(() => {
    if (node) {
      loadHalls(node.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  useEffect(() => {
    if (halls.length > 0) {
      setSelectedHall(halls[0]);
      resetFilter(halls[0], node.id);
    }
  }, [halls]);

  useEffect(() => {
    if (term) {
      setSelectedHall(undefined);
      searchSubcategories(term, node.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const clickFilter = (hall: Hall) => {
    if (selectedHall && selectedHall.id !== hall.id) {
      resetFilter(hall, node.id);
    } else {
      /*  resetFilter(hall, node.id); */
    }
    setTextValue('');
  };

  const translationY = new Animated.Value(0);
  const translateY = Animated.diffClamp(translationY, 0, height * 0.25); // Ajusta según tus necesidades

  const onGestureEvent = Animated.event([{nativeEvent: {translationY}}], {
    useNativeDriver: false,
  });

  const onHandlerStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    console.log(nativeEvent.state);

    if (nativeEvent.state === State.END) {
      const toValue = nativeEvent.translationY > 0 ? height * 0.25 : 0;
      Animated.spring(translationY, {
        toValue,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleAnimation = (toValue: number) => {
    Animated.spring(translationY, {
      toValue,
      useNativeDriver: false,
      bounciness: 4,
      speed: 12,
    }).start();
  };
  const handleSearchOpen = (position: number) => {
    // Aquí puedes ajustar el valor de toValue según tus necesidades
    handleAnimation(position);
    // También puedes realizar otras acciones relacionadas con el botón
  };
  return (
    <View style={{flex: 1}}>
      <BackButton navigation={navigation} />
      <SearchSubcategory
        onDebounce={value => setTerm(value)}
        textValue={textValue}
        setTextValue={setTextValue}
        name={node.name}
        handleSearchOpen={handleSearchOpen}
        node={node}
      />

      <Animated.View
        style={[
          styles.header,
          {
            height: translateY.interpolate({
              inputRange: [0, height * 0.25],
              outputRange: [height * 0.3, 100],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <CarCombo />
      </Animated.View>
      <DropCombo node={node.id} />
      <FilterHalls
        selectedHall={selectedHall}
        setSelectedHall={setSelectedHall}
        clickFilter={clickFilter}
        isLoading={isLoadingHals}
        halls={halls}
      />

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={{}}>
          {selectedHall ? (
            <FlatList
              data={subcategoryFilteredList}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: translationY}}}],
                {useNativeDriver: false},
              )}
              keyExtractor={(subcategory, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <SubcategoryCombo
                  subcategory={item}
                  openModal={openModal}
                  node={node.id}
                />
              )}
              onEndReached={() => {
                loadMoreFilteredData(selectedHall, node.id);
              }}
              onEndReachedThreshold={0.4}
              ListFooterComponent={
                <>
                  {isLoading && (
                    <ActivityIndicator
                      style={{marginTop: subcategoryList.length === 0 ? 0 : 0}}
                      color={'#fb2331'}
                    />
                  )}
                  <View style={{height: 470}} />
                </>
              }
            />
          ) : (
            <FlatList
              data={subcategoryList}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: translationY}}}],
                {useNativeDriver: false},
              )}
              keyExtractor={(subcategory, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <SubcategoryCombo
                  subcategory={item}
                  openModal={openModal}
                  node={node.id}
                />
              )}
              onEndReached={() => {
                !term && loadMoreData(node.id);
              }}
              onEndReachedThreshold={0.4}
              ListFooterComponent={
                <>
                  {isLoading && (
                    <ActivityIndicator
                      style={{marginTop: subcategoryList.length === 0 ? 0 : 0}}
                      color={'#fb2331'}
                    />
                  )}
                  <View style={{height: 470}} />
                </>
              }
            />
          )}
        </Animated.View>
      </PanGestureHandler>
      <Modalize
        modalStyle={{...styles.modalize}}
        ref={ref}
        modalTopOffset={height * 0.25}>
        <SubcategoryModalize subcategory={subactegorySelected} />
      </Modalize>
    </View>
  );
};
const styles = StyleSheet.create({
  modalize: {
    zIndex: 99999,
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  nodeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 26,
    paddingLeft: 10,
  },
  searchAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {},
  container: {
    flex: 1,
    width: '95%',
    borderColor: 'rgba(0, 0, 0,0.5)',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    padding: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  table: {flex: 1 /* , minHeight: 150 */},
  comboItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    justifyContent: 'space-between',
  },
  info: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  textItem: {marginLeft: 5, flex: 12},
  textCantidad: {marginLeft: 3, flex: 1},
  image: {height: 25, width: 25, flex: 1},
  icon: {},
  trash: {padding: 5, alignItems: 'center'},
  separator: {height: 15},
  searchButton: {
    position: 'absolute',
    zIndex: 999999999,
    right: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
