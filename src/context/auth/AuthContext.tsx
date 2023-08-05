import React, {createContext, useEffect, useReducer} from 'react';
import DeviceCountry from 'react-native-device-country';
import api from '../../api/api';
import {User} from '../../interfaces/User.interface';
import auth from '@react-native-firebase/auth';
import {authReducer, AuthState} from './authReducer';
import {CountryCode} from '../../utils/countryTypes';
import {getHeaders} from '../../api/getHeaders';

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
};

const authInicialState: AuthState = {
  status: 'checking',
  user: null,
  wait: false,
  loadingLogin: false,
  errorMessage: '',
  countryCode: 'EC',
  countryCallCode: '+593',
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

  const checkToken = async () => {
    // Hay token
    try {
      console.log('Auth');

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
