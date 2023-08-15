import {useEffect, useRef, useState, useContext} from 'react';
import api from '../api/api';
import {AuthContext} from '../context/auth/AuthContext';
import {CategoryRecomendedResponse} from '../interfaces/CategoryRecomendedResponse.interface';
import {Category} from '../interfaces/CategoryResponse.interface';

export const useCategoryRecomendedPaginated = () => {
  const {status, user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryRecomendedList, setCategoryRecomendedList] = useState<
    Category[]
  >([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  const loadCategoriesRecomended = async () => {
    setIsLoading(true);
    const body = {
      page: nextPage.current,
      docsPerPage: 4,
      sort: {createdAt: 'ASC'},
    };
    try {
      if (nextPage.current <= totalPages.current + 2) {
        setIsLoading(true);

        const resp = await api.post<CategoryRecomendedResponse>(
          status === 'authenticated' && user?.id
            ? '/queries/getRecomendedCategories'
            : '/queries/getRecomendedCategoriesUnAuth',
          body,
        );
        console.log(resp.status);

        nextPage.current = resp.data.page + 1;
        totalPages.current = resp.data.totalPages;
        setCategoryRecomendedList([
          ...categoryRecomendedList,
          ...resp.data.data,
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  /*   useEffect(() => {
    loadCategoriesRecomended();
  }, []); */

  return {
    isLoading,
    categoryRecomendedList,
    loadCategoriesRecomended,
  };
};
