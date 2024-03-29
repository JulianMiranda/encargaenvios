import {useRef, useState} from 'react';
import api from '../api/api';
import {
  Subcategory,
  SucategoryResponse,
} from '../interfaces/Subcategory.interface';
import {Hall} from '../interfaces/Hall.interface';

export const useSubcategoryPaginated = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAllCat, setIsLoadingAllCat] = useState(true);

  const [subcategoryList, setSubcategoryList] = useState<Subcategory[]>([]);
  const [subcategoryFilteredList, setSubcategoryFilteredList] = useState<
    Subcategory[]
  >([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  let pageFilter = useRef(1);
  let totalPagesFilter = useRef(2);
  let totalCountFilter = useRef(0);

  const loadSubcategories = async (node: string) => {
    console.log('loadSubcategories');
    setIsLoadingAllCat(true);
    const body = {
      filter: {
        status: ['=', true],
        personalCombo: ['=', true],
        nodes: ['=', node],
      },
      page: nextPage.current,
      docsPerPage: 20,
      sort: {name: 'asc'},
      population: [
        {
          path: 'images',
          fields: {
            url: true,
          },
        },
      ],
    };
    try {
      const resp = await api.post<SucategoryResponse>(
        '/subcategories/getListUnAuth',
        body,
      );

      nextPage.current = resp.data.page + 1;
      totalPages.current = resp.data.totalPages;
      setSubcategoryList([...subcategoryList, ...resp.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAllCat(false);
    }
  };

  const searchSubcategories = async (search: string, node: string) => {
    console.log('searchSubcategories', search, node);
    setIsLoading(true);
    /* const body = {
      filter: {
        status: ['=', true],
        personalCombo: ['=', true],
        nodes: ['=', node],
      },
      docsPerPage: 20,
      search: {text: search, fields: ['name']},
      sort: {name: 'asc'},
      population: [
        {
          path: 'images',
          fields: {
            url: true,
          },
        },
      ],
    }; */

    try {
      setIsLoading(true);

      const resp = await api.put<Subcategory[]>('/queries/subcategorySearch/', {
        search,
        node,
      });
      /* const resp = await api.post<SucategoryResponse>(
        '/subcategories/getListUnAuth',
        body,
      ); */
      setSubcategoryList(resp.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const filterSubcategories = async (
    hall: Hall,
    node: string,
    page: number,
  ) => {
    try {
      console.log('Haciendo filterSubcategories');
      setIsLoading(true);
      const body = {
        filter: {
          status: ['=', true],
          personalCombo: ['=', true],
          nodes: ['=', node],
          hall: ['=', hall.id],
        },
        page: page,
        docsPerPage: 20,
        sort: {name: 'asc'},
        population: [
          {
            path: 'images',
            fields: {
              url: true,
            },
          },
        ],
      };

      const resp = await api.post<SucategoryResponse>(
        '/subcategories/getListUnAuth',
        body,
      );
      totalPagesFilter.current = resp.data.totalPages + 1;
      totalCountFilter.current = resp.data.count;
      pageFilter.current = page;

      setSubcategoryFilteredList(prevData => [...prevData, ...resp.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilter = (hall: Hall, node: string) => {
    pageFilter.current = 1;
    totalPagesFilter.current = 2;
    totalCountFilter.current = 0;
    setSubcategoryFilteredList([]);
    filterSubcategories(hall, node, 1);
  };

  const loadMoreFilteredData = (hall: Hall, node: string) => {
    if (!isLoading && pageFilter.current < totalPagesFilter.current) {
      filterSubcategories(hall, node, pageFilter.current + 1);
    }
  };

  const loadMoreData = (node: string) => {
    if (!isLoadingAllCat && nextPage.current <= totalPages.current + 2) {
      loadSubcategories(node);
    }
    /*  if (!isLoading && pageFilter.current < totalPagesFilter.current) {
      filterSubcategories(hall, node, pageFilter.current + 1);
    } */
  };

  return {
    isLoading,
    subcategoryList,
    subcategoryFilteredList,
    loadSubcategories,
    searchSubcategories,
    filterSubcategories,
    resetFilter,
    loadMoreFilteredData,
    loadMoreData,
  };
};
