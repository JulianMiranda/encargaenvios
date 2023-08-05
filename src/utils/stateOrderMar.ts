import moment from 'moment';
import {DateOrder, State} from '../components/account/SingleTrackMar';

export const stateOrderMar = (
  state: State,
  setState: (state: State) => void,
  createdAt: Date,
  dates: DateOrder,
  setDates: (date: DateOrder) => void,
  setFinal: (final: string) => void,
) => {
  const now = moment();
  const creado = moment(createdAt);
  if (now.diff(creado, 'days') < 2) {
    setState({
      ...state,
      CONFIRMED: true,
    });
    setDates({
      ...dates,
      CONFIRMED: moment(createdAt).add(0, 'd').calendar(),
    });
    setFinal('CONFIRMED');
    return;
  } else if (now.diff(creado, 'days') >= 2 && now.diff(creado, 'days') < 3) {
    setState({
      ...state,
      CONFIRMED: true,
      AGENCY: true,
    });
    setDates({
      ...dates,
      CONFIRMED: getTime(0, createdAt),
      AGENCY: getTime(2, createdAt),
    });
    setFinal('AGENCY');
    return;
  } else if (now.diff(creado, 'days') >= 3 && now.diff(creado, 'days') < 10) {
    setState({
      ...state,
      CONFIRMED: true,
      AGENCY: true,
      ADUECU: true,
    });
    setDates({
      ...dates,
      CONFIRMED: getTime(0, createdAt),
      AGENCY: getTime(2, createdAt),
      ADUECU: getTime(3, createdAt),
    });
    setFinal('ADUECU');

    return;
  } else if (now.diff(creado, 'days') >= 10 && now.diff(creado, 'days') < 30) {
    setState({
      ...state,
      CONFIRMED: true,
      AGENCY: true,
      ADUECU: true,
      SHIPPING: true,
    });
    setDates({
      ...dates,
      CONFIRMED: getTime(0, createdAt),
      AGENCY: getTime(2, createdAt),
      ADUECU: getTime(3, createdAt),
      SHIPPING: getTime(10, createdAt),
    });
    setFinal('SHIPPING');

    return;
  } else if (now.diff(creado, 'days') >= 30) {
    setState({
      ...state,
      CONFIRMED: true,
      AGENCY: true,
      ADUECU: true,
      SHIPPING: true,
      ADUANACUB: true,
    });
    setDates({
      ...state,
      CONFIRMED: getTime(0, createdAt),
      AGENCY: getTime(2, createdAt),
      ADUECU: getTime(3, createdAt),
      SHIPPING: getTime(10, createdAt),
      ADUANACUB: getTime(30, createdAt),
    });
    return;
  } else {
    return moment(createdAt).add(15, 'd').calendar();
  }
};

const getTime = (day: number, createdAt: Date): string => {
  if (day !== 0 && moment(createdAt).hour() > 16) {
    return moment(createdAt)
      .add(day, 'd')
      .subtract(day * 55, 'minutes')
      .calendar();
  } else if (day !== 0 && moment(createdAt).hour() < 7) {
    return moment(createdAt)
      .add(day, 'd')
      .add(day * 55, 'minutes')
      .calendar();
  } else {
    return moment(createdAt)
      .add(day, 'd')
      .add(day * 13, 'minutes')
      .calendar();
  }
};
/* moment(createdAt).add(0, 'd').calendar() */
