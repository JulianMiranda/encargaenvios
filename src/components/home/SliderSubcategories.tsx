import React from 'react';
import {StyleSheet} from 'react-native';
import {Image as PImage} from '../../interfaces/Image.interface';
import {FadeInImage} from '../common/FadeInImage';

interface Props {
  images: PImage[];
}

export const SliderSubcategories = ({images}: Props) => {
  return (
    <>
      <FadeInImage uri={images[0].url} style={styles.image} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
});
