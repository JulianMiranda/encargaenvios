import React, {useContext, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import ChatMessage from '../../components/settings/ChatMessage';
import {RootStackParams} from '../../navigator/SettingsStack';
import {StackScreenProps} from '@react-navigation/stack';
import {InputAdminBox} from '../../components/settings/InputAdminBox';
import {ChatContext} from '../../context/chat/ChatContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props
  extends StackScreenProps<RootStackParams, 'AdminPersonalChatScreen'> {}

export const AdminPersonalChatScreen = (props: Props) => {
  const {route, navigation} = props;
  const {userChat} = route.params;
  const scrollRef = useRef();
  const {top} = useSafeAreaInsets();

  const {adminMessages, loadAdminMessages, clearAdminMessages} =
    useContext(ChatContext);

  const [keyboardOut, setKeyboardOut] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyShow = () => {
    setKeyboardOut(true);
  };
  const keyHide = () => {
    setKeyboardOut(false);
  };

  useEffect(() => {
    loadAdminMessages(userChat);

    return () => {
      clearAdminMessages(userChat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/*   <TopGradient
        text={userChat.name ? userChat.name : 'Ayuda'}
        style={{zIndex: 99999999}}
      />
      <BackButton navigation={navigation} /> */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(152, 212, 251, 0.8)',
          height: top + 40,
          zIndex: 9999,
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            activeOpacity={0.8}
            style={{position: 'absolute', left: 5, bottom: -5}}>
            <Icon name="arrow-back-outline" color="white" size={35} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            {userChat.name ? userChat.name : 'Ayuda'}
          </Text>
        </View>
      </View>
      <FlatList
        ref={scrollRef.current}
        keyExtractor={(item, index) => index.toString()}
        data={adminMessages}
        inverted
        ListFooterComponent={<View style={{height: 100}} />}
        ListHeaderComponent={<View style={{height: keyboardOut ? 0 : 100}} />}
        renderItem={({item}) => <ChatMessage message={item} />}
      />
      <InputAdminBox userChat={userChat} keyboardOut={keyboardOut} />
    </>
  );
};
