import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
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
import {useToast} from 'react-native-toast-notifications';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {AuthContext} from '../../context/auth/AuthContext';
import api from '../../api/api';
import {Carnet} from '../../interfaces/CarnetResponse.interface';
import {provincias} from '../../utils/provincias';

interface Props {
  openModal: boolean;
  setOpenModal: (action: boolean) => void;
  loadCarnets: () => void;
  carnetEdit: Partial<Carnet>;
}

const {height, width} = Dimensions.get('window');

export const ModalEditCarnet = ({
  carnetEdit,
  openModal,
  setOpenModal,
  loadCarnets,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {user} = useContext(AuthContext);
  const toast = useToast();

  const [aviableMunicipios, setAviableMunicipios] = useState<any>([]);
  const [datos, setDatos] = useState<Partial<Carnet>>({
    id: carnetEdit.id || '',
    name: carnetEdit.name || '',
    firstLastName: carnetEdit.firstLastName || '',
    secondLastName: carnetEdit.secondLastName || '',
    carnet: carnetEdit.carnet || '',
    phoneNumber: carnetEdit.phoneNumber || '',
    address: carnetEdit.address || '',
    municipio: carnetEdit.municipio || '',
    number: carnetEdit.number || '',
    provincia: carnetEdit.provincia || '',
    deparment: carnetEdit.deparment || '',
    firstAccross: carnetEdit.firstAccross || '',
    secondAccross: carnetEdit.secondAccross || '',
    floor: carnetEdit.floor || '',
    reparto: carnetEdit.reparto || '',
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

  useEffect(() => {
    for (const key in carnetEdit) {
      if (carnetEdit[key]) {
        setDatos(prevState => ({
          ...prevState,
          [key]: carnetEdit[key],
        }));
      }
      if (carnetEdit.provincia) {
        const municipios = provincias.filter(
          province => province.nombre === carnetEdit.provincia,
        );
        setAviableMunicipios(municipios[0].municipios);
      }
    }
  }, [carnetEdit]);

  useEffect(() => {
    if (openModal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [openModal]);

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
    } else if (datos.municipio?.trim() === '') {
      setError({...error, municipio: 'El municipio es obligatorio'});
    } else if (datos.provincia?.trim() === '') {
      setError({...error, provincia: 'La provincia es obligatoria'});
    } else if (datos.phoneNumber?.trim() === '') {
      setError({...error, phoneNumber: 'El teléfono es obligatorio'});
    } else if (
      datos.phoneNumber!.trim().length < 6 ||
      !carnetRegex.test(datos.phoneNumber!.trim().slice(1))
    ) {
      setError({...error, phoneNumber: 'Ingrese un teléfono válido'});
    } else {
      try {
        setIsLoading(true);
        const exist = await api.post('/carnets/getList', {
          filter: {
            user: ['=', user?.id],
            carnet: ['=', datos.carnet],
          },
        });
        if (exist.data.data.length > 0 && datos.carnet !== carnetEdit.carnet) {
          toast.show('Ya tienes guardados estos datos', {
            type: 'normal',
            placement: 'top',
            duration: 3000,
            style: {
              zIndex: 9999,
              justifyContent: 'center',
              borderRadius: 50,
              marginTop: 50,
              paddingHorizontal: 20,
              backgroundColor: 'red',
            },
            textStyle: {fontSize: 16},
            animationType: 'zoom-in',
          });
        } else {
          await api.put(`/carnets/update/${carnetEdit.id}`, {
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
        }
        setIsLoading(false);
        setOpenModal(false);
        loadCarnets();
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
              <Text style={styles.title}>{carnetEdit.name}</Text>
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
                selectTextOnFocus
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
                  selectTextOnFocus
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
                  selectTextOnFocus
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
                selectTextOnFocus
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
                selectTextOnFocus
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
                selectTextOnFocus
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
                  selectTextOnFocus
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
                  selectTextOnFocus
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
                {/* <TextInput
                  selectTextOnFocusref
                  ={nueve}
                  onSubmitEditing={() => diez.current.focus()}
                  placeholder="Cabaiguán"
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
                  value={municipio}
                  onChangeText={value => {
                    onChange(value, 'municipio');
                    if (error.municipio !== '') {
                      clearError();
                    }
                  }}
                /> */}
                <View style={{flex: 1}}>
                  <Picker
                    style={{}}
                    mode="dropdown"
                    selectedValue={datos.provincia}
                    onValueChange={value => {
                      onChange(value, 'provincia');

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
                      color: '#000',
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

                <View style={{flex: 1}}>
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
                selectTextOnFocus
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
                  selectTextOnFocus
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
                  selectTextOnFocus
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
                selectTextOnFocus
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
