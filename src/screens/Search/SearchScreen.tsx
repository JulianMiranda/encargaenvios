import React, {useEffect, useState} from 'react';
import {Animated, Keyboard, StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  AnimatedIcon,
  arrowAnimation,
  inputAnimation,
  inputAnimationWidth,
  animatedTransition,
} from '../../components/search/SearchAnimation';
import {SearchHistory} from '../../components/search/SearchHistory';
import {SuggestionsSearch} from '../../components/search/SuggestionsSearch';
import {SearchResults} from '../../components/search/SearchResults';
import {updateSearchHistory} from '../../utils/searchHistory';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [findResultsQuery, setFindResultsQuery] = useState('');
  const {top} = useSafeAreaInsets();
  useEffect(() => {
    animatedTransition.start();
  }, []);
  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    if (searchQuery === '') {
      setFindResultsQuery('');
      setShowResults(false);
    }
  }, [searchQuery]);

  const onSearch = async (reuseSearch: any) => {
    const isReuse = typeof reuseSearch === 'string';
    if (!isReuse && searchQuery === '') return;
    Keyboard.dismiss();
    !isReuse && (await updateSearchHistory(searchQuery));
    if (isReuse) {
      await updateSearchHistory(reuseSearch);
      setSearchQuery(reuseSearch);
    }
    setFindResultsQuery(isReuse ? reuseSearch : searchQuery);
    setShowResults(true);
  };
  const closeSearch = () => {
    Keyboard.dismiss();
    onChangeSearch(''); /* 
    navigation.navigate('Home'); */
  };
  return (
    <>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: top + 5,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, arrowAnimation]}
          onPress={() => {
            closeSearch();
          }}
        />

        <Animated.View style={[inputAnimation, {width: inputAnimationWidth}]}>
          <Searchbar
            placeholder="Busca tu producto"
            autoFocus
            onPressOut={() => console.log('out')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={onSearch}
            style={styles.textBackground}
            inputStyle={{height: 40, alignSelf: 'center'}}
          />
        </Animated.View>
      </View>
      {searchQuery !== '' && !showResults && (
        <SuggestionsSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={onSearch}
        />
      )}
      {searchQuery === '' && !showResults && (
        <SearchHistory
          showHistory={true}
          containerHeight={120}
          onSearch={onSearch}
        />
      )}
      <SearchResults search={findResultsQuery} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    top: 30,
    height: 68,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    zIndex: 1,
  },
  containerInput: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  backArrow: {
    paddingTop: 5,
    paddingLeft: 5,
    color: 'black',
    height: 30,
    width: 30,
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 45,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
