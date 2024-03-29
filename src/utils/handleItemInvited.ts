import AsyncStorage from '@react-native-async-storage/async-storage';
import {CarItemProps, ComboItemProps} from '../interfaces/Shop.Interface';
import {Subcategory} from '../interfaces/Subcategory.interface';

export async function getInvitedCar(): Promise<CarItemProps[]> {
  try {
    const car = await AsyncStorage.getItem('INVITED_CAR');
    if (!car) {
      return [];
    }

    return JSON.parse(car);
  } catch (e) {
    return [];
  }
}

export async function getSavedCombo(): Promise<ComboItemProps[]> {
  try {
    const combo = await AsyncStorage.getItem('SAVED_COMBO');
    if (!combo) {
      return [];
    }

    return JSON.parse(combo);
  } catch (e) {
    return [];
  }
}

export async function setSaveCombo(item: ComboItemProps) {
  const combo = await getSavedCombo();

  const newItem = [...combo, item];
  await AsyncStorage.setItem('SAVED_COMBO', JSON.stringify(newItem));
}

export async function unSetSaveCombo(subcategory: Subcategory) {
  const combo = await getSavedCombo();
  const newCombo = [
    ...combo.filter(itemF => itemF.subcategory.id !== subcategory.id),
  ];
  await AsyncStorage.setItem('SAVED_COMBO', JSON.stringify(newCombo));
}

export async function updateSaveCombo(item: ComboItemProps) {
  const combo = await getSavedCombo();

  const newCombo = [
    ...combo.filter(itemF => itemF.subcategory.id !== item.subcategory.id),
    {
      subcategory: item.subcategory,
      cantidad: item.cantidad + 1,
    },
  ];

  await AsyncStorage.setItem('SAVED_COMBO', JSON.stringify(newCombo));
}

export async function deleteCombo() {
  await AsyncStorage.setItem('SAVED_COMBO', JSON.stringify([]));
  return [];
}

export async function setItemInvitedCar(item: CarItemProps) {
  const car = await getInvitedCar();

  const newItem = [...car, item];
  await AsyncStorage.setItem('INVITED_CAR', JSON.stringify(newItem));
}

export async function updateItemInvitedCar(item: CarItemProps) {
  const car = await getInvitedCar();

  const oldCarItems = car.filter(
    carItem =>
      JSON.stringify(carItem.category.id) !== JSON.stringify(item.category.id),
  );

  const newItem = [...oldCarItems, item];
  await AsyncStorage.setItem('INVITED_CAR', JSON.stringify(newItem));
}

export async function setMyShopInvitedCar(carInvited: CarItemProps[]) {
  await AsyncStorage.setItem('INVITED_CAR', JSON.stringify(carInvited));
}

export async function deleteInvitedCar() {
  await AsyncStorage.setItem('INVITED_CAR', JSON.stringify([]));
  return [];
}
