import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {CategoryComponent} from '../../components/home/CategoryComponent';
import {RootStackParams} from '../../navigator/HomeStack';

interface Props extends StackScreenProps<RootStackParams, 'CategoryScreen'> {}

export const CategoryScreen = (props: Props) => {
  const {route} = props;
  const {category} = route.params;
  return (
    <>
      <CategoryComponent category={category} />
    </>
  );
};
