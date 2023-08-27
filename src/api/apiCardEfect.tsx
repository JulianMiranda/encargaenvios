import axios from 'axios';
import moment from 'moment';
import base64 from 'react-native-base64';
import {sha256} from 'react-native-sha256';
import {STRING} from '../forkApps/forkApps';

const baseURL = 'https://noccapi-prod.paymentez.com';

/* const NUVEISTGECCLIENT = 'rvpKAv2tc49x6YL38fvtv5jJxRRiPs';
const codeClient = 'NUVEISTG-EC-CLIENT'; */

const NUVEISTGECSERVER = STRING.nuveiSTGServer;
const codeServer = STRING.codeServer;
const apiCardEfect = axios.create({baseURL});

apiCardEfect.interceptors.request.use(async config => {
  /*  const headers = await getHeaders();
  const token = headers.get('x-token'); */

  const segundos = Math.floor(Date.now() / 1000);

  const unix_timestamp = moment().unix();

  console.log('Segundos + ', segundos); // 1611879190
  console.log('unix_timestamp + ', unix_timestamp); // 1611879190

  console.log('unix_timestamp' + unix_timestamp);
  const uniq_token_string = `${NUVEISTGECSERVER}${unix_timestamp}`;
  const uniq_token_hash = await sha256(uniq_token_string);

  console.log('uniq_token_hash' + uniq_token_hash);

  const auth_token = base64.encode(
    codeServer + ';' + unix_timestamp + ';' + uniq_token_hash,
  );

  console.log('token' + auth_token);

  config.headers = {
    'access-control-allow-origin': '*',
    'content-type': 'application/json',
    'Auth-Token': auth_token,
  };

  return config;
});

export default apiCardEfect;
