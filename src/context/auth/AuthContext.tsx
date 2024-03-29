import React, {createContext, useEffect, useReducer} from 'react';
import DeviceCountry from 'react-native-device-country';
import api from '../../api/api';
import {User} from '../../interfaces/User.interface';
import auth from '@react-native-firebase/auth';
import {authReducer, AuthState} from './authReducer';
import {CountryCode} from '../../utils/countryTypes';
import {getHeaders} from '../../api/getHeaders';
import {Prices, PricesResponse} from '../../interfaces/Prices.interface';

type AuthContextProps = {
  status:
    | 'checking'
    | 'authenticated'
    | 'not-authenticated'
    | 'not-internet'
    | 'login';
  wait: boolean;
  user: User | null;
  errorMessage: string;
  loadingLogin: boolean;
  signUp: (name: string, user: any) => void;
  signIn: (name: string, user: any) => void;
  login: () => void;
  updateUser: (user: User) => void;
  signUpCompra: (name: string, user: any, mail: string) => void;
  logOut: () => void;
  loginAuth: () => void;
  refreshApp: () => void;
  removeError: () => void;
  updateReciveNotifications: (user: User) => void;
  setCountryCode: (countryCode: CountryCode) => void;
  setCountryCallCode: (countryCallCode: string) => void;
  countryCode: CountryCode;
  countryCallCode: string;
  prices: Prices;
  minimumVersion: number;
};

const authInicialState: AuthState = {
  status: 'checking',
  user: null,
  wait: false,
  loadingLogin: false,
  errorMessage: '',
  countryCode: 'EC',
  countryCallCode: '+593',
  minimumVersion: 0,
  prices: {
    oneandhalfkgPrice: 0,
    twokgPrice: 0,
    threekgPrice: 0,
    fourkgPrice: 0,
    fivekgPrice: 0,
    sixkgPrice: 0,
    sevenkgPrice: 0,
    eightkgPrice: 0,
    ninekgPrice: 0,
    tenkgPrice: 0,
    elevenkgPrice: 0,
    twelvekgPrice: 0,
    thirteenkgPrice: 0,
    fourteenkgPrice: 0,
    fifteenkgPrice: 0,
    sixteenkgPrice: 0,
    seventeenkgPrice: 0,
    eighteenkgPrice: 0,
    nineteenkgPrice: 0,
    twentykgPrice: 0,
    twentyonekgPrice: 0,
    twentytwokgPrice: 0,
    twentythreekgPrice: 0,
    twentyfourkgPrice: 0,
    twentyfivekgPrice: 0,
    twentysixkgPrice: 0,
    twentysevenkgPrice: 0,
    twentyeightkgPrice: 0,
    twentyninekgPrice: 0,
    thirtykgPrice: 0,
    thirtyonekgPrice: 0,
    thirtytwokgPrice: 0,
    thirtythreekgPrice: 0,
    thirtyfourkgPrice: 0,
    thirtyfivekgPrice: 0,
    thirtysixkgPrice: 0,
    thirtysevenkgPrice: 0,
    thirtyeightkgPrice: 0,
    thirtyninekgPrice: 0,
    fortykgPrice: 0,
    fortyonekgPrice: 0,
    fortytwokgPrice: 0,
    fortythreekgPrice: 0,
    fortyfourkgPrice: 0,
    fortyfivekgPrice: 0,
    fortysixkgPrice: 0,
    fortysevenkgPrice: 0,
    fortyeightkgPrice: 0,
    fortyninekgPrice: 0,
    fiftykgPrice: 0,
    fiftyonekgPrice: 0,
    fiftytwokgPrice: 0,
    fiftythreekgPrice: 0,
    fiftyfourkgPrice: 0,
    fiftyfivekgPrice: 0,
    fiftysixkgPrice: 0,
    fiftysevenkgPrice: 0,
    fiftyeightkgPrice: 0,
    fiftyninekgPrice: 0,
    sixtykgPrice: 0,
    sixtyonekgPrice: 0,
    sixtytwokgPrice: 0,
    sixtythreekgPrice: 0,
    sixtyfourkgPrice: 0,
    sixtyfivekgPrice: 0,
    sixtysixkgPrice: 0,
    sixtysevenkgPrice: 0,
    sixtyeightkgPrice: 0,
    sixtyninekgPrice: 0,
    seventykgPrice: 0,
    seventyonekgPrice: 0,
    seventytwokgPrice: 0,
    seventythreekgPrice: 0,
    seventyfourkgPrice: 0,
    seventyfivekgPrice: 0,
    seventysixkgPrice: 0,
    seventysevenkgPrice: 0,
    seventyeightkgPrice: 0,
    seventyninekgPrice: 0,
    eightykgPrice: 0,
    eightyonekgPrice: 0,
    eightytwokgPrice: 0,
    eightythreekgPrice: 0,
    eightyfourkgPrice: 0,
    eightyfivekgPrice: 0,
    eightysixkgPrice: 0,
    eightysevenkgPrice: 0,
    eightyeightkgPrice: 0,
    eightyninekgPrice: 0,
    ninetykgPrice: 0,
    ninetyonekgPrice: 0,
    ninetytwokgPrice: 0,
    ninetythreekgPrice: 0,
    ninetyfourkgPrice: 0,
    ninetyfivekgPrice: 0,
    ninetysixkgPrice: 0,
    ninetysevenkgPrice: 0,
    ninetyeightkgPrice: 0,
    ninetyninekgPrice: 0,
    onehundredkgPrice: 0,
  },
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    DeviceCountry.getCountryCode()
      .then((result: any) => {
        if (result && result.code) {
          const country = result.code.toUpperCase();
          dispatch({type: 'setCountryCode', payload: country});
        }
        //
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    checkMinimumVersion();
  }, []);
  useEffect(() => {
    checkPrices();
  }, []);

  const checkPrices = async () => {
    try {
      const prices = await api.get<PricesResponse>('/prices/getPricesUnAuth');

      dispatch({type: 'setPrices', payload: prices.data.prices});
    } catch (error) {
      console.log('Error Prices', error);
    }
  };

  const checkMinimumVersion = async () => {
    try {
      const minVersion = await api.get<number>('/version/getVersion');
      dispatch({type: 'setMinimumVersion', payload: minVersion.data});
    } catch (error) {
      console.log('Error Prices', error);
    }
  };

  const checkToken = async () => {
    // Hay token
    try {
      const headers = await getHeaders();
      const token = headers.get('x-token');
      if (!token) {
        return dispatch({type: 'notAuthenticated'});
      }
      const resp = await api.get<User>('/login');

      if (resp.status !== 200) {
        return dispatch({type: 'notAuthenticated'});
      }
      dispatch({
        type: 'signIn',
        payload: {
          user: resp.data,
        },
      });
    } catch (error: any) {
      console.log('error login catch', error);
      if (error && error.message === 'Network Error') {
        dispatch({type: 'notInternet'});
      }
      dispatch({type: 'notAuthenticated'});
      // return dispatch({type: 'notAuthenticated'});
    }
  };

  const signIn = async () => {
    try {
      dispatch({type: 'startLoadingLogin'});
      dispatch({type: 'initCheck'});
      checkToken();
    } catch (error) {
      dispatch({type: 'stopLoadingLogin'});
      dispatch({
        type: 'addError',
        payload: 'Error Catch',
      });
    }
  };

  const updateUser = async (user: User) => {
    try {
      dispatch({
        type: 'updateUser',
        payload: {
          user,
        },
      });
    } catch (error) {}
  };

  const login = async () => {
    dispatch({type: 'startLoadingLogin'});

    try {
      api
        .get<any>('/login')
        .then(resp => {
          if (resp.status === 200) {
            dispatch({
              type: 'signIn',
              payload: {
                user: resp.data,
              },
            });
          }
          dispatch({type: 'stopLoadingLogin'});
        })
        .catch(error => {
          if (error.message === 'Network Error') {
            console.log('Entro en Network');

            dispatch({type: 'stopLoadingLogin'});
            dispatch({type: 'notInternet'});
          }
        });
    } catch (error: any) {
      if (error.message === 'Network Error') {
        console.log('Entro en Network');

        dispatch({type: 'notInternet'});
      }
      dispatch({type: 'stopLoadingLogin'});
      return dispatch({
        type: 'addError',
        payload: String(error),
      });
    }
  };
  const signUpCompra = async (name: string, user: any, mail: string) => {
    dispatch({type: 'initCheck'});
    try {
      console.log('Haciendo singupCompra');
      const resp = await api.get<any>('/login');

      if (resp.status === 200) {
        const updatedUser = await api.put<any>(
          `/users/update/${resp.data.id}`,
          {email: mail},
        );
        console.log('Updated user', updatedUser);
        dispatch({
          type: 'signUp',
          payload: {
            user: {...resp.data, email: mail},
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({type: 'stopLoadingLogin'});

      dispatch({
        type: 'addError',
        payload: 'Error al actualizar nombre',
      });
    }
  };

  const signUp = async (name: string, user: any) => {
    dispatch({type: 'initCheck'});
    try {
      api.put<any>('users/update/' + user.id, {name}).then(async () => {
        checkToken();
      });
    } catch (error) {
      dispatch({type: 'stopLoadingLogin'});
      dispatch({
        type: 'addError',
        payload: 'Error al actualizar nombre',
      });
    }
  };

  const logOut = async () => {
    dispatch({type: 'stopLoadingLogin'});
    auth()
      .signOut()
      .then(() => dispatch({type: 'logout'}));
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  const refreshApp = () => {
    checkToken();
  };

  const updateReciveNotifications = (user: User) => {
    dispatch({type: 'updateReciveNotifications', payload: user});
  };

  const setCountryCode = async (country_code: CountryCode) => {
    dispatch({type: 'setCountryCode', payload: country_code});
  };

  const setCountryCallCode = async (country_call_code: string) => {
    dispatch({type: 'setCountryCallCode', payload: country_call_code});
  };

  const loginAuth = async () => {
    dispatch({type: 'login'});
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        logOut,
        removeError,
        signIn,
        signUp,
        login,
        updateUser,
        refreshApp,
        updateReciveNotifications,
        setCountryCode,
        setCountryCallCode,
        signUpCompra,
        loginAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
