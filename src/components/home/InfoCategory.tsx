import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  info: string[];
}
export const InfoCategory = ({info}: Props) => {
  return (
    <>
      {info && info.length > 0 && (
        <View style={{margin: 15}}>
          <Text style={{fontSize: 24, color: '#000'}}>Sobre este Artículo</Text>
          {info.map((infoText, index) => (
            <Text key={index} style={{fontSize: 24, color: '#000'}}>
              {'\u2022'}{' '}
              <Text style={{fontSize: 14, color: '#000'}}>{infoText}</Text>
            </Text>
          ))}
        </View>
      )}
    </>
  );
};
