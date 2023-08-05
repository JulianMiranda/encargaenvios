import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ModalizeWebView} from 'react-native-modalize-webview';
import WebView from 'react-native-webview';

interface Props {
  terms: boolean;
  setTerms: (terms: boolean) => void;
}
const {width} = Dimensions.get('window');
export const TermsButton = ({terms, setTerms}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: width * 0.15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            padding: 5,
            justifyContent: 'center',
          }}
          onPress={() => setTerms(!terms)}>
          <Icon
            name={terms ? 'check-circle-outline' : 'circle-outline'}
            size={22}
            color={terms ? colors.card : '#e0e0e0'}
            style={{
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            padding: 5,
            justifyContent: 'center',
          }}
          onPress={() => {
            setShowModal(true);
          }}>
          <Text style={{color: '#0645AD'}}>
            Acepto los Términos y Condiciones
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 5,
                top: 5,
                zIndex: 99999999,
              }}
              onPress={() => {
                setShowModal(false);
              }}>
              <Icon name="close-circle-outline" style={{}} size={26} />
            </TouchableOpacity>
            <WebView
              style={{flex: 1}}
              source={{uri: 'https://encarga-terms.web.app/'}}
              renderLoading={() => <ActivityIndicator />}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
  },
});
