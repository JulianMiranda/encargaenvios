import React, {useContext} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../context/theme/ThemeContext';
interface Props {
  progress: number;
  barWidth: Animated.Value;
}
const {width} = Dimensions.get('window');
export const AnimatedProgress = ({barWidth, progress}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <>
      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {backgroundColor: colors.card},
            {width: barWidth},
          ]}
        />

        <View style={{...styles.viewCircle, borderColor: colors.card, left: 0}}>
          {progress > 1 ? (
            <Text
              style={{
                color: colors.card,
                fontSize: 20,
              }}>
              1
            </Text>
          ) : (
            <Icon name="check" size={26} color={colors.card} />
          )}
        </View>

        <View
          style={{
            ...styles.viewCircle,
            borderColor: progress > 1 ? '#f1f1f1' : colors.card,
            left: (width * 0.8) / 2 - 20,
          }}>
          {progress > 0 ? (
            <Text
              style={{
                color: progress > 1 ? '#f1f1f1' : colors.card,
                fontSize: 20,
              }}>
              2
            </Text>
          ) : (
            <Icon name="check" size={26} color={colors.card} />
          )}
        </View>
        <View
          style={{
            ...styles.viewCircle,
            borderColor: progress > 0 ? '#f1f1f1' : colors.card,
            right: 0,
          }}>
          <Text
            style={{
              color: progress > 0 ? '#f1f1f1' : colors.card,
              fontSize: 20,
            }}>
            3
          </Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  progressBar: {
    width: width / 2,
    height: 5,
    borderRadius: 15,
  },
  barContainer: {
    flex: 1,
    width: width * 0.8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#f1f1f1' /* 
    backgroundColor: 'transparent', */,
    paddingHorizontal: 30,
  },
  viewCircle: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
  },
});
