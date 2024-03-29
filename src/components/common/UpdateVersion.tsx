import React from 'react';
import {
  Button,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const UpdateVersion = () => {
  const handleUpdate = () => {
    // Cambia la URL con el enlace correcto a tu aplicación en la App Store o Play Store
    const storeURL =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/us/app/encarga-envios/id6444113641?l=es-MX'
        : 'market://details?id=com.encargaenvios&hl=es_EC&gl=US';
    Linking.openURL(storeURL);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Nueva versión disponible!</Text>
            <Text style={styles.modalText}>
              Por favor, actualiza la aplicación para continuar.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={handleUpdate}>
              <Text style={styles.textButton}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: -10,
  },
  textButton: {
    color: '#007AFF',
    fontSize: 16,
  },
});
