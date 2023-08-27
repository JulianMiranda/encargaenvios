import axios from 'axios';
import {getHeaders} from './getHeaders';
import {STRING} from '../forkApps/forkApps';

//const baseURL = 'http://192.168.0.5:5001/api';
const baseURL = STRING.backendUrl;

const api = axios.create({baseURL});

api.interceptors.request.use(async config => {
  /*  const headers = await getHeaders();
  const token = headers.get('x-token'); */

  const headers = await getHeaders();
  const token = headers.get('x-token');

  if (token) {
    config.headers = {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
      'x-token': token,
    };
  }

  return config;
});

export default api;
