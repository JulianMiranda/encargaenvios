import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FadeInImage} from '../common/FadeInImage';
import {useHalls} from '../../hooks/useHalls';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {Hall} from '../../interfaces/Hall.interface';

const {width} = Dimensions.get('window');
interface Props {
  selectedHall: Hall | undefined;
  setSelectedHall: React.Dispatch<React.SetStateAction<Hall | undefined>>;
  clickFilter: (hall: Hall) => void;
  isLoading: boolean;
  halls: Hall[] | [];
}
export const FilterHalls = ({
  selectedHall,
  setSelectedHall,
  clickFilter,
  isLoading,
  halls,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const scaleValue = new Animated.Value(1);
  const scaleValue2 = new Animated.Value(1);

  const [first, setfirst] = useState<Hall>();

  /*   const scaleValue = new Animated.Value(1); */

  const handleImagePress = (image: Hall) => {
    setfirst(image);
    setSelectedHall(image);
    clickFilter(image);
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: false,
    }).start();

    /*  Animated.spring(scaleValues[image.id], {
      toValue: 1.2,
      useNativeDriver: false,
    }).start(); */
  };

  useEffect(() => {
    if (halls.length > 0) {
      setfirst(halls[0]);
    }
  }, [halls]);

  /*  const resetAnimation = () => {
    console.log('Reset');

    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }; */

  return (
    <View style={{justifyContent: 'center'}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft: 5, paddingBottom: 10}}>
        {halls.map((hall, index) => (
          <Animated.View
            key={index}
            style={{
              transform: hall.id === first?.id ? [{scale: scaleValue}] : [],
              opacity: hall.id === first?.id ? 1 : 0.55,
            }}>
            <TouchableOpacity
              /*  onPressOut={() => resetAnimation()} */
              activeOpacity={0.8}
              onPress={() => handleImagePress(hall)}
              style={{
                ...styles.button,
              }}>
              <View
                style={{
                  ...styles.imageContainer,
                  shadowColor: hall.id === first?.id ? '#000' : '#fff',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <FadeInImage
                  uri={hall.image.url}
                  style={{
                    ...styles.image,
                  }}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
        {isLoading && (
          <ActivityIndicator
            size={20}
            style={styles.activity}
            color={colors.card}
          />
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  activity: {marginLeft: 10},
  imageContainer: {
    borderRadius: 4,
  },
  image: {
    width: 60,
    height: 27,
    resizeMode: 'stretch',
    borderRadius: 4,
  },
  button: {
    alignItems: 'center',
    marginRight: width * 0.03,
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
