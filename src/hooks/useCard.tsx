import {useState, useContext} from 'react';
import {AuthContext} from '../context/auth/AuthContext';
import {Card} from '../interfaces/Card.interface';
import apiCardEfect from '../api/apiCardEfect';

import moment from 'moment';
import base64 from 'react-native-base64';
import {sha256} from 'react-native-sha256';
import {User} from '../interfaces/User.interface';
import {STRING} from '../forkApps/forkApps';

export const useCard = () => {
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);

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
          dev_reference: STRING.dev_reference,
          description: STRING.payen_description,
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
          success_url: STRING.success_url,
          failure_url: STRING.failure_url,
          pending_url: STRING.pending_url,
          review_url: STRING.review_url,
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

  return {
    isLoading,
    cards,
    AddNewCard,
    EfectRef,
  };
};
