import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Carnet} from '../../interfaces/CarnetResponse.interface';
import {Fab} from '../common/Fab';
import {ModalAddCarnet} from './ModalAddCarnet';
import {ModalEditCarnet} from './ModalEditCarnet';

interface Props {
  loadCarnets: () => Promise<void>;
  setAddLabel?: (addLabel: boolean) => void;
}
export const CarnetButton = ({loadCarnets, setAddLabel}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [carnetEdit, setCarnetEdit] = useState<Partial<Carnet>>({});

  const addCarnet = () => {
    setTitle('Datos');
    setBody('');
    if (setAddLabel) {
      setAddLabel(false);
    }
    setOpenModal(true);
  };

  const confirmModal = () => {
    setOpenModal(false);
    setOpenModalEdit(false);
    setCarnetEdit({});
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={addCarnet}
        style={styles.buttonTouch}>
        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: 'white',
            }}>
            Añadir
          </Text>
        </View>
        <Fab iconName={'add-outline'} onPress={addCarnet} style={{}} />
      </TouchableOpacity>

      <ModalAddCarnet
        title={title}
        body={body}
        setBody={setBody}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
        loadCarnets={loadCarnets}
      />

      <ModalEditCarnet
        carnetEdit={carnetEdit}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        loadCarnets={loadCarnets}
      />
    </>
  );
};
const styles = StyleSheet.create({
  buttonTouch: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fb2331',
    marginRight: -10,
    height: 30,
    paddingRight: 20,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
