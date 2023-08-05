import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  text: String;
  fecha: string;
  final: boolean;
}
export const TrackStep = ({text, final, fecha}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Icon
            style={{...styles.icon, top: final ? 26 : 26, left: final ? 3 : 3}}
            color={'white'}
            name={final ? 'ellipsis-horizontal-outline' : 'checkmark-outline'}
            size={final ? 20 : 20}
          />

          <View
            style={{
              ...styles.ball,
              backgroundColor: final ? '#b1b1b1' : '#4EB2E4',
            }}
          />
          {text === 'Pedido confirmado' ? (
            <View>
              <View style={styles.columnTransparent} />
              <View style={styles.column2} />
            </View>
          ) : (
            <>
              {final ? (
                <View>
                  <View style={styles.column2} />
                  <View style={styles.columnTransparent} />
                </View>
              ) : (
                <View style={styles.column} />
              )}
            </>
          )}
        </View>
        <View>
          <Text style={styles.text}>{text}</Text>
          {!final && <Text style={styles.text}>{fecha}</Text>}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  column: {
    marginLeft: 10,
    width: 5,
    height: '102%',
    backgroundColor: '#4EB2E4',
  },
  columnTransparent: {
    marginLeft: 10,
    width: 10,
    height: '52%',
    backgroundColor: 'white',
  },

  column2: {
    marginLeft: 10,
    width: 5,
    height: '50%',
    backgroundColor: '#4EB2E4',
  },
  text: {
    marginLeft: 15,
    color: '#000',
  },
  ball: {
    position: 'absolute',
    left: 0,
    top: 25,
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#fff',
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  icon: {
    position: 'absolute',

    zIndex: 1001,
  },
});
