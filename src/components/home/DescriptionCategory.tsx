/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Description} from '../../interfaces/Subcategory.interface';
interface Props {
  description: Description[];
  ship: string;
}
export const DescriptionCategory = ({description, ship}: Props) => {
  if (!description || description.length === 0) {
    return null;
  }
  return (
    <>
      <View
        style={{
          padding: 5,
          marginHorizontal: 10,
          borderRadius: 2,
        }}>
        <Text style={{fontSize: 20, marginBottom: 10, color: '#000'}}>
          Descripción
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              backgroundColor: '#fafafa',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              borderEndColor: 'white',
              borderEndWidth: 3,
            }}>
            <Text
              style={{
                marginLeft: 5,
                color: '#000',
              }}>
              Envío
            </Text>
            <Icon
              name="chevron-right"
              size={16}
              color="white"
              style={{alignSelf: 'flex-end', marginRight: 3}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fafafa',
              flex: 1,
            }}>
            <Text
              style={{
                marginLeft: 5,
                color: '#000',
              }}>
              {ship === 'AEREO' ? 'Aéreo' : 'Marítimo'}
            </Text>
          </View>
        </View>
        {description.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#fafafa',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                borderEndColor: 'white',
                borderEndWidth: 3,
              }}>
              <Text
                style={{
                  marginLeft: 5,
                  color: '#000',
                }}>
                {item.title}
              </Text>
              <Icon
                name="chevron-right"
                size={16}
                color="white"
                style={{marginRight: 3}}
              />
            </View>
            <View
              style={{
                backgroundColor: index % 2 !== 0 ? '#fafafa' : '#f0f0f0',
                flex: 1,
              }}>
              <Text
                style={{
                  marginLeft: 5,
                  color: '#000',
                }}>
                {item.content}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
