import React, {useEffect, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {animatedTransition} from '../search/SearchAnimation';
import {useDebouncedValue} from '../../hooks/useDebouncedValue';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Node} from '../../interfaces/Node.interface';
import {useNodeInPromo} from '../../hooks/useNodeInPromo';

interface Props {
  onDebounce: (value: string) => void;
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  node: Node;
  name: string;
  handleSearchOpen: (position: number) => void;
}

export const SearchSubcategory = ({
  onDebounce,
  textValue,
  setTextValue,
  node,
  name,
  handleSearchOpen,
}: Props) => {
  const deboncedValue = useDebouncedValue(textValue);
  const {top} = useSafeAreaInsets();
  const [showTextInput, setShowTextInput] = useState(false);
  const fadeValue = new Animated.Value(1);
  const inputTranslateX = new Animated.Value(1000);

  const {nodeInPromo} = useNodeInPromo([node]);

  const handleSearchPress = () => {
    if (showTextInput) {
      handleSearchOpen(100);
    } else {
      handleSearchOpen(270);
    }
    setShowTextInput(!showTextInput);
  };
  useEffect(() => {
    if (showTextInput) {
      Animated.parallel([
        Animated.timing(fadeValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(inputTranslateX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(() => {
        console.log('start');

        setShowTextInput(true);
      });
    } else {
      Animated.parallel([
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(inputTranslateX, {
          toValue: 1000,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowTextInput(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTextInput]);

  useEffect(() => {
    onDebounce(deboncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deboncedValue]);

  const handleFocus = () => {
    animatedTransition.start();
  };
  /*   useEffect(() => {
    return () => {
      animatedTransition.reset();
    };
  }, []); */

  return (
    <View style={{...styles.container, marginTop: top + 20}}>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: 70,
            alignItems: 'center',
          }}>
          <Animated.Text style={[styles.nodeText, {opacity: fadeValue}]}>
            {name}
          </Animated.Text>
          {nodeInPromo && (
            <Animated.View
              style={[styles.promoContainer, {opacity: fadeValue}]}>
              <Text style={styles.promoText}>Promo</Text>
            </Animated.View>
          )}
        </View>
        {showTextInput && (
          <Animated.View
            style={[
              styles.inputContainer,
              {transform: [{translateX: inputTranslateX}]},
            ]}>
            <TextInput
              style={styles.textInput}
              placeholder="Buscar..."
              autoFocus
              value={textValue}
              onChangeText={setTextValue}
              onFocus={handleFocus}
              onBlur={() => {
                setShowTextInput(false);
                Animated.parallel([
                  Animated.timing(fadeValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                  }),
                  Animated.timing(inputTranslateX, {
                    toValue: 1000,
                    duration: 500,
                    useNativeDriver: false,
                  }),
                ]).start();
              }}
            />
          </Animated.View>
        )}
        <TouchableOpacity onPress={handleSearchPress}>
          {!showTextInput ? (
            <Icon name="search" size={18} color={'#5f5f5f'} />
          ) : (
            <Icon
              name="close"
              size={18}
              color={'#5f5f5f'}
              style={{marginLeft: 10}}
            />
          )}
          {/*  <Text style={styles.searchIcon}>{!showTextInput ? '🔍' : 'x'}</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*  <View style={styles.container}>
      <Animated.View
        style={[inputAnimation, {width: inputAnimationWidthSearch}]}>
           <Text
          style={{
            ...styles.nodeText,
            marginRight: width * 0.14,
          }}>
          {node.name}
        </Text>
        <TextInput
          value={textValue}
          onChangeText={setTextValue}
          placeholder="Buscar"
          style={styles.input}
          onFocus={handleFocus}
        />
      </Animated.View>
    </View> */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    minWidth: '30%',
  },
  textInput: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  searchIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  nodeText: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  promoContainer: {
    backgroundColor: '#8B4513',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  promoText: {
    fontSize: 10,
    color: '#fff',
  },
});
