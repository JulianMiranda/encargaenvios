import AsyncStorage from '@react-native-async-storage/async-storage';
import {CarItemProps} from '../interfaces/Shop.Interface';

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
