import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {CategoryComponent} from '../../components/home/CategoryComponent';
import {RootStackParams} from '../../navigator/HomeStack';
import api from '../../api/api';
import {AuthContext} from '../../context/auth/AuthContext';

interface Props extends StackScreenProps<RootStackParams, 'CategoryScreen'> {}

export const CategoryScreen = (props: Props) => {
  const {route} = props;
  const {category} = route.params;

  const {status} = useContext(AuthContext);

  console.log('Viendo una categoría Search');
  useEffect(() => {
    try {
      if (status === 'authenticated' && category) {
        const body = {
          id: category.id,
        };
        api.post('/analytics/category', body);
      }
    } catch (error) {}
  }, []);
  return (
    <>
      <CategoryComponent category={category} />
    </>
  );
};
