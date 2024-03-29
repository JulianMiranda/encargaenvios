import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Node} from '../../interfaces/Node.interface';
import {FadeInImage} from '../common/FadeInImage';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/HomeStack';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  nodes: Node[];
}
const {width} = Dimensions.get('screen');
interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'CategoryListScreen'> {}
export const NodesList = ({nodes}: Props) => {
  const navigation = useNavigation<PropsNavigation>();
  const handleNode = (node: Node) => {
    console.log(node);
    if (node.personalCombo) {
      navigation.navigate('CategoryListComboScreen', {node: node});
    } else {
      navigation.navigate('CategoryListScreen', {node: node});
    }
  };
  return (
    <>
      <View style={styles.container}>
        {[0, 1, 2].map(row => (
          <View key={row} style={styles.row}>
            {nodes.slice(row * 3, (row + 1) * 3).map((node, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleNode(node)}
                key={index}
                style={styles.iconContainer}>
                <View
                  style={{
                    width: '70%',
                    backgroundColor: '#F7F7F7',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 8,

                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}>
                  <FadeInImage uri={node.image.url} style={styles.image} />
                  <Text
                    numberOfLines={1}
                    style={{...styles.text, fontSize: width < 400 ? 10 : 12}}>
                    {node.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    fontWeight: '300',
  },
});
