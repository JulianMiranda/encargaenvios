import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {FadeInImage} from '../common/FadeInImage';
import {formatToCurrency} from '../../utils/formatToCurrency';
import {ShopContext} from '../../context/shop/ShopContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {calcularCombo} from '../../utils/calculateCost';
import {AuthContext} from '../../context/auth/AuthContext';

interface Props {
  openModal: (dest?: 'top' | 'default' | undefined) => void;
}
export const ComboShop = ({openModal}: Props) => {
  const {combo, costoTotal, pesoTotal, dropCombo} = useContext(ShopContext);
  const {prices} = useContext(AuthContext);

  const [unaviableCombo, setUnaviableCombo] = useState(false);
  useEffect(() => {
    combo.map(item => {
      if (!item.subcategory.status) {
        setUnaviableCombo(true);
      }
    });
  }, [combo]);

  return (
    <>
      <View style={styles.container}>
        {unaviableCombo && (
          <View style={styles.noStatus}>
            <Text style={styles.textnoStatus}>
              Este producto ya no está disponible
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => dropCombo()}>
          <Icon
            name="close-circle-outline"
            size={26}
            color="red"
            style={{position: 'absolute', top: 5, right: 5}}
          />
        </TouchableOpacity>

        <View>
          {/* <FadeInImage
            uri={
              'data:image/jpeg;base64,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'
            }
            style={styles.image}
          /> */}
          <Image
            source={require('../../assets/Micesta.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.subContainer2}>
          <View style={{flex: 5, overflow: 'hidden'}}>
            <Text numberOfLines={1} style={styles.name}>
              Mi Cesta
            </Text>

            <Text style={styles.text18}>
              {formatToCurrency(calcularCombo({costoTotal, pesoTotal, prices}))}
            </Text>
            <View style={{overflow: 'scroll'}}>
              {combo.map((comboItem, index) => (
                <Text
                  key={index}
                  numberOfLines={1}
                  style={{paddingRight: 5, fontSize: 10, fontWeight: '300'}}>
                  {comboItem.subcategory.name}
                </Text>
              ))}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => openModal()}
            style={{
              flex: 1,
              alignSelf: 'flex-end',
            }}>
            <Text numberOfLines={1} style={{paddingRight: 5, color: '#26C9F2'}}>
              Ver más ...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    width: '90%',
    height: 100,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 8,
    marginLeft: 2,
    flex: 2,
    alignSelf: 'flex-start',
  },
  subContainer2: {flex: 6, paddingLeft: 5, overflow: 'hidden'},
  name: {fontSize: 18, marginRight: 50, color: '#000'},
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999999999,
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginEnd: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 1000,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text16Line: {
    fontSize: 16,
    color: '#c0c0c0',
    textDecorationLine: 'line-through',
  },
  text18: {
    fontSize: 18,
    color: '#000',
  },
  noStatus: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    justifyContent: 'center',
  },
  textnoStatus: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'red',
  },
});
