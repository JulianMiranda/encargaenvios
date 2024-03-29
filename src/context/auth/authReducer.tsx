import {Prices} from '../../interfaces/Prices.interface';
import {User} from '../../interfaces/User.interface';
import {CountryCode} from '../../utils/countryTypes';

export interface AuthState {
  status:
    | 'checking'
    | 'authenticated'
    | 'not-authenticated'
    | 'not-internet'
    | 'login';
  user: User | null;
  errorMessage: string;
  loadingLogin: boolean;
  wait: boolean;
  countryCode: CountryCode;
  countryCallCode: string;
  prices: Prices;
  minimumVersion: number;
}

type AuthAction =
  | {type: 'notAuthenticated'}
  | {type: 'notInternet'}
  | {type: 'setCountryCode'; payload: CountryCode}
  | {type: 'setCountryCallCode'; payload: string}
  | {type: 'setMinimumVersion'; payload: number}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'startLoadingLogin'}
  | {type: 'stopLoadingLogin'}
  | {type: 'signUp'; payload: {user: User}}
  | {type: 'updateUser'; payload: {user: User}}
  | {type: 'signIn'; payload: {user: User}}
  | {type: 'logout'}
  | {type: 'login'}
  | {type: 'setPrices'; payload: Prices}
  | {type: 'updateReciveNotifications'; payload: User}
  | {type: 'initCheck'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'notInternet':
      return {
        ...state,
        wait: false,
        status: 'not-internet',
      };
    case 'login':
      return {
        ...state,
        wait: false,
        status: 'login',
      };
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
      };
    case 'setPrices':
      return {
        ...state,
        prices: action.payload,
      };
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
    case 'initCheck':
      return {
        ...state,
        wait: false,
      };

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        user: action.payload.user,
        wait: false,
      };
    case 'signIn':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        user: action.payload.user,
        wait: false,
      };
    case 'updateUser':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'updateReciveNotifications':
      return {
        ...state,
        user: action.payload,
      };
    case 'startLoadingLogin':
      return {
        ...state,
        loadingLogin: true,
      };
    case 'stopLoadingLogin':
      return {
        ...state,
        loadingLogin: false,
      };
    case 'setCountryCode':
      return {
        ...state,
        countryCode: action.payload,
      };
    case 'setCountryCallCode':
      return {
        ...state,
        countryCallCode: action.payload,
      };
    case 'setMinimumVersion':
      return {
        ...state,
        minimumVersion: action.payload,
      };
    default:
      return state;
  }
};
