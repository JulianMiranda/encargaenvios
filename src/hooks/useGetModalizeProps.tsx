import {useEffect, useState} from 'react';
import api from '../api/api';
import {Category} from '../interfaces/CategoryResponse.interface';
import {Subcategory} from '../interfaces/Subcategory.interface';

export const useGetModalizeProps = (category: Category) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subcategoriesAsc, setSubcategoriesAsc] = useState<Subcategory[]>([]);
  const loadSubcategories = () => {
    try {
      const body = {
        filter: {_id: ['=', category.id]},
        sort: {createdAt: 'ASC'},
        population: [
          {
            path: 'subcategories',
            fields: {
              name: true,
              price: true,
              images: true,
            },
            populate: [
              {
                path: 'images',
                fields: {
                  url: true,
                },
              },
            ],
          },
        ],
      };
      setIsLoading(true);
      api
        .post('/categories/getListUnAuth', body)
        .then(response => {
          setSubcategoriesAsc(response.data.data[0].subcategories);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    subcategoriesAsc,
    loadSubcategories,
  };
};
