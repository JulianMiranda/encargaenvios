import {Order} from '../../interfaces/Order.interface';

export interface OrderState {
  orders: Order[];

  isLoading: boolean;
}
type OrderAction =
  | {type: 'set_order'; payload: Order}
  | {type: 'empty_orders'}
  | {type: 'load-orders'; payload: boolean};

export const orderReducer = (
  state: OrderState,
  action: OrderAction,
): OrderState => {
  switch (action.type) {
    case 'set_order':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case 'load-orders':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'empty_orders':
      return {
        ...state,
        orders: [],
      };

    default:
      return state;
  }
};
