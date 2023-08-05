import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {Carnet} from '../../interfaces/CarnetResponse.interface';
import {ScrollView} from 'react-native';
import api from '../../api/api';
import {AuthContext} from '../../context/auth/AuthContext';
import {provincias} from '../../utils/provincias';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  title: string;
  body: string;
  openModal: boolean;
  setOpenModal: (action: boolean) => void;
  onConfirmModal: () => void;
  loadCarnets: () => void;
  setBody: (action: string) => void;
}

const {height, width} = Dimensions.get('window');

export const ModalAddCarnet = ({
  title,
  openModal,
  setOpenModal,
  loadCarnets,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {user} = useContext(AuthContext);

  const [datos, setDatos] = useState<Partial<Carnet>>({
    name: '',
    firstLastName: '',
    secondLastName: '',
    carnet: '',
    phoneNumber: '',
    address: '',
    municipio: '',
    number: '',
    provincia: '',
    deparment: '',
    firstAccross: '',
    secondAccross: '',
    floor: '',
    reparto: '',
  });

  const uno = useRef<any>();
  const dos = useRef<any>();
  const tres = useRef<any>();
  const cuatro = useRef<any>();
  const cinco = useRef<any>();
  const seis = useRef<any>();
  const siete = useRef<any>();
  const ocho = useRef<any>();
  const nueve = useRef<any>();
  const once = useRef<any>();
  const doce = useRef<any>();
  const trece = useRef<any>();
  const catorce = useRef<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    name: '',
    firstLastName: '',
    secondLastName: '',
    carnet: '',
    phoneNumber: '',
    address: '',
    municipio: '',
    number: '',
    provincia: '',
    deparment: '',
    firstAccross: '',
    secondAccross: '',
    floor: '',
    reparto: '',
  });
  const [aviableMunicipios, setAviableMunicipios] = useState<any>([]);
  const onSave = async () => {
    const carnetRegex = new RegExp(/^([0-9])*$/);

    if (datos.name?.trim() === '') {
      setError({...error, name: 'El nombre es obligatorio'});
    } else if (datos.firstLastName?.trim() === '') {
      setError({...error, firstLastName: 'El apellido es obligatorio'});
    } else if (datos.secondLastName?.trim() === '') {
      setError({...error, secondLastName: 'El apellido es obligatorio'});
    } else if (datos.carnet?.trim() === '') {
      setError({...error, carnet: 'El carnet es obligatorio'});
    } else if (
      typeof datos.carnet === 'string' &&
      !carnetRegex.test(datos.carnet)
    ) {
      setError({...error, carnet: 'El carnet debe ser un número válido'});
    } else if (datos.carnet?.trim().length !== 11) {
      setError({...error, carnet: 'El carnet debe tener 11 dígitos'});
    } else if (datos.address?.trim() === '') {
      setError({...error, address: 'La dirección es obligatoria'});
    } else if (datos.number?.trim() === '') {
      setError({...error, number: 'El número de la casa es obligatorio'});
    } else if (datos.provincia?.trim() === '') {
      setError({...error, provincia: 'La provincia es obligatoria'});
    } else if (datos.municipio?.trim() === '') {
      setError({...error, municipio: 'El municipio es obligatorio'});
    } else if (datos.phoneNumber?.trim() === '') {
      setError({...error, phoneNumber: 'El teléfono es obligatorio'});
    } else if (
      datos.phoneNumber!.trim().length < 8 ||
      !carnetRegex.test(datos.phoneNumber!.trim().slice(1))
    ) {
      setError({...error, phoneNumber: 'Ingrese un teléfono válido'});
    } else {
      try {
        setIsLoading(true);

        const exist = await api.post('/carnets/getList', {
          filter: {
            status: ['=', true],
            user: ['=', user?.id],
            carnet: ['=', datos.carnet],
          },
        });
        if (exist.data.data.length > 0) {
          console.log('Ya tienes este carnet guardado');

          setIsLoading(false);
          setError({...error, carnet: 'Ya tienes un carnet con este número'});
        } else {
          await api.post('/carnets/create', {
            name: datos.name,
            firstLastName: datos.firstLastName,
            secondLastName: datos.secondLastName,
            carnet: datos.carnet,
            phoneNumber: datos.phoneNumber,
            address: datos.address,
            municipio: datos.municipio,
            number: datos.number,
            provincia: datos.provincia,
            deparment: datos.deparment,
            firstAccross: datos.firstAccross,
            secondAccross: datos.secondAccross,
            floor: datos.floor,
            reparto: datos.reparto,
            user: user?.id,
          });
          setDatos({
            name: '',
            firstLastName: '',
            secondLastName: '',
            carnet: '',
            phoneNumber: '',
            address: '',
            municipio: '',
            number: '',
            provincia: '',
            deparment: '',
            firstAccross: '',
            secondAccross: '',
            floor: '',
            reparto: '',
          });

          setIsLoading(false);
          setOpenModal(false);
          loadCarnets();
        }
      } catch (error) {
        setIsLoading(false);
        setOpenModal(false);
      }
    }
  };

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

  const onChange = (e: any, name: string) => {
    setDatos({...datos, [name]: e});
    setError({...error, [name]: ''});
  };
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          style={styles.shadowContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cancelButton}
            onPress={closeModal}>
            <IconMaterial
              name="close-circle-outline"
              color="red"
              size={32}
              style={{}}
            />
          </TouchableOpacity>
          <ScrollView>
            {/* <View style={{flex: 1}}> */}
            <View style={{marginTop: 3}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={{fontSize: 14, color: '#000'}}>Nombre(s)*</Text>
              <TextInput
                placeholder="Juan Carlos"
                ref={uno}
                onSubmitEditing={() => dos.current.focus()}
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
                autoFocus
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.name}
                onChangeText={value => onChange(value, 'name')}
              />
              {error.name !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>{error.name}</Text>
              )}
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>
                  Primer Apellido*
                </Text>
                <TextInput
                  placeholder="Torres"
                  ref={dos}
                  onSubmitEditing={() => dos.current.focus()}
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
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.firstLastName}
                  onChangeText={value => onChange(value, 'firstLastName')}
                />
                {error.firstLastName !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.firstLastName}
                  </Text>
                )}
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>
                  Segundo Apellido*
                </Text>
                <TextInput
                  ref={tres}
                  onSubmitEditing={() => tres.current.focus()}
                  placeholder="Acosta"
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
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.secondLastName}
                  onChangeText={value => onChange(value, 'secondLastName')}
                />
                {error.secondLastName !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.secondLastName}
                  </Text>
                )}
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14, color: '#000'}}>
                Número de Carnet*
              </Text>
              <TextInput
                ref={cuatro}
                onSubmitEditing={() => cuatro.current.focus()}
                placeholder="93150714909"
                keyboardType="numeric"
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
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.carnet}
                onChangeText={value => onChange(value, 'carnet')}
              />
              {error.carnet !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>{error.carnet}</Text>
              )}
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14, color: '#000'}}>
                Calle Principal*
              </Text>
              <TextInput
                ref={cinco}
                onSubmitEditing={() => seis.current.focus()}
                placeholder="Calle José Martí"
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
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.address}
                onChangeText={value => onChange(value, 'address')}
              />
              {error.address !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {error.address}
                </Text>
              )}
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14, color: '#000'}}>Número de Casa*</Text>
              <TextInput
                ref={seis}
                onSubmitEditing={() => siete.current.focus()}
                placeholder="127A"
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
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.number}
                onChangeText={value => onChange(value, 'number')}
              />
              {error.number !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>{error.number}</Text>
              )}
            </View>

            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>Entre Calle 1</Text>
                <TextInput
                  ref={siete}
                  onSubmitEditing={() => ocho.current.focus()}
                  placeholder="Calle Abel Díaz"
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
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.firstAccross}
                  onChangeText={value => onChange(value, 'firstAccross')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>Entre Calle 2</Text>
                <TextInput
                  ref={ocho}
                  onSubmitEditing={() => nueve.current.focus()}
                  placeholder="Calle Félix Pérez"
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
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.secondAccross}
                  onChangeText={value => onChange(value, 'secondAccross')}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>Provincia*</Text>

                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#F9FAFE',
                    borderRadius: 8,
                  }}>
                  <Picker
                    style={{}}
                    mode="dropdown"
                    selectedValue={datos.provincia}
                    onValueChange={value => {
                      onChange(value, 'provincia');
                      console.log(value);
                      if (!value) {
                        return setAviableMunicipios([]);
                      }
                      const municipios = provincias.filter(
                        province => province.nombre === value,
                      );
                      setAviableMunicipios(municipios[0].municipios);
                    }}>
                    <Picker.Item
                      enabled={false}
                      label="Seleccione su provincia"
                      value=""
                    />
                    {provincias.map((province, index) => (
                      <Picker.Item
                        key={index}
                        label={province.nombre}
                        value={province.nombre}
                      />
                    ))}
                  </Picker>
                  <Text
                    style={{
                      width: '100%',
                      height: 60,
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    }}>
                    {' '}
                  </Text>
                </View>
                {error.provincia !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.provincia}
                  </Text>
                )}
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>Municipio*</Text>

                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#F9FAFE',
                    borderRadius: 8,
                  }}>
                  <Picker
                    style={{}}
                    mode="dropdown"
                    selectedValue={datos.municipio}
                    onValueChange={value => {
                      onChange(value, 'municipio');
                    }}>
                    <Picker.Item
                      enabled={false}
                      label="Seleccione su Municipio"
                      value=""
                    />
                    {aviableMunicipios.map((municipioS: any, index: any) => (
                      <Picker.Item
                        key={index}
                        label={municipioS}
                        value={municipioS}
                      />
                    ))}
                  </Picker>
                  <Text
                    style={{
                      width: '100%',
                      height: 60,
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    }}>
                    {' '}
                  </Text>
                </View>
                {error.municipio !== '' && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {error.municipio}
                  </Text>
                )}
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14, color: '#000'}}>
                Número de Teléfono*
              </Text>
              <TextInput
                ref={once}
                onSubmitEditing={() => doce.current.focus()}
                keyboardType="phone-pad"
                placeholder="55213165"
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
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.phoneNumber}
                onChangeText={value => onChange(value, 'phoneNumber')}
              />
              {error.phoneNumber !== '' && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {error.phoneNumber}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <View style={{flex: 1, marginRight: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>Departameno</Text>
                <TextInput
                  ref={doce}
                  onSubmitEditing={() => trece.current.focus()}
                  placeholder="203"
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
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.deparment}
                  onChangeText={value => onChange(value, 'deparment')}
                />
              </View>
              <View style={{flex: 1, marginLeft: 2}}>
                <Text style={{fontSize: 14, color: '#000'}}>Piso</Text>
                <TextInput
                  ref={trece}
                  onSubmitEditing={() => catorce.current.focus()}
                  placeholder="1ro"
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
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={datos.floor}
                  onChangeText={value => onChange(value, 'floor')}
                />
              </View>
            </View>
            <View style={{marginTop: 3}}>
              <Text style={{fontSize: 14, color: '#000'}}>Reparto</Text>
              <TextInput
                ref={catorce}
                onSubmitEditing={() => onSave()}
                placeholder="Reparto Militar"
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
                autoCapitalize="words"
                autoCorrect={false}
                value={datos.reparto}
                onChangeText={value => onChange(value, 'reparto')}
              />
            </View>

            {/*   <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 20,
              }}> */}
            {/* <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cancelButton}
                onPress={closeModal}>
                <Text style={{color: '#000', fontSize: 16}}>Cancelar</Text>
              </TouchableOpacity> */}

            {/*  <TouchableOpacity
                activeOpacity={0.8}
                style={{...styles.confirmButton, backgroundColor: colors.card}}
                onPress={onSave}>
                <Text style={{color: '#ffffff', fontSize: 16}}>Añadir</Text>
              </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: 30,
                padding: 10,
                paddingHorizontal: 50,
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                marginBottom: 30,
                width: '80%',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: colors.card,
              }}
              activeOpacity={0.8}
              onPress={onSave}>
              {isLoading && (
                <View style={{position: 'absolute', left: 25, top: 10}}>
                  <ActivityIndicator color={'white'} size={24} />
                </View>
              )}
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontSize: 20,
                  marginHorizontal: 15,
                }}>
                Guardar
              </Text>

              <Icon
                name="arrow-right"
                color="white"
                size={24}
                style={{position: 'absolute', right: 14, top: 10}}
              />
            </TouchableOpacity>
            {/*      </View> */}
            {/* </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    width: width * 0.9,
    height: height * 0.9,
    padding: 15,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 8,
  },
  cancelButton: {
    zIndex: 9999,
    padding: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  title: {fontSize: 20, fontWeight: 'bold', alignSelf: 'center'},
  confirmButton: {
    padding: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
