import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ShopContext} from '../../context/shop/ShopContext';
import {useToast} from 'react-native-toast-notifications';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/ShopStack';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'ShopScreen'> {}

const {width} = Dimensions.get('window');
export const DropCombo = ({node}: {node: string}) => {
  const {combo, comboPrev, dropCombo, dropComboPrev, setItemCombo} =
    useContext(ShopContext);
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<PropsNavigation>();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeModalAccept = () => {
    dropCombo();
    dropComboPrev();
    setModalVisible(false);
  };
  const shopNow = () => {
    if (comboPrev.length === 0) {
      return;
    }
    comboPrev.map(item =>
      setItemCombo({
        subcategory: item.subcategory,
        cantidad: item.cantidad,
        node: node,
      }),
    );
    dropComboPrev();
    navigation.navigate('Shop', {screen: 'ShopScreen'});
  };
  const addCar = () => {
    if (comboPrev.length === 0) {
      return;
    }
    comboPrev.map(item =>
      setItemCombo({
        subcategory: item.subcategory,
        cantidad: item.cantidad,
        node: node,
      }),
    );
    dropComboPrev();
    toast.show('Añadido al carrito, sigue comprando', {
      duration: 3000,
      placement: 'top',
      type: 'normal',
      animationType: 'zoom-in',
      style: {
        width: '100%',
        justifyContent: 'center',
        marginTop: top + 30,
        backgroundColor: 'rgba(0,0,0,0.84)',
      },
      textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
  };

  const fadeValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (combo.length > 0 || comboPrev.length > 0) {
      console.log('fade in');

      fadeIn();
    } else {
      console.log('fade out');
      fadeOut();
    }
  }, [combo, comboPrev]);

  return (
    <>
      {combo.length > 0 || comboPrev.length > 0 ? (
        <Animated.View style={[{opacity: fadeValue}]}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.trashAll}
              activeOpacity={0.8}
              onPress={() => openModal()}>
              <Text style={styles.dropText}>Vaciar</Text>
            </TouchableOpacity>
            <View style={styles.addContainer}>
              <TouchableOpacity
                style={styles.shopNow}
                activeOpacity={0.8}
                onPress={() => shopNow()}>
                <Text style={styles.text}>Comprar ahora</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.addCar,
                  shadowColor: comboPrev.length > 0 ? '#000' : '#fff',
                  justifyContent: 'center',
                }}
                activeOpacity={comboPrev.length > 0 ? 0.8 : 1}
                onPress={() => (comboPrev.length > 0 ? addCar() : {})}>
                <Text style={styles.text}>Añadir al carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.separator} />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>¿Estás seguro de vaciar tu cesta?</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModalAccept}>
              <Text style={styles.closeButton}>Vaciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 10,
  },
  trashAll: {
    marginLeft: 10,
    backgroundColor: 'rgba(242, 28, 28, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  shopNow: {
    marginLeft: 20,
    backgroundColor: '#4EB2E4',
    paddingHorizontal: 10,
    paddingVertical: 3,
    shadowColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addCar: {
    marginLeft: 10,
    backgroundColor: '#2684FD',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {height: 38},
  text: {color: '#fff', fontSize: width < 300 ? 10 : 12},
  dropText: {color: 'red'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    color: 'red',
  },
  cancelButton: {
    marginTop: 10,
  },
});
