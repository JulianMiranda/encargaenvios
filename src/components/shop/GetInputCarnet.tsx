import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCarnets} from '../../hooks/useCarnets';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {CarnetComponent} from './CarnetComponent';
import {Carnet} from '../../interfaces/CarnetResponse.interface';
import {AnimatedText} from '../common/AnimatedText';

interface Props {
  carnets: Carnet[];
  isLoading: boolean;
  setSelectedCarnet: (carnet: string[]) => void;
  selectedCarnet: string[];
}
export const GetInputCarnet = ({
  selectedCarnet,
  carnets,
  isLoading,
  setSelectedCarnet,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {cantCarnets} = useCarnets();

  useEffect(() => {
    if (carnets.length > 0 && selectedCarnet.length === 0) {
      setSelectedCarnet([carnets[0].id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carnets, selectedCarnet]);

  const handleCheck = (carnet: any) => {
    if (selectedCarnet.includes(carnet)) {
      setSelectedCarnet(selectedCarnet.filter(c => c !== carnet));
    } else {
      setSelectedCarnet([...selectedCarnet, carnet]);
    }
  };

  return (
    <>
      <View style={styles.title}>
        <View style={{}}>
          <AnimatedText
            text={`Necesitamos datos de ${cantCarnets()} ${
              cantCarnets() < 2 ? 'destinatario' : 'destinatarios'
            }`}
            time={75}
          />
        </View>
        {/*  <Text style={{fontSize: 18, color: '#000'}}>
         {}{' '}
          {cantCarnets() < 2 ? 'destinatario' : 'destinatarios'}
        </Text> */}

        <View style={styles.line} />
        {carnets.map((carnet, index) => (
          <View key={index} style={styles.carnetContainer}>
            <View style={styles.carnet}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 10}}
                onPress={() => handleCheck(carnet.id)}>
                <Icon
                  name={
                    selectedCarnet.includes(carnet.id)
                      ? 'check-circle-outline'
                      : 'check-circle-outline'
                  }
                  size={30}
                  color={
                    selectedCarnet.includes(carnet.id) ? colors.card : '#e0e0e0'
                  }
                  style={{
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{}}
                  onPress={() => handleCheck(carnet.id)}>
                  <CarnetComponent carnet={carnet} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
      {isLoading && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
          }}>
          <ActivityIndicator size={32} color={colors.card} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  line: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  carnetContainer: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  carnet: {
    width: '100%',
    padding: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
