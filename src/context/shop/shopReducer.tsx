import {Category} from '../../interfaces/CategoryResponse.interface';
import {CarItemProps} from '../../interfaces/Shop.Interface';

export interface ShopState {
  car: CarItemProps[];
  message: string;
  errorAddCar: string;
  addCarLoading: boolean;
}
type ShopAction =
  | {type: 'set_item'; payload: CarItemProps}
  | {type: 'unset_item'; payload: Category}
  | {type: 'update_item'; payload: CarItemProps}
  | {type: 'show_alert'; payload: string}
  | {type: 'error_add_car'; payload: string}
  | {type: 'add_car_loading'; payload: boolean}
  | {type: 'remove_alert'}
  | {type: 'empty_car'};

export const shopReducer = (
  state: ShopState,
  action: ShopAction,
): ShopState => {
  switch (action.type) {
    case 'set_item':
      return {
        ...state,
        car: [...state.car, action.payload],
      };

    case 'unset_item':
      return {
        ...state,
        car: [
          ...state.car.filter(
            item =>
              JSON.stringify(item.category) !== JSON.stringify(action.payload),
          ),
        ],
      };
    case 'update_item':
      return {
        ...state,
        car: [
          ...state.car.map(item => {
            if (
              JSON.stringify(item.category.id) ===
              JSON.stringify(action.payload.category.id)
            ) {
              return {
                cantidad: action.payload.cantidad,
                category: action.payload.category,
              };
            } else {
              return item;
            }
          }),
        ],
      };
    case 'empty_car':
      return {
        ...state,
        car: [],
      };
    case 'add_car_loading':
      return {
        ...state,
        addCarLoading: action.payload,
      };
    case 'show_alert':
      return {
        ...state,
        message: action.payload,
      };
    case 'error_add_car':
      return {
        ...state,
        errorAddCar: action.payload,
      };
    case 'remove_alert':
      return {
        ...state,
        message: '',
      };

    default:
      return state;
  }
};
