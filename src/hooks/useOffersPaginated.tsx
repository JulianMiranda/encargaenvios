import {useState, useEffect, useRef} from 'react';
import api from '../api/api';
import {
  Category,
  CategoryResponse,
} from '../interfaces/CategoryResponse.interface';

export const useOffersPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  const loadCategories = async () => {
    const body = {
      filter: {
        priceDiscount: ['>', 0],
        status: ['=', true],
      },
      docsPerPage: 12,
      sort: 'ASC',
      page: nextPage.current,
      population: [
        {
          path: 'subcategories',
          filter: {status: true},
          fields: {
            name: true,
          },
        },
        {
          path: 'nodes',
          filter: {status: true},
          fields: {
            name: true,
          },
        },
        {
          path: 'image',
          filter: {status: true},
          fields: {
            url: true,
          },
          options: {sort: {updatedAt: 1}},
        },
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
        setCategories([...categories, ...resp.data.data]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    categories,
    loadCategories,
  };
};
