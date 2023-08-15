import {useEffect, useRef, useState} from 'react';
import api from '../api/api';
import {
  Category,
  CategoryResponse,
} from '../interfaces/CategoryResponse.interface';

export const useCategoryPaginatedWithNodes = (nodeId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  const loadCategories = async (node: string) => {
    setIsLoading(true);
    const body = {
      filter: {status: ['=', true], nodes: ['=', node]},
      page: nextPage.current,
      sort: {createdAt: 'ASC'},
      population: [
        {
          path: 'image',
          fields: {
            url: true,
          },
        },
        {path: 'subcategories', fields: {name: true}},
        {path: 'nodes', fields: {name: true}},
      ],
    };
    try {
      if (nextPage.current <= totalPages.current + 2) {
        setIsLoading(true);

        const resp = await api.post<CategoryResponse>(
          '/categories/getListUnAuth',
          body,
        );

        nextPage.current = resp.data.page + 1;
        totalPages.current = resp.data.totalPages;
        setCategoryList([...categoryList, ...resp.data.data]);
        setIsLoading(false);
      } else {
        console.log('Se termino?');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories(nodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    categoryList,
    loadCategories,
  };
};
