import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {BackButton} from '../../components/common/BackButton';
import {TopGradient} from '../../components/common/TopGradient';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCard} from '../../hooks/useCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TopScrollGradient} from '../../components/common/TopScrollGradient';
import {AuthContext} from '../../context/auth/AuthContext';
import api from '../../api/api';
import {Payment, PaymentResponse} from '../../interfaces/Payment.interface';

const {height} = Dimensions.get('window');
export const MyCards = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {user} = useContext(AuthContext);
  const [pagos, setPagos] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  /*  const pagos = [
    {
      card: '4111',
      authorization_code: 'FO-45872',
      authorization_id: '48798',
      order_id: '1024',
      fecha: 'Julio 26, 2023 9:57 AM',
      cost: '45.00',
    },
    {
      card: '2508',
      authorization_code: 'FO-45872',
      authorization_id: '487999',
      order_id: '1028',
      fecha: 'Julio 30, 2023 9:57 AM',
      cost: '100.50',
    },
  ]; */
  useEffect(() => {
    console.log('User', user?.id);
    const body = {
      filter: {'user.id': ['=', user?.id]},
    };
    try {
      setIsLoading(true);
      api.post<PaymentResponse>('/payments/getList', body).then(response => {
        setPagos(
          response.data.data.filter(
            p => p.transaction.current_status !== 'PENDING',
          ),
        );
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
      <TopScrollGradient title="Mis pagos">
        <View style={{padding: 10, marginTop: 90}}>
          {pagos.map((pago, index) => (
            <View key={index} style={{padding: 5}}>
              <Text
                style={{
                  ...styles.totalTitle,
                  color:
                    pago.transaction.current_status === 'APPROVED'
                      ? 'green'
                      : 'red',
                }}>
                Estado {pago.transaction.current_status}
              </Text>
              <Text style={{...styles.fecha}}>
                Fecha: {pago.transaction.date}
              </Text>
              <Text style={{...styles.fecha}}>
                Tarjeta: **** {pago.card.number}
              </Text>
              <View>
                <View>
                  <Text style={{...styles.auth}}>
                    Código de autorizacion:{' '}
                    {pago.transaction.authorization_code}
                  </Text>
                </View>
                <View>
                  <Text style={{...styles.auth}}>
                    Id de autorizacion: {pago.transaction.id}
                  </Text>
                </View>
              </View>
              <View style={styles.divider} />
            </View>
          ))}
        </View>
        {isLoading && (
          <ActivityIndicator
            size={32}
            color={colors.card}
            style={{marginTop: 70}}
          />
        )}
        <View
          style={{
            height: height * 0.2,
          }}
        />
      </TopScrollGradient>
    </>
  );
};
const styles = StyleSheet.create({
  totalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  fecha: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 3,
  },
  auth: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    marginBottom: 3,
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    marginTop: height * 0.07,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
});
