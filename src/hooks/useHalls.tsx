import {useState} from 'react';
import api from '../api/api';
import {Hall, HallResp} from '../interfaces/Hall.interface';
import {ErrorResp} from '../interfaces/ErrorResp.interface';
import {useToast} from 'react-native-toast-notifications';

export const useHalls = () => {
  const [isLoadingHals, setIsLoading] = useState(true);
  const [halls, setHalls] = useState<Hall[]>([]);
  const toast = useToast();

  const loadHalls = async (node: string) => {
    const body = {
      filter: {status: ['=', true], node: ['=', node]},
      sort: {createdAt: 'ASC'},
      population: [
        {
          path: 'image',
          fields: {
            url: true,
          },
        },
      ],
    };
    try {
      api
        .post<HallResp>('/halls/getListUnAuth', body)
        .then(({data}) => {
          setHalls(data.data);
          setIsLoading(false);
        })
        .catch((error: ErrorResp) => {
          console.log(error.code);
          if (error.code === 'ERR_NETWORK') {
            toast.show('Tu conexión a internet es inestable', {
              type: 'normal',
              placement: 'top',
              duration: 3000,
              style: {width: '100%', justifyContent: 'center', marginTop: 30},
              textStyle: {fontSize: 16},
              animationType: 'slide-in',
            });
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.log('Catch error load Nodes: ' + error);
      setIsLoading(false);
    }
  };

  return {
    isLoadingHals,
    halls,
    loadHalls,
  };
};
