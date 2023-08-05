import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface Props {
  promoUp: string[];
}
const {width, height} = Dimensions.get('window');
export const PromoUp = ({promoUp}: Props) => {
  const {top} = useSafeAreaInsets();
  if (promoUp.length === 0)
    return (
      <View
        style={{
          marginTop: top,
          height: height * 0.04,
          width: '100%',
        }}
      />
    );
  return (
    <SliderBox
      images={promoUp}
      sliderBoxHeight={width * 0.16}
      onCurrentImagePressed={(index: any) =>
        console.warn(`image ${index} pressed`)
      }
      dotColor="#b0b0b0"
      imageLoadingColor="#fb2331"
      inactiveDotColor="#f1f1f1"
      paginationBoxVerticalPadding={20}
      autoplay
      circleLoop
      autoplayInterval={7000}
      resizeMethod={'resize'}
      resizeMode={'cover'}
      paginationBoxStyle={styles.paginationBox}
      dotStyle={styles.dot}
      ImageComponentStyle={{...styles.image, marginTop: top + height * 0.04}}
    />
  );
};
const styles = StyleSheet.create({
  paginationBox: {
    position: 'absolute',
    bottom: -15,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  image: {
    width: '100%',
    marginBottom: 10,
  },
});
