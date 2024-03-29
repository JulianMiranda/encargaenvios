import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  title: string;
  body: string;
  openModal: boolean;
  isLoading: boolean;
  setOpenModal: (action: boolean) => void;
  onConfirmModal: () => void;
}

export const ModalComponentPromo = ({
  title,
  body,
  isLoading,
  openModal,
  setOpenModal,
  onConfirmModal,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const [isVisible, setIsVisible] = useState(false);
  const closeModal = () => {
    setIsVisible(false);
    setOpenModal(false);
  };
  useEffect(() => {
    if (openModal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [openModal]);
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      statusBarTranslucent={true}>
      {/* Background negro */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Contenido del modal */}
        <View
          style={{
            width: 300,
            padding: 15,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            elevation: 10,
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            {title}
          </Text>
          {body && (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '300',
                marginBottom: 20,
                marginTop: 10,
                color: '#000',
              }}>
              {body}
            </Text>
          )}
          {isLoading && (
            <View style={{flex: 1}}>
              <ActivityIndicator color={colors.card} />
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.card,
              marginTop: 20,
              padding: 4,
              width: '85%',
              borderRadius: 25,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={onConfirmModal}>
            <Text style={{color: '#ffffff', fontSize: 16}}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
