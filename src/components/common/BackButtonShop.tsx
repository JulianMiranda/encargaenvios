import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/* interface Props extends StackScreenProps<any, any> {} */

interface Props {
  pressBack: any;
}
/* interface Props extends NavigationProp<ParamListBase, string> {} */
export const BackButtonShop = ({pressBack}: Props) => {
  const {top} = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={pressBack}
      activeOpacity={0.8}
      style={{
        ...styles.backButton,
        top: top + 10,
        marginLeft: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Icon name="arrow-back-outline" color={'black'} size={26} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 999999999,
    left: 10,
  },
});
