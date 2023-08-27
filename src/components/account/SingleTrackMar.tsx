import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TrackStep} from './TrackStep';
import {Code, Trackcode} from '../../interfaces/Order.interface';
import {stateOrderMar} from '../../utils/stateOrderMar';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {STRING} from '../../forkApps/forkApps';

interface Props {
  trackcode: Trackcode;
  createdAt: Date;
  codes: Code[];
  openModalize: () => void;
}

export interface State {
  CONFIRMED: boolean;
  AGENCY: boolean;
  ADUECU: boolean;
  SHIPPING: boolean;
  ADUANACUB: boolean;
}

export interface DateOrder {
  CONFIRMED: string;
  AGENCY: string;
  ADUECU: string;
  SHIPPING: string;
  ADUANACUB: string;
}

export const SingleTrackMar = ({
  trackcode,
  codes,
  createdAt,
  openModalize,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [state, setState] = useState<State>({
    CONFIRMED: false,
    AGENCY: false,
    ADUECU: false,
    SHIPPING: false,
    ADUANACUB: false,
  });

  const [dates, setDates] = useState<DateOrder>({
    CONFIRMED: '',
    AGENCY: '',
    ADUECU: '',
    SHIPPING: '',
    ADUANACUB: '',
  });
  const [final, setFinal] = useState('');
  useEffect(() => {
    stateOrderMar(state, setState, createdAt, dates, setDates, setFinal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={{marginHorizontal: 10, marginTop: 20}}>
        <Text style={styles.title}>Estado del envío</Text>
        {state.CONFIRMED && (
          <>
            <View style={styles.line} />
            <TrackStep
              text={'Pedido confirmado'}
              final={false}
              fecha={dates.CONFIRMED}
            />
          </>
        )}
        {state.CONFIRMED && (
          <>
            {/* Agencia */}
            <View style={styles.line} />
            <TrackStep
              text={
                !state.AGENCY
                  ? `${STRING.app} está preparando tu envío`
                  : `Despachado por Agencia de Envíos ${STRING.app}`
              }
              final={final === 'CONFIRMED'}
              fecha={dates.AGENCY}
            />
          </>
        )}
        {state.AGENCY && (
          <>
            {/* Aduana Ecu OK*/}
            <View style={styles.line} />
            <TrackStep
              text={
                !state.ADUECU
                  ? 'Trasladando a Aduana del Ecuador'
                  : 'Trasladado Aduana del Ecuador'
              }
              final={final === 'AGENCY'}
              fecha={dates.ADUECU}
            />
          </>
        )}
        {state.ADUECU && (
          <>
            {/* Salida del Puerto*/}
            <View style={styles.line} />
            <TrackStep
              text={
                !state.SHIPPING
                  ? 'Completando contenedor'
                  : 'Salida del puerto. Rumbo a Puerto de la Habana'
              }
              final={final === 'ADUECU'}
              fecha={dates.SHIPPING}
            />
          </>
        )}

        {state.SHIPPING && (
          <>
            <View style={styles.line} />
            <TrackStep
              text={
                !state.ADUANACUB
                  ? 'Camino a la Habana'
                  : 'Recepcionado por Aduana de Cuba'
              }
              final={final === 'SHIPPING'}
              fecha={dates.ADUANACUB}
            />
          </>
        )}
      </View>
      {state.ADUANACUB && (
        <>
          <View style={styles.final}>
            <View style={styles.finalView}>
              <Text style={{color: '#000'}}>
                Podrá continuar el seguimiento de su envío Correos de Cuba una
                vez Aduna despache su paquete
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openModalize}
            style={{
              ...styles.button,
              backgroundColor: colors.card,
            }}>
            <Text style={{color: '#fff'}}>Rastrear paquete</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '95%',
    alignSelf: 'flex-end',
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  final: {
    width: '100%',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#E9ECF5',
    borderRadius: 8,
  },
  finalView: {flexWrap: 'wrap', flexDirection: 'row'},
  button: {
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 30,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
