import axios from 'axios';
import moment from 'moment';
import base64 from 'react-native-base64';
import {sha256} from 'react-native-sha256';

const baseURL = 'https://ccapi-stg.paymentez.com/v2';
const NUVEISTGECCLIENT = 'rvpKAv2tc49x6YL38fvtv5jJxRRiPs';
const codeClient = 'NUVEISTG-EC-CLIENT';
const NUVEISTGECSERVER = 'Kn9v6ICvoRXQozQG2rK92WtjG6l08a';
const codeServer = 'NUVEISTG-EC-SERVER';

const apiCardClient = axios.create({baseURL});

apiCardClient.interceptors.request.use(async config => {
  const unix_timestamp = moment().unix();
  const uniq_token_string = `${NUVEISTGECCLIENT}${unix_timestamp}`;
  const uniq_token_hash = await sha256(uniq_token_string);

  console.log('uniq_token_hash' + uniq_token_hash);

  const auth_token = base64.encode(
    codeClient + ';' + unix_timestamp + ';' + uniq_token_hash,
  );

  console.log('token' + auth_token);

  config.headers = {
    'access-control-allow-origin': '*',
    'content-type': 'application/json',
    'Auth-Token': auth_token,
  };

  return config;
});

export default apiCardClient;
