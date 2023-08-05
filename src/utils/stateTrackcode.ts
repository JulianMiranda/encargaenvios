import {STATETRACKCODE} from '../interfaces/Statetrackode.enum';

interface STATE {
  CONFIRMED: boolean;
  AGENCY: boolean;
  AIMS: boolean;
  ADUECU: boolean;
  COPAAIR: boolean;
  ADUANACUB: boolean;
}

export const stateTrackCode = (
  trackcode: STATETRACKCODE,
  state: STATE,
  setState: any,
) => {
  switch (trackcode) {
    case 'CONFIRMED':
      setState({
        ...state,
        CONFIRMED: true,
      });
      break;
    case 'AGENCY':
      setState({
        ...state,
        CONFIRMED: true,
        AGENCY: true,
      });
      break;
    case 'AIMS':
      setState({
        ...state,
        CONFIRMED: true,
        AGENCY: true,
        AIMS: true,
      });
      break;

    case 'AGENCY':
      setState({
        ...state,
        CONFIRMED: true,
        AGENCY: true,
      });
      break;

    case 'ADUECU':
      setState({
        ...state,
        CONFIRMED: true,
        AGENCY: true,
        ADUECU: true,
      });
      break;
    case 'COPAAIR':
      setState({
        ...state,
        CONFIRMED: true,
        AGENCY: true,
        ADUECU: true,
        COPAAIR: true,
      });
      break;
    case 'ADUANACUB':
      setState({
        ...state,
        CONFIRMED: true,
        AGENCY: true,
        ADUECU: true,
        COPAAIR: true,
        ADUANACUB: true,
      });
      break;
    default:
      break;
  }
};
