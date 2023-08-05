/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ShopContext} from '../../context/shop/ShopContext';
import {formatToCurrency} from '../../utils/formatToCurrency';
interface Props {}
export const FacturaShop = ({}: Props) => {
  const {car} = useContext(ShopContext);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let disc = 0;
    let tot = 0;
    car.map(carItem => {
      if (!carItem.category.status || carItem.category.soldOut) {
        return;
      }
      if (
        carItem.category.priceDiscount &&
        carItem.category.priceDiscount !== 0
      ) {
        tot += carItem.category.priceDiscount * carItem.cantidad;
        disc +=
          (carItem.category.price - carItem.category.priceDiscount) *
          carItem.cantidad;
      } else {
        tot += carItem.category.price * carItem.cantidad;
      }
    });
    setDiscount(disc);
    setTotal(tot);
  }, [car]);

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
                    <Text style={{color: '#000', marginLeft: 3}}>
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
          {discount !== 0 && (
            <View style={{flex: 4, flexDirection: 'row'}}>
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
                  {formatToCurrency(discount)}
                </Text>
              </View>
            </View>
          )}

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
                {formatToCurrency(total)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
