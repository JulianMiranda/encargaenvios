import {Message} from '../../interfaces/Message.interface';

export interface ChatState {
  messages: any[];
  newMessages: number;
}

type ChatAction =
  | {type: 'load-messages'; payload: Message[]}
  | {type: 'set-new-messages'; payload: number}
  | {type: 'clear-new-messages'; payload: number}
  | {type: 'send-message'; payload: Partial<Message>};

export const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case 'send-message':
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case 'set-new-messages':
      return {
        ...state,
        newMessages: action.payload,
      };
    case 'clear-new-messages':
      return {
        ...state,
        newMessages: action.payload,
      };
    case 'load-messages':
      return {
        ...state,
        messages: [...action.payload],
      };

    default:
      return state;
  }
};
