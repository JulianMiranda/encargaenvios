import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef} from 'react';
import {ChatContext} from '../../context/chat/ChatContext';
import {TopGradient} from '../common/TopGradient';
import {BackButton} from '../common/BackButton';
import {FlatList, View} from 'react-native';
import ChatMessage from './ChatMessage';
import InputBox from './InputBox';

export const CommonUserMessages = () => {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const {messages, loadMessages, clearNewMessages} = useContext(ChatContext);
  useEffect(() => {
    loadMessages();

    return () => {
      console.log('Clear messages');
      clearNewMessages();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TopGradient text={'Ayuda'} />
      <BackButton navigation={navigation} />
      <FlatList
        ref={scrollRef.current}
        keyExtractor={(item, index) => index.toString()}
        data={messages}
        inverted
        ListHeaderComponent={<View style={{height: 50}} />}
        renderItem={({item}) => <ChatMessage message={item} />}
      />
      <InputBox />
    </>
  );
};
