/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {ShopContext} from '../../context/shop/ShopContext';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {calcularCombo} from '../../utils/calculateCost';
import {AuthContext} from '../../context/auth/AuthContext';
import {useCalculateDiscountPromo} from '../../hooks/useCalculateDiscuountPromo';
interface Props {}
export const FacturaShop = ({}: Props) => {
  const {car, combo, discountTotal, pesoTotal, costoTotal, discountPromo} =
    useContext(ShopContext);
  const {prices} = useContext(AuthContext);
  const {
    articulosInPromo,
    discountComboPromo,
    totalDescuentos,
    totalFinal,
    discountTotalPromo,
  } = useCalculateDiscountPromo();

  console.log(discountTotalPromo);
  console.log(discountComboPromo);
  console.log(discountPromo.minDiscount);

  return (
    <>
      <View style={{marginTop: 10}}>
        <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
          <View
            style={{
              flex: 8,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 6,
                  backgroundColor: '#06A4F8',
                  justifyContent: 'center',
                  borderRightColor: '#FFFFFF',
                  borderRightWidth: 2,

                  paddingVertical: 3,
                }}>
                <Text style={{color: '#fff', marginLeft: 3}}>Producto</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  backgroundColor: '#06A4F8',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightColor: '#FFFFFF',
                  borderRightWidth: 2,
                }}>
                <Text numberOfLines={1} style={{color: '#fff'}}>
                  Cantidad
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  backgroundColor: '#06A4F8',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>Precio</Text>
              </View>
            </View>
            {combo.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 6,
                    backgroundColor: '#E9ECF5',
                    justifyContent: 'center',
                    borderRightColor: '#FFFFFF',
                    borderRightWidth: 2,
                    paddingVertical: 3,
                  }}>
                  <Text
                    style={{
                      color: discountComboPromo !== 0 ? '#8B4513' : '#000',
                      marginLeft: 3,
                    }}>
                    Mi Cesta
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: '#E9ECF5',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightColor: '#FFFFFF',
                    borderRightWidth: 2,

                    paddingVertical: 3,
                  }}>
                  <Text style={{color: '#000'}}>1</Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    backgroundColor: '#E9ECF5',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 3,
                  }}>
                  <Text style={{color: '#000'}}>
                    {calcularCombo({costoTotal, pesoTotal, prices}) !== 0
                      ? formatToCurrency(
                          calcularCombo({costoTotal, pesoTotal, prices}),
                        )
                      : 'Error'}
                  </Text>
                </View>
              </View>
            )}
            {car
              .filter(carI => !carI.category.soldOut && carI.category.status)
              .map((carItem, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 6,
                      backgroundColor: index % 2 === 0 ? '#CFD5EA' : '#E9ECF5',
                      justifyContent: 'center',
                      borderRightColor: '#FFFFFF',
                      borderRightWidth: 2,
                      paddingVertical: 3,
                    }}>
                    <Text
                      style={{
                        color: articulosInPromo.includes(carItem)
                          ? '#8B4513'
                          : '#000',
                        marginLeft: 3,
                      }}>
                      {carItem.category.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      backgroundColor: index % 2 === 0 ? '#CFD5EA' : '#E9ECF5',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRightColor: '#FFFFFF',
                      borderRightWidth: 2,

                      paddingVertical: 3,
                    }}>
                    <Text style={{color: '#000'}}>{carItem.cantidad}</Text>
                  </View>
                  <View
                    style={{
                      flex: 3,
                      backgroundColor: index % 2 === 0 ? '#CFD5EA' : '#E9ECF5',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 3,
                    }}>
                    <Text style={{color: '#000'}}>
                      {formatToCurrency(
                        carItem.category.priceDiscount !== 0
                          ? carItem.category.priceDiscount * carItem.cantidad
                          : carItem.category.price * carItem.cantidad,
                      )}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 5,
          }}>
          {discountTotal !== 0 && (
            <View style={{flex: 4, flexDirection: 'row', marginBottom: 5}}>
              <View
                style={{
                  flex: 8,
                  backgroundColor: '#CFD5EA',
                  paddingVertical: 3,
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#000', marginLeft: 3}}>Descuento</Text>
              </View>
              <View
                style={{
                  flex: 3,
                  backgroundColor: '#CFD5EA',
                  borderLeftColor: '#fff',
                  borderLeftWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'red', marginLeft: 3}}>
                  {formatToCurrency(discountTotal)}
                </Text>
              </View>
            </View>
          )}

          {totalDescuentos !== 0 && (
            <View style={{flex: 4, flexDirection: 'row', marginBottom: 5}}>
              <View
                style={{
                  flex: 8,
                  backgroundColor: '#CFD5EA',
                  paddingVertical: 3,
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#000', marginLeft: 3}}>
                  Promoción {discountPromo.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  backgroundColor: '#CFD5EA',
                  borderLeftColor: '#fff',
                  borderLeftWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#8B4513', marginLeft: 3}}>
                  {formatToCurrency(totalDescuentos)}
                </Text>
              </View>
            </View>
          )}
          {(discountComboPromo !== 0 || discountComboPromo !== 0) &&
            totalFinal < discountPromo.minDiscount && (
              <View style={{flex: 4, flexDirection: 'row', marginBottom: 5}}>
                <View
                  style={{
                    flex: 8,
                    backgroundColor: '#CFD5EA',
                    paddingVertical: 3,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: '#000', marginLeft: 3}}>
                    {discountPromo.name}
                  </Text>
                  <Text style={{color: '#8B4513', marginLeft: 7}}>
                    - Pedido mínimo{' '}
                    {formatToCurrency(discountPromo.minDiscount)}
                  </Text>
                </View>
              </View>
            )}

          <View style={{flex: 4, flexDirection: 'row', marginBottom: 5}}>
            <View
              style={{
                flex: 8,
                backgroundColor: '#E9ECF5',
                paddingVertical: 3,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000', marginLeft: 3}}>
                Servicios de envío
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                backgroundColor: '#E9ECF5',
                borderLeftColor: '#fff',
                borderLeftWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  marginLeft: 3,
                }}>
                Incluido
              </Text>
            </View>
          </View>
          <View style={{flex: 4, flexDirection: 'row'}}>
            <View
              style={{
                flex: 8,
                backgroundColor: '#E9ECF5',
                paddingVertical: 3,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000', marginLeft: 3, fontWeight: '700'}}>
                Total
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                backgroundColor: '#E9ECF5',
                borderLeftColor: '#fff',
                borderLeftWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  marginLeft: 3,
                  fontWeight: '700',
                }}>
                {formatToCurrency(totalFinal)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
