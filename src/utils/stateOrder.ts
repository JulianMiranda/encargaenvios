import moment from 'moment';
import {DateOrder, State} from '../components/account/SingleTrack';

export const stateOrder = (
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
  } else if (now.diff(creado, 'days') >= 3 && now.diff(creado, 'days') < 5) {
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
  } else if (now.diff(creado, 'days') >= 5 && now.diff(creado, 'days') < 6) {
    setState({
      ...state,
      CONFIRMED: true,
      AGENCY: true,
      ADUECU: true,
      AIMS: true,
    });
    setDates({
      ...dates,
      CONFIRMED: getTime(0, createdAt),
      AGENCY: getTime(2, createdAt),
      ADUECU: getTime(3, createdAt),
      AIMS: getTime(5, createdAt),
    });
    setFinal('AIMS');

    return;
  } else if (now.diff(creado, 'days') >= 6 && now.diff(creado, 'days') < 7) {
    setState({
      ...state,
      CONFIRMED: true,
      AGENCY: true,
      ADUECU: true,
      AIMS: true,
      COPAAIR: true,
    });
    setDates({
      ...dates,
      CONFIRMED: getTime(0, createdAt),
      AGENCY: getTime(2, createdAt),
      ADUECU: getTime(3, createdAt),
      AIMS: getTime(5, createdAt),
      COPAAIR: getTime(6, createdAt),
    });
    setFinal('COPAAIR');

    return;
  } else if (now.diff(creado, 'days') >= 7) {
    setState({
      ...state,
      CONFIRMED: true,
      AGENCY: true,
      ADUECU: true,
      AIMS: true,
      COPAAIR: true,
      ADUANACUB: true,
    });
    setDates({
      ...state,
      CONFIRMED: getTime(0, createdAt),
      AGENCY: getTime(2, createdAt),
      ADUECU: getTime(3, createdAt),
      AIMS: getTime(5, createdAt),
      COPAAIR: getTime(6, createdAt),
      ADUANACUB: getTime(7, createdAt),
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
