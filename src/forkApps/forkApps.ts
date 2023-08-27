import {name} from '../../package.json';

export const STRING = {
  app: name === 'bariaenvios' ? 'baria' : 'encarga',
  APP: name === 'bariaenvios' ? 'BARIA' : 'ENCARGA',
  backendUrl:
    name === 'bariaenvios'
      ? 'https://www.bariaenviosapi.com/api'
      : 'https://www.bariaenviosapi.com/api',
  codeServer: name === 'bariaenvios' ? 'BARIA-EC-SERVER' : 'BARIA-EC-SERVER',
  nuveiSTGServer:
    name === 'bariaenvios'
      ? '1ebDpAnXvxI8vxkiKSqnSSBOjlTw5Z'
      : '1ebDpAnXvxI8vxkiKSqnSSBOjlTw5Z',
  phone: name === 'bariaenvios' ? '+593995687985' : '+593962914922',
  politics:
    name === 'bariaenvios'
      ? 'https://baria-politics.web.app'
      : 'https://encarga-politics.web.app',
  terms:
    name === 'bariaenvios'
      ? 'https://baria-terms.web.app'
      : 'https://encarga-terms.web.app',
  owner: name === 'bariaenvios' ? 'baria' : 'Julian',
  dev_reference: name === 'bariaenvios' ? 'baria' : 'baria',
  payen_description:
    name === 'bariaenvios'
      ? 'Producto con envío'
      : 'Producto con envío incluído',
  success_url:
    name === 'bariaenvios'
      ? 'https://success-shop-baria.web.app/'
      : 'https://success-shop-baria.web',
  failure_url:
    name === 'bariaenvios'
      ? 'https://failure-shop-baria.web.app/'
      : 'https://failure-shop-baria.web.app/',
  pending_url:
    name === 'bariaenvios'
      ? 'https://failure-shop-baria.web.app/'
      : 'https://failure-shop-baria.web.app/',
  review_url:
    name === 'bariaenvios'
      ? 'https://failure-shop-baria.web.app/'
      : 'https://failure-shop-baria.web.app/',
};
