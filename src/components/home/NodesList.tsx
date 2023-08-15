import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Node} from '../../interfaces/Node.interface';
import {FadeInImage} from '../common/FadeInImage';
import {useNavigation} from '@react-navigation/native';

interface Props {
  nodes: Node[];
}
export const NodesList = ({nodes}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <>
      <ScrollView horizontal style={{paddingLeft: 15}}>
        {nodes.map((node, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              console.log(node);
              navigation.navigate('CategoryListScreen', {node: node});
            }}
            key={index}
            style={{
              alignItems: 'center',
              marginRight: 30,
              /* 
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6, */
            }}>
            <View>
              <FadeInImage
                uri={node.image.url}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <Text
              style={{
                fontWeight: '300',
                fontSize: 12,
              }}>
              {node.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};
