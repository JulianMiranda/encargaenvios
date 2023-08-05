import React, {Dispatch, SetStateAction} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Image, Image as PImage} from '../../interfaces/Image.interface';
import {SliderBox} from 'react-native-image-slider-box';

interface Props {
  images: PImage[];
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setImageIndex: Dispatch<SetStateAction<Image>>;
}

interface Item {
  item: {
    key: string;
    image: string;
  };
}
const {width, height} = Dimensions.get('window');

export const Slider = ({images, setIsVisible, setImageIndex}: Props) => {
  const slides = images.map(image => image.url);

  return (
    <>
      <SliderBox
        images={slides}
        sliderBoxHeight={height * 0.45}
        onCurrentImagePressed={(item: any) => {
          setIsVisible(true);
          setImageIndex({url: slides[item], id: images[item].id});
        }}
        dotColor="#b0b0b0"
        imageLoadingColor="#fb2331"
        inactiveDotColor="#f1f1f1"
        paginationBoxVerticalPadding={20}
        paginationBoxStyle={styles.paginationBox}
        dotStyle={styles.dot}
        ImageComponentStyle={styles.image}
      />
      {/* <AppIntroSlider
      showPrevButton={false}
      showNextButton={false}
      activeDotStyle={{backgroundColor: 'white'}}
      dotStyle={{backgroundColor: '#f1f1f1'}}
      renderItem={_renderItem}
      data={slides}
      onDone={undefined}
      doneLabel={''}
      showDoneButton={false}
      renderNextButton={undefined}
      renderPrevButton={undefined}
    /> */}
    </>
  );
};

const styles = StyleSheet.create({
  paginationBox: {
    position: 'absolute',
    bottom: -30,
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
  },
});
