import {Category} from '../../interfaces/CategoryResponse.interface';
import {CarItemProps, ComboItemProps} from '../../interfaces/Shop.Interface';
import {Subcategory} from '../../interfaces/Subcategory.interface';

export interface ShopState {
  car: CarItemProps[];
  combo: ComboItemProps[];
  comboPrev: ComboItemProps[];
  message: string;
  errorAddCar: string;
  addCarLoading: boolean;
  costoTotal: number;
  pesoTotal: number;
  priceTotal: number;
  discountTotal: number;
  discountPromo: {
    name: string;
    description: string;
    discount: number;
    nodes: Array<string>;
    minDiscount: number;
    maxDiscount: number;
  };
}
type ShopAction =
  | {type: 'set_peso'; payload: number}
  | {type: 'set_costo'; payload: number}
  | {type: 'set_item'; payload: CarItemProps}
  | {type: 'set_item_combo'; payload: ComboItemProps}
  | {type: 'update_item_combo'; payload: ComboItemProps}
  | {type: 'unset_item_combo'; payload: Subcategory}
  | {type: 'set_item'; payload: CarItemProps}
  | {type: 'set_item_combo_prev'; payload: ComboItemProps}
  | {type: 'update_item_combo_prev'; payload: ComboItemProps}
  | {type: 'unset_item_combo_prev'; payload: Subcategory}
  | {type: 'add_car_loading'; payload: boolean}
  | {type: 'unset_item'; payload: Category}
  | {type: 'update_item'; payload: CarItemProps}
  | {type: 'show_alert'; payload: string}
  | {type: 'error_add_car'; payload: string}
  | {type: 'set_price_total'; payload: number}
  | {type: 'set_discount_total'; payload: number}
  | {
      type: 'set_discount_promo';
      payload: {
        name: string;
        description: string;
        discount: number;
        nodes: Array<string>;
        minDiscount: number;
        maxDiscount: number;
      };
    }
  | {type: 'remove_alert'}
  | {type: 'drop_combo'}
  | {type: 'drop_combo_prev'}
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
    case 'set_costo':
      return {
        ...state,
        costoTotal: action.payload,
      };
    case 'set_price_total':
      return {
        ...state,
        priceTotal: action.payload,
      };
    case 'set_discount_total':
      return {
        ...state,
        discountTotal: action.payload,
      };
    case 'set_discount_promo':
      return {
        ...state,
        discountPromo: action.payload,
      };
    case 'set_peso':
      return {
        ...state,
        pesoTotal: action.payload,
      };
    case 'drop_combo':
      return {
        ...state,
        combo: [],
      };
    case 'drop_combo_prev':
      return {
        ...state,
        comboPrev: [],
      };
    case 'set_item_combo':
      return {
        ...state,
        combo: [...state.combo, action.payload],
      };
    case 'update_item_combo':
      return {
        ...state,
        combo: [
          ...state.combo.filter(
            item => item.subcategory.id !== action.payload.subcategory.id,
          ),
          {
            subcategory: action.payload.subcategory,
            cantidad: action.payload.cantidad + 1,
            node: action.payload.node,
          },
        ],
      };
    case 'unset_item_combo':
      return {
        ...state,
        combo: [
          ...state.combo.filter(
            item =>
              JSON.stringify(item.subcategory) !==
              JSON.stringify(action.payload),
          ),
        ],
      };
    case 'set_item_combo_prev':
      return {
        ...state,
        comboPrev: [...state.comboPrev, action.payload],
      };
    case 'update_item_combo_prev':
      return {
        ...state,
        comboPrev: [
          ...state.comboPrev.filter(
            item => item.subcategory.id !== action.payload.subcategory.id,
          ),
          {
            subcategory: action.payload.subcategory,
            cantidad: action.payload.cantidad + 1,
            node: action.payload.node,
          },
        ],
      };
    case 'unset_item_combo_prev':
      return {
        ...state,
        comboPrev: [
          ...state.comboPrev.filter(
            item =>
              JSON.stringify(item.subcategory) !==
              JSON.stringify(action.payload),
          ),
        ],
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
