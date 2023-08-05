import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {CategoryComponent} from '../../components/home/CategoryComponent';
import {RootStackParams} from '../../navigator/SearchStack';

interface Props
  extends StackScreenProps<RootStackParams, 'CategorySearchScreen'> {}

export const CategorySearchScreen = (props: Props) => {
  const {route} = props;
  const {category} = route.params;
  return (
    <>
      <CategoryComponent category={category} />
    </>
  );
};
