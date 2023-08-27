import {useContext, useState} from 'react';
import api from '../api/api';
import {Node, NodePaginated} from '../interfaces/Node.interface';
import {PromoResponse} from '../interfaces/PromoUp.interface';
import {ErrorResp} from '../interfaces/ErrorResp.interface';
import {
  PromoFinalResponse,
  PromoFinal,
} from '../interfaces/PromoDown.interface';
import {useToast} from 'react-native-toast-notifications';
import {MainCategoriesResponse} from '../interfaces/MainCategoriesResponse.interface';
import {AuthContext} from '../context/auth/AuthContext';
import {Category} from '../interfaces/CategoryResponse.interface';
import {STRING} from '../forkApps/forkApps';

interface Error {
  errorNode: boolean;
  errorPromoUp: boolean;
  errorPromoDown: boolean;
  errorHome: boolean;
}

export const useHome = () => {
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const noError = {
    errorNode: false,
    errorPromoUp: false,
    errorPromoDown: false,
    errorHome: false,
  };

  const [errorHome, setErrorHome] = useState<Error>(noError);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [nodesLoading, setNodesLoading] = useState(true);
  const [mainCategoriesLoading, setMainCategoriesLoading] = useState(true);
  const [promoUp, setPromoUp] = useState<string[]>([]);
  const [promoDown, setPromoDown] = useState<PromoFinal[]>([]);

  const [offers, setOffers] = useState<any[]>([]);
  const [mostSaleLastMonth, setMostSaleLastMonth] = useState<any[]>([]);
  const [lastCategories, setLastCategories] = useState<any[]>([]);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);

  const bodyPromos = {
    filter: {status: ['=', true], owner: ['=', STRING.APP]},
    sort: {updatedAt: 'ASC'},
    population: [
      {
        path: 'image',
        fields: {
          url: true,
        },
      },
    ],
  };

  const loadNodes = async () => {
    setNodesLoading(true);
    setIsLoading(true);
    setErrorHome(noError);

    const body = {
      filter: {status: ['=', true]},
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
        .post<NodePaginated>('/nodes/getListUnAuth', body)
        .then(response => {
          setNodes(response.data.data);
          setIsLoading(false);
          setNodesLoading(false);
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

          setErrorHome({...errorHome, errorNode: true});
          setIsLoading(false);
          setNodesLoading(true);
        });
    } catch (error) {
      console.log('Catch error load Nodes: ' + error);
      setNodesLoading(false);
    }
  };

  const loadPromoUp = async () => {
    api
      .post<PromoResponse>('/promotions/getListUnAuth', bodyPromos)
      .then(resp => {
        setPromoUp(resp.data.data.map(promo => promo.image.url));
      })
      .catch((error: ErrorResp) => {
        console.log(error);
        setErrorHome({...errorHome, errorPromoUp: true});
      });
  };
  const loadPromoDown = async () => {
    api
      .post<PromoFinalResponse>('/promotionsFinal/getListUnAuth', bodyPromos)
      .then(resp => {
        setPromoDown(resp.data.data);
      })
      .catch((error: ErrorResp) => {
        console.log(error);
        setErrorHome({...errorHome, errorPromoDown: true});
      });
  };

  const loadMainCategories = async () => {
    setMainCategoriesLoading(true);
    try {
      api
        .get<MainCategoriesResponse>(
          `/queries/mainCategories/${
            user?.id ? user.id : '62db9b2afa1ed900169f181d'
          }`,
        )
        .then(resp => {
          setMainCategories(resp.data.data);
          setMainCategoriesLoading(false);
        })
        .catch((error: ErrorResp) => {
          console.log(error);
          setErrorHome({...errorHome, errorPromoDown: true});
          setMainCategoriesLoading(false);
        });
    } catch (error) {
      setMainCategoriesLoading(false);
    }
  };

  const loadHome = async () => {
    setIsLoading(true);
    setErrorHome(noError);

    api
      .post<any>('/queries/home-invited')
      .then(resp => {
        loadPromoDown();
        setOffers(resp.data[0]);
        setMostSaleLastMonth(
          resp.data[1].map((item: any) => item.mostSaleCategory),
        );
        setLastCategories(resp.data[2]);
      })
      .catch((error: ErrorResp) => {
        console.log(error);
        setErrorHome({...errorHome, errorHome: true});
      });
  };
  const loaoadByError = async () => {
    console.log('loaoadByError');
    loadNodes();
    loadPromoUp();
    loadPromoDown();
    loadHome();
  };

  /*  useEffect(() => {
    loadNodes();
    loadPromoUp();
    loadPromoDown();
    loadHome();
  }, []); */

  return {
    isLoading,
    nodes,
    promoUp,
    promoDown,
    offers,
    lastCategories,
    mostSaleLastMonth,
    nodesLoading,
    loaoadByError,
    errorHome,
    loadNodes,
    loadPromoUp,
    loadHome,
    mainCategories,
    loadMainCategories,
    mainCategoriesLoading,
  };
};
