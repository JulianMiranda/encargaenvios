import React, {createContext, useEffect, useContext, useReducer} from 'react';
import {chatReducer, ChatState} from './chatReducer';
import {Message, MessageResponse} from '../../interfaces/Message.interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';

type ChatContextProps = {
  messages: Message[];
  newMessages: number;
  loadMessages: () => void;
  sendMessage: (message: string) => void;
  setNewMessages: () => void;
  clearNewMessages: () => void;
};

const chatInicialState: ChatState = {
  messages: [],
  newMessages: 0,
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
  const setNewMessages = async () => {
    try {
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

  return (
    <ChatContext.Provider
      value={{
        ...state,
        loadMessages,
        sendMessage,
        setNewMessages,
        clearNewMessages,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
