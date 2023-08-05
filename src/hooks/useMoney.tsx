import {useState} from 'react';
import {formatToCurrency} from '../utils/formatToCurrency';

type Currency = 'CUP' | 'MLC';

export interface BodyProps {
  sender: string;
  reciber: string;
  currency: string;
}
export interface ReciberCard {
  numberCard: string;
  name: string;
  bank: 'BANDEC' | 'BANMET' | 'BPA';
}

export const useMoney = () => {
  const prices = {
    mn: 100,
    mlc: 125,
  };
  const [sender, setSender] = useState('');
  const [reciber, setReciber] = useState('');
  const [currency, setCurrency] = useState<Currency>('CUP');

  const [bodyPost, setBodyPost] = useState<BodyProps>({
    sender: '',
    reciber: '',
    currency: '',
  });

  const [reciberCard, setReciberCard] = useState<ReciberCard>({
    numberCard: '',
    name: '',
    bank: 'BPA',
  });

  const setSenderFunction = (newsender: string) => {
    const newsenderstr = newsender.replace(',', '');
    if (
      sender.includes('.') &&
      newsenderstr.charAt(newsenderstr.length - 1) === '.' &&
      newsenderstr.length > sender.length
    )
      return;
    if (
      sender.includes('.') &&
      newsenderstr.charAt(newsenderstr.length - 4) === '.'
    )
      return;
    if (newsenderstr.startsWith('0')) return;
    if (newsenderstr.startsWith('.')) return;

    setSender(newsenderstr);
    if (newsenderstr !== '') {
      if (currency === 'CUP') {
        const conv = formatToCurrency(Number(newsenderstr) * prices.mn);
        setReciber(conv.slice(1));
      } else {
        const conv = formatToCurrency(
          (Number(newsenderstr) * 100) / prices.mlc,
        );
        setReciber(conv.slice(1));
      }
    } else {
      setReciber('');
    }
  };

  const setReciberFunction = (newreciber: string) => {
    const newstr = newreciber.replace(',', '');
    if (
      reciber.includes('.') &&
      newreciber.charAt(newreciber.length - 1) === '.' &&
      newreciber.length > reciber.length
    )
      return;
    if (
      reciber.includes('.') &&
      newreciber.charAt(newreciber.length - 4) === '.'
    )
      return;
    if (newreciber.startsWith('0')) return;
    if (newreciber.startsWith('.')) return;
    setReciber(newstr);
    if (newreciber !== '') {
      if (currency === 'CUP') {
        const conv = formatToCurrency(Number(newstr) / prices.mn);
        setSender(conv.slice(1));
      } else {
        const conv = formatToCurrency((Number(newstr) / 100) * prices.mlc);
        setSender(conv.slice(1));
      }
    } else {
      setSender('');
    }
  };

  const setCUPFunc = () => {
    setCurrency('CUP');
    const newsenderstr = sender.replace(',', '');
    const conv = formatToCurrency(Number(newsenderstr) * prices.mn);
    setReciber(conv.slice(1));
  };

  const setBodyPostFunc = (body: BodyProps) => {
    setBodyPost(body);
  };

  const setReciberCardFunc = (numberCard: string) => {
    /*  if (reciberCard.numberCard.trim().length > 18) {
      return;
    } */
    var str = '';
    // La longitud del número de entrada es mayor que la longitud en el cuadro de entrada, hay un espacio para cada 4
    if (numberCard.length > reciberCard.numberCard.length) {
      var reg = new RegExp(/\s+/g);
      /* var reg = '/  s / g'; */
      /* 9 */
      // Agregar regular para filtrar espacios en la cadena
      numberCard
        .replace(reg, '')
        .split('')
        .map(function (item, index) {
          (index + 1) % 4 == 0 ? (str = str + item + ' ') : (str += item);
        });
      setReciberCard({...reciberCard, numberCard: str});

      return str;
    } else {
      // Juzgando así, el borrado será normal, de lo contrario quedará atascado en el espacio
      setReciberCard({...reciberCard, numberCard});
    }

    /* setReciberCard({...reciberCard, numberCard}); */
  };

  const setReciberNameFunc = (name: string) => {
    setReciberCard({...reciberCard, name});
  };

  const setMLCFunc = () => {
    setCurrency('MLC');
    const newsenderstr = sender.replace(',', '');
    const conv = formatToCurrency((Number(newsenderstr) * 100) / prices.mlc);
    setReciber(conv.slice(1));
  };

  return {
    setSenderFunction,
    setReciberFunction,
    setCUPFunc,
    setMLCFunc,
    setBodyPostFunc,
    setReciberCardFunc,
    setReciberNameFunc,
    sender,
    reciber,
    currency,
    bodyPost,
    reciberCard,
  };
};
