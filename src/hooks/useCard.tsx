import {useState, useContext} from 'react';
import {AuthContext} from '../context/auth/AuthContext';
import apiCard from '../api/apiCard';
import {CardResponse, Card} from '../interfaces/Card.interface';
import apiCardClient from '../api/apiCardClient';
import apiCardEfect from '../api/apiCardEfect';
import {Alert} from 'react-native';

import axios from 'axios';
import moment from 'moment';
import base64 from 'react-native-base64';
import {sha256} from 'react-native-sha256';
import {User} from '../interfaces/User.interface';

export const useCard = () => {
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);

  const loadCards = async () => {
    /*  const body = {
      filter: {user: ['=', user?.id], status: ['=', true]},
    }; */

    try {
      const resp = await apiCard.get<CardResponse>('/card/list?uid=1');

      console.log('Leyeidas' + JSON.stringify(resp.data));
      setCards(resp.data.cards);
      setIsLoading(false);
    } catch (error) {
      console.log('Error api card' + error);
      setIsLoading(false);
    }
  };
  const AddNewCard = async (card: any) => {
    /*  const body = {
      filter: {user: ['=', user?.id], status: ['=', true]},
    }; */

    const NUVEISTGECSERVER = 'Kn9v6ICvoRXQozQG2rK92WtjG6l08a';
    const codeServer = 'NUVEISTG-EC-SERVER';
    const unix_timestamp = moment().unix();
    const uniq_token_string = `${NUVEISTGECSERVER}${unix_timestamp}`;
    const uniq_token_hash = await sha256(uniq_token_string);

    const auth_token = base64.encode(
      codeServer + ';' + unix_timestamp + ';' + uniq_token_hash,
    );
    try {
      fetch('https://ccapi-stg.paymentez.com/v2/card/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': auth_token,
        },
        body: JSON.stringify({
          user: {
            id: '4',
            email: 'test@example.com',
          },
          card: {
            number: '5119159076977991',
            holder_name: 'citlali calderon',
            expiry_month: 9,
            expiry_year: 2024,
            cvc: '123',
            type: 'vi',
          },
        }),
      }).then(response => console.log('Añadida ', response));
      /* apiCardEfect
        .post<any>('/transaction/init_reference/', )
        .then(response => {
          console.log('Añadida ', response.data);
        })
        .catch(error => {
          console.log('Error Mio', JSON.stringify(error.message));
        }); */
      /* const resp = await apiCardClient.post<any>('/add', {
        user: {
          id: '4',
          email: 'test@example.com',
        },
        card: {
          number: '5119159076977991',
          holder_name: 'citlali calderon',
          expiry_month: 9,
          expiry_year: 2020,
          cvc: '123',
          type: 'vi',
        },
      }); */

      setIsLoading(false);
    } catch (error) {
      console.log('Error api add new card' + error);
      setIsLoading(false);
    }
  };
  interface RefProps {
    user: User;
    card: Card;
    total: number;
    navigation: any;
  }

  const EfectRef = async ({user, card, total, navigation}: RefProps) => {
    try {
      console.log('total', total);
      console.log('LinkToPayUSer', user);
      const taxAm = parseFloat((total / 1.12).toFixed(2));
      const taxVat = parseFloat((taxAm * 0.12).toFixed(2));
      const response = await apiCardEfect.post<any>('/linktopay/init_order/', {
        user: {
          id: user.id,
          email: user.email,
          name: user.name.split(' ')[0],
          last_name: user.name
            .split(' ')
            .filter((value, index) => index !== 0)
            .join(' '),
        },
        order: {
          dev_reference: 'baria',
          description: 'Producto con envío, icluye envío',
          amount: total,
          taxable_amount: taxAm,
          tax_percentage: 12,
          vat: taxVat,
          installments_type: 0,
          currency: 'USD',
        },
        configuration: {
          partial_payment: true,
          expiration_days: 1,
          allowed_payment_methods: ['Card'],
          success_url: 'https://success-shop-baria.web.app/',
          failure_url: 'https://failure-shop-baria.web.app/',
          pending_url: 'https://failure-shop-baria.web.app/',
          review_url: 'https://failure-shop-baria.web.app/',
        },
      });
      console.log('Resp Card' + JSON.stringify(response.data));
      setIsLoading(false);
      return response.data.data.payment.payment_url;
    } catch (error) {
      console.log('Error api LinkToPay' + JSON.stringify(error));
      setIsLoading(false);
      return '';
    }
  };

  /* 
  Siiii inicia referencia
  const EfectRef = async (card: any) => {
    console.log('card ', card);
    try {
      apiCardEfect
        .post<any>('/transaction/init_reference/', {
          locale: 'es',
          order: {
            amount: 100.0,
            description: 'Jhon Doe',
            vat: 0,
            dev_reference: 'Jhon Doe Buying',
            installments_type: 0,
          },
          user: {
            id: '117',
            email: 'jhon@doe.com',
          },
        })
        .then(response => {
          console.log('Añadida ', response.data);
        })
        .catch(error => {
          console.log('Error Mio', JSON.stringify(error.message));
        });

      setIsLoading(false);
    } catch (error) {
      console.log('Error api add new card' + error);
      setIsLoading(false);
    }
  }; */

  const InitReference = async () => {
    /* const body = {
      filter: {user: ['=', user?.id], status: ['=', true]},
    }; */
    try {
      const resp = await apiCard.post<any>('/transaction/init_reference/', {
        locale: 'es',
        order: {
          amount: 100.0,
          description: 'Jhon Doe',
          vat: 0,
          dev_reference: 'Jhon Doe Buying',
          installments_type: 0,
        },
        user: {
          id: '117',
          email: 'jhon@doe.com',
        },
      });
      console.log('Añadida ', resp);
      setIsLoading(false);
    } catch (error) {
      console.log('Error api add new card' + error);
      setIsLoading(false);
    }
  };
  const DeleteCard = async (deleteCard: any) => {
    /* const body = {
      filter: {user: ['=', user?.id], status: ['=', true]},
    }; */
    try {
      console.log('deleteCard ', deleteCard);
      const resp = await apiCard.post<any>('/delete/', deleteCard);
      console.log('Deleted ', resp);
      setIsLoading(false);
    } catch (error) {
      console.log('Error api deleted card' + error);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    cards,
    loadCards,
    AddNewCard,
    InitReference,
    DeleteCard,
    EfectRef,
  };
};
