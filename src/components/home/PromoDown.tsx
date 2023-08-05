import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {PromoFinal} from '../../interfaces/PromoDown.interface';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/HomeStack';

interface Props {
  imagesPromoFinal: PromoFinal[];
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryScreen'> {}
export const PromoDown = ({imagesPromoFinal}: Props) => {
  const [imagesSlider, setImagesSlider] = useState<string[]>([]);
  const navigation = useNavigation<PropsNavigation>();
  useEffect(() => {
    const images = imagesPromoFinal.map((promo: PromoFinal) => promo.image.url);
    setImagesSlider(images);
  }, [imagesPromoFinal]);

  /* const modalizeRef = useRef<Modalize>(null); */
  const onOpen = (index: any) => {
    if (imagesPromoFinal[index].category) {
      navigation.navigate('CategoryScreen', {
        category: imagesPromoFinal[index].category,
      });
    }
    /*  modalizeRef.current?.open(); */
  };
  return (
    <>
      <SliderBox
        images={imagesSlider}
        sliderBoxHeight={500}
        onCurrentImagePressed={(index: any) => onOpen(index)}
        dotColor="transparent"
        imageLoadingColor="#fb2331"
        inactiveDotColor="transparent"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        autoplayInterval={7000}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={styles.paginationBox}
        dotStyle={styles.dot}
        ImageComponentStyle={styles.image}
      />
    </>
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
  },
});
