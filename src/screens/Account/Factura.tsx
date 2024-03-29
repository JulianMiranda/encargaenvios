/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {CarItemProps} from '../../interfaces/Shop.Interface';
import {Code, Trackcode} from '../../interfaces/Order.interface';
import {useToast} from 'react-native-toast-notifications';
interface Props {
  carItem: CarItemProps;
  codes: Code[];
  selectedCarnet: any[];
  trackcode: Trackcode;
  number: number;
}
const {height} = Dimensions.get('window');
export const Factura = ({carItem, selectedCarnet, codes, number}: Props) => {
  const toast = useToast();
  const [copiedText, setCopiedText] = useState(false);

  const copyToClipboard = (code: string) => {
    Clipboard.setString(code);
    /*  Clipboard.setString(code); */
    setCopiedText(true);
    toast.show('Copiado', {
      type: 'normal',
      placement: 'top',
      duration: 1500,
      style: {
        borderRadius: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        marginTop: height / 2,
      },
      textStyle: {fontSize: 16},
      animationType: 'slide-in',
    });
  };
  console.log(selectedCarnet[0]);

  return (
    <>
      <View style={{}}>
        <View style={styles.container}>
          <View
            style={{
              flex: 8,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.header}>
                <Text style={{color: '#fff', marginLeft: 3}}>Producto</Text>
              </View>
              <View style={styles.header2}>
                <Text numberOfLines={1} style={{color: '#fff'}}>
                  Cantidad
                </Text>
              </View>
              <View style={styles.header3}>
                <Text style={{color: '#fff'}}>Precio</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.item}>
                <Text style={styles.text}>{carItem.category.name}</Text>
              </View>
              <View style={styles.item2}>
                <Text style={{color: '#000'}}>1</Text>
              </View>
              <View style={styles.item3}>
                <Text style={{color: '#000'}}>
                  {formatToCurrency(
                    carItem.category.priceDiscount &&
                      carItem.category.priceDiscount !== 0
                      ? carItem.category.priceDiscount
                      : carItem.category.price,
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 5,
          }}>
          <View style={styles.row}>
            <View style={styles.titleLight}>
              <Text style={styles.text}>Costo de envío</Text>
            </View>
            <View style={styles.contentLight}>
              <Text style={styles.text}>Incluido</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titleDark}>
              <Text style={styles.text}>Envío</Text>
            </View>
            <View style={styles.contentDark}>
              <Text style={styles.text}>
                {carItem.category.ship === 'AEREO' ? 'Aéreo' : 'Marítimo'}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titleLight}>
              <Text style={styles.text}>Destinatario</Text>
            </View>
            <View style={styles.contentLight}>
              <Text style={styles.text}>
                {selectedCarnet[0].name} {selectedCarnet[0].firstLastName}{' '}
                {selectedCarnet[0].secondLastName}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titleDark}>
              <Text style={styles.text}>Entrega en</Text>
            </View>
            <View style={styles.contentDark}>
              <Text style={styles.text}>
                Calle {selectedCarnet[0].address} #{selectedCarnet[0].number}.{' '}
                {selectedCarnet[0].municipio}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titleLight}>
              <Text style={styles.text}>Código de seguimiento</Text>
            </View>
            <View style={styles.contentLight}>
              {codes.length > 0 && codes[number].code ? (
                <View style={styles.code}>
                  <Text selectable style={styles.textCode}>
                    {codes[number].code}
                  </Text>
                  <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => copyToClipboard(codes[number].code)}
                    activeOpacity={0.8}>
                    {/*  <Text style={{marginLeft: 10, fontSize: 22}}>Copiar</Text> */}
                    <Icon
                      style={{marginLeft: 10, fontSize: 22}}
                      color={copiedText ? 'green' : 'gray'}
                      name={
                        copiedText
                          ? 'clipboard-check-multiple-outline'
                          : 'clipboard-multiple-outline'
                      }
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.textUnCode}>Disponible de 1 a 7 días</Text>
              )}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titleDark}>
              <Text style={styles.text}>Método de pago</Text>
            </View>
            <View style={styles.contentDark}>
              <Text style={styles.text}>Pago por tarjeta</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.titleLight}>
              <Text style={styles.total}>Total</Text>
            </View>
            <View style={styles.contentLight}>
              <Text style={styles.totalContent}>
                {formatToCurrency(
                  carItem.category.priceDiscount &&
                    carItem.category.priceDiscount !== 0
                    ? carItem.category.priceDiscount
                    : carItem.category.price,
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', flexDirection: 'row'},
  header: {
    flex: 6,
    backgroundColor: '#06A4F8',
    justifyContent: 'center',
    borderRightColor: '#FFFFFF',
    borderRightWidth: 2,
    paddingVertical: 3,
  },
  header2: {
    flex: 2,
    backgroundColor: '#06A4F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#FFFFFF',
    borderRightWidth: 2,
  },
  header3: {
    flex: 3,
    backgroundColor: '#06A4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 6,
    backgroundColor: '#CFD5EA',
    justifyContent: 'center',
    borderRightColor: '#FFFFFF',
    borderRightWidth: 2,
    paddingVertical: 3,
  },
  item2: {
    flex: 2,
    backgroundColor: '#CFD5EA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#FFFFFF',
    borderRightWidth: 2,
    paddingVertical: 3,
  },
  item3: {
    flex: 3,
    backgroundColor: '#CFD5EA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  text: {color: '#000', marginLeft: 3},
  row: {flex: 4, flexDirection: 'row'},
  titleLight: {
    flex: 4,
    paddingVertical: 3,
    backgroundColor: '#E9ECF5',
    justifyContent: 'center',
  },
  contentLight: {
    flex: 6,
    backgroundColor: '#E9ECF5',
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    justifyContent: 'center',
  },
  titleDark: {
    flex: 4,
    backgroundColor: '#CFD5EA',
    paddingVertical: 3,
    justifyContent: 'center',
  },
  contentDark: {
    flex: 6,
    backgroundColor: '#CFD5EA',
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    justifyContent: 'center',
  },
  code: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCode: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 3,
  },
  textUnCode: {
    color: '#a1a1a1',
    fontWeight: '500',
    marginLeft: 3,
  },
  total: {color: '#000', marginLeft: 3, fontWeight: '700'},
  totalContent: {
    color: '#000',
    marginLeft: 3,
    fontWeight: '700',
  },
});
