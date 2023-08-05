import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParams} from '../navigator/navigation';
import {
  CardField,
  useConfirmPayment,
  useStripe,
  PaymentIntent,
} from '@stripe/stripe-react-native';
import {useToast} from 'react-native-toast-notifications';
import api from '../api/api';
import {formatToCurrency} from '../utils/formatToCurrency';

interface Props extends StackScreenProps<RootStackParams, 'CardScreen'> {}
interface CardProps {
  brand: string;
  complete: boolean;
  expiryMonth: number;
  expiryYear: number;
  last4: string;
  validCVC: string;
  validExpiryDate: string;
  validNumber: string;
}
export const CardScreen = (props: Props) => {
  const {route} = props;
  const {sender, reciber, currency} = route.params;
  const toast = useToast();
  const {createPaymentMethod, handleNextAction} = useStripe();
  const {confirmPayment, loading} = useConfirmPayment();
  const [name, setNameCard] = useState('');
  const [number, setNumber] = useState('');
  const [exp_year, setYearCard] = useState('');
  const [exp_month, setMonthCard] = useState('');
  const [cvc, setCvvCard] = useState('');
  const [isloading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardProps>({
    brand: '',
    complete: false,
    expiryMonth: 0,
    expiryYear: 0,
    last4: '',
    validCVC: '',
    validExpiryDate: '',
    validNumber: '',
  });

  const handleButton = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const billingDetails: any = {
        email: 'email@stripe.com',
        phone: '+48888000888',
        addressCity: 'Houston',
        addressCountry: 'US',
        addressLine1: '1459  Circle Drive',
        addressLine2: 'Texas',
        addressPostalCode: '77063',
      };
      const {paymentMethod, error: errorCreateMethod} =
        await createPaymentMethod({
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails: {},
          },
        });
      if (errorCreateMethod) {
        setLoading(false);
        return Alert.alert('Error', errorCreateMethod.message);
      }
      const response = await api.post('/transfers/paymentMethod', {
        idPayment: paymentMethod.id,
        cubaCurrency: currency,
        totalPayment: parseInt(sender, 10),
        currency: 'usd',
        changeValue: 100,
      });
      const {
        error: errorPayment,
        requires_action,
        payment_intent_client_secret,
      } = await response.data;

      if (errorPayment) {
        setLoading(false);
        // Error creating or confirming PaymentIntent
        Alert.alert('errorPayment', errorPayment);
        return;
      }
      if (response.data.success) {
        // Payment succeeded
        setLoading(false);
        Alert.alert('Success', 'The payment was confirmed successfully!');
      }
      if (payment_intent_client_secret && !requires_action) {
        // Payment succeeded
        Alert.alert('Success', 'The payment was confirmed successfully!');
        setLoading(false);
      }

      if (payment_intent_client_secret && requires_action) {
        setLoading(false);
        const {error: errorHandle, paymentIntent} = await handleNextAction(
          payment_intent_client_secret,
        );

        if (errorHandle) {
          setLoading(false);
          Alert.alert(`Error code: ${errorHandle.code}`, errorHandle.message);
        } else if (paymentIntent) {
          setLoading(false);
          if (
            paymentIntent.status === PaymentIntent.Status.RequiresConfirmation
          ) {
            setLoading(false);
            // Confirm the PaymentIntent again on your server
            const responseReIntent = await api.post(
              '/transfers/paymentMethod',
              {
                idPaymentIntent: paymentIntent.id,
                totalPayment: parseInt(sender, 10),
                currency: 'usd',
                cubaCurrency: currency,
                changeValue: 100,
              },
            );
            const {error: errorReIntent, success} = await responseReIntent.data;
            if (errorReIntent) {
              setLoading(false);
              // Error during confirming Intent
              Alert.alert('Error', errorReIntent);
            } else if (success) {
              setLoading(false);
              Alert.alert('Success', 'The payment was confirmed successfully!');
            }
          } else {
            setLoading(false);
            // Payment succedeed
            Alert.alert('Success', 'The payment was confirmed successfully!');
          }
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={{flex: 1, marginTop: 100, padding: 20, width: '100%'}}>
        <Text style={{fontSize: 24, color: '#000'}}>Inserte su tarjeta</Text>
        <CardField
          autofocus
          /* postalCodeEnabled={false} */
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            textColor: '#000000',

            borderRadius: 8,
          }}
          style={{
            backgroundColor: '#f1f1f1',
            width: '100%',
            height: 50,
            marginVertical: 30,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onCardChange={cardDetailsChange => {
            console.log(cardDetailsChange);
            setCardDetails(cardDetailsChange);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={!loading ? handleButton : () => {}}
          style={styles.button}>
          {loading && (
            <ActivityIndicator
              color={'white'}
              size={22}
              style={{marginRight: 10}}
            />
          )}
          <Text style={{color: '#ffffff', fontSize: 22, fontWeight: '700'}}>
            Pagar ({formatToCurrency(parseInt(sender, 10))})
          </Text>
        </TouchableOpacity>
      </View>
      {isloading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <ActivityIndicator size={32} color={'black'} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    height: 50,
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  expiration: {
    flexDirection: 'column',
  },
  viewMonthYear: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  inputDate: {
    width: 100,
    marginRight: 10,
    backgroundColor: '#f1f1f1',
  },

  button: {
    flexDirection: 'row',
    backgroundColor: '#5096ff',
    borderRadius: 4,
    margin: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
