import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  title: string;
  formEmail: string;
  setFormEmail: (action: string) => void;
  body: string;
  openModal: boolean;
  isLoading: boolean;
  setOpenModal: (action: boolean) => void;
  onConfirmModal: () => void;
}

export const ModalChangeEmail = ({
  title,
  body,
  isLoading,
  openModal,
  formEmail,
  setOpenModal,
  onConfirmModal,
  setFormEmail,
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
            height: 200,
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
          <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
            {title}
          </Text>
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
          <View>
            <TextInput
              placeholder="joexample@gmail.com"
              /* onSubmitEditing={() => dos.current.focus()} */
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 14,
                paddingLeft: 5,
                height: 40,
                borderColor: '#c1c1c1',
                borderWidth: 1,
                borderRadius: 8,
                top: Platform.OS === 'ios' ? 0 : 2,
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={formEmail}
              onChangeText={value => setFormEmail(value)}
            />
          </View>
          {isLoading && (
            <View style={{flex: 1}}>
              <ActivityIndicator color={colors.card} />
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#eeebeb',
                marginTop: 20,
                padding: 6,
                borderRadius: 25,
                paddingHorizontal: 12,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={closeModal}>
              <Text style={{color: '#000', fontSize: 16}}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.card,
                marginTop: 20,
                padding: 4,
                marginLeft: 30,
                borderRadius: 25,
                paddingHorizontal: 10,
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
              <Text style={{color: '#ffffff', fontSize: 16}}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
