import {Chat} from '../../interfaces/Chat.interface';
import {Message} from '../../interfaces/Message.interface';

export interface ChatState {
  messages: any[];
  adminMessages: any[];
  adminChats: Chat[];
  newMessages: number;
  loadingAdminMessges: boolean;
}

type ChatAction =
  | {type: 'load-messages'; payload: Message[]}
  | {type: 'load-admin-messages'; payload: Message[]}
  | {type: 'load-admin-chats'; payload: Chat[]}
  | {type: 'set-new-messages'; payload: number}
  | {type: 'clear-new-messages'; payload: number}
  | {type: 'loading-admin-chat'; payload: boolean}
  | {type: 'update-admin-chat'; payload: Chat}
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
    case 'load-admin-messages':
      return {
        ...state,
        adminMessages: [...action.payload],
      };
    case 'load-admin-chats':
      return {
        ...state,
        adminChats: [
          ...action.payload.filter(ch => ch.id !== '628af2682668335c40e79106'),
        ],
        loadingAdminMessges: false,
      };
    case 'loading-admin-chat':
      return {
        ...state,
        loadingAdminMessges: action.payload,
      };
    case 'update-admin-chat':
      return {
        ...state,
        adminChats: state.adminChats.map(ac => {
          if (ac.id === action.payload.id) {
            console.log('Cleanning');
            return {...ac, newMessages: []};
          } else {
            return {...ac};
          }
        }),
      };

    default:
      return state;
  }
};
