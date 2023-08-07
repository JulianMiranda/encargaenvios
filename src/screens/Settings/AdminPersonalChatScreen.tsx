import React, {useContext, useEffect, useRef} from 'react';
import {TopGradient} from '../../components/common/TopGradient';
import {BackButton} from '../../components/common/BackButton';
import {FlatList} from 'react-native-gesture-handler';
import {View} from 'react-native';
import ChatMessage from '../../components/settings/ChatMessage';
import {RootStackParams} from '../../navigator/SettingsStack';
import {StackScreenProps} from '@react-navigation/stack';
import {InputAdminBox} from '../../components/settings/InputAdminBox';
import {ChatContext} from '../../context/chat/ChatContext';

interface Props
  extends StackScreenProps<RootStackParams, 'AdminPersonalChatScreen'> {}

export const AdminPersonalChatScreen = (props: Props) => {
  const {route, navigation} = props;
  const {userChat} = route.params;
  const scrollRef = useRef();

  const {adminMessages, loadAdminMessages, clearAdminMessages} =
    useContext(ChatContext);

  useEffect(() => {
    loadAdminMessages(userChat);

    return () => {
      clearAdminMessages(userChat);
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
        data={adminMessages}
        inverted
        ListHeaderComponent={<View style={{height: 50}} />}
        renderItem={({item}) => <ChatMessage message={item} />}
      />
      <InputAdminBox userChat={userChat} />
    </>
  );
};
