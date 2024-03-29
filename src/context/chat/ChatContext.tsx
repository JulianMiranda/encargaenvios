import React, {createContext, useEffect, useContext, useReducer} from 'react';
import {chatReducer, ChatState} from './chatReducer';
import {Message, MessageResponse} from '../../interfaces/Message.interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';
import {Chat} from '../../interfaces/Chat.interface';

type ChatContextProps = {
  messages: Message[];
  adminChats: Chat[];
  adminMessages: Message[];
  newMessages: number;
  loadingAdminMessges: boolean;
  loadMessages: () => void;
  loadAdminMessages: (userChat: Chat) => void;
  sendMessage: (message: string) => void;
  sendAdminMessage: (message: string, userChat: Chat) => void;
  setNewMessages: () => void;
  clearNewMessages: () => void;
  clearAdminMessages: (userChat: Chat) => void;
  loadAdminChats: () => void;
};

const chatInicialState: ChatState = {
  messages: [],
  adminChats: [],
  adminMessages: [],
  newMessages: 0,
  loadingAdminMessges: true,
};
export const ChatContext = createContext({} as ChatContextProps);

export const ChatProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(chatReducer, chatInicialState);
  const {user} = useContext(AuthContext);
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const messages = await api.get<MessageResponse>('messages/getMessages');

      dispatch({type: 'load-messages', payload: messages.data.data});
    } catch (error) {}
  };

  const loadAdminChats = async () => {
    try {
      api
        .get<Chat[]>('/messages/getUsersMessagesWithBatch')
        .then(({data}) => {
          dispatch({type: 'load-admin-chats', payload: data});
        })
        .catch(error => {
          console.log('Error Load Messages Admin', error);
          dispatch({type: 'loading-admin-chat', payload: false});
        });
    } catch (error) {
      console.log('CatchError Load Messages Admin', error);
      dispatch({type: 'loading-admin-chat', payload: false});
    }
  };

  const loadAdminMessages = (userChat: Chat) => {
    try {
      api
        .get<MessageResponse>(`/messages/getAdminMessages/${userChat.id}`)
        .then(({data}) =>
          dispatch({type: 'load-admin-messages', payload: data.data}),
        );
    } catch (error) {}
  };

  const sendMessage = async (message: string) => {
    try {
      /*  const messages = await api.get<MessageResponse>('messages/getMessages'); */
      /* dispatch({type: 'send-messages', payload: messages.data.data}); */
      api.put<MessageResponse>(
        'messages/setMessages/628af2682668335c40e79106',
        {message},
      );
      const newMessage: Message = {
        de: user?.id ? user.id : '',
        para: '628af2682668335c40e79106',
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '',
      };
      dispatch({type: 'send-message', payload: newMessage});
    } catch (error) {}
  };
  const sendAdminMessage = async (message: string, userChat: Chat) => {
    try {
      /*  const messages = await api.get<MessageResponse>('messages/getMessages'); */
      /* dispatch({type: 'send-messages', payload: messages.data.data}); */
      api.put<MessageResponse>(`messages/setMessages/${userChat.id}`, {
        message,
        de: '628af2682668335c40e79106',
      });
      const newMessage: Message = {
        de: '628af2682668335c40e79106',
        para: user?.id ? user.id : '',
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '',
      };

      dispatch({type: 'send-message', payload: newMessage});
    } catch (error) {}
  };
  const setNewMessages = async () => {
    try {
      console.log('Nuevo mensaje');

      const newMessages = await api.get<number>(
        `/checkMessages/checkUserMessages/${user?.id}`,
      );

      dispatch({type: 'set-new-messages', payload: newMessages.data});
    } catch (error) {}
  };

  const clearNewMessages = async () => {
    try {
      api.put<boolean>(`/checkMessages/updateMessageUser/${user?.id}`);

      dispatch({type: 'clear-new-messages', payload: 0});
    } catch (error) {}
  };

  const clearAdminMessages = async (userChat: Chat) => {
    try {
      dispatch({type: 'update-admin-chat', payload: userChat});
      api.put(`/checkMessages/adminCheckMessageUser/${userChat.id}`);
    } catch (error) {
      console.log(
        'No se pudo actualizar la hora de revision del usuario',
        error,
      );
    }
  };
  return (
    <ChatContext.Provider
      value={{
        ...state,
        loadMessages,
        sendMessage,
        setNewMessages,
        clearNewMessages,
        sendAdminMessage,
        loadAdminChats,
        loadAdminMessages,
        clearAdminMessages,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
