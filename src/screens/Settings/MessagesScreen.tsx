import React, {useContext, useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {BackButton} from '../../components/common/BackButton';
import {TopGradient} from '../../components/common/TopGradient';
import {useNavigation} from '@react-navigation/core';
import {ChatContext} from '../../context/chat/ChatContext';
import ChatMessage from '../../components/settings/ChatMessage';
import InputBox from '../../components/settings/InputBox';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';

export const MessagesScreen = () => {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const {messages, loadMessages, clearNewMessages} = useContext(ChatContext);
  const {status} = useContext(AuthContext);

  useEffect(() => {
    loadMessages();

    return () => {
      console.log('Clear messages');
      clearNewMessages();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }
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
