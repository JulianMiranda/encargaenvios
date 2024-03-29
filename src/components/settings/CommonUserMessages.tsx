import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ChatContext} from '../../context/chat/ChatContext';
import {
  FlatList,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatMessage from './ChatMessage';
import InputBox from './InputBox';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CommonUserMessages = () => {
  const navigation = useNavigation<any>();
  const scrollRef = useRef();
  const {top} = useSafeAreaInsets();
  const {messages, loadMessages, clearNewMessages} = useContext(ChatContext);

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

  console.log('CommonUserMessages');
  useEffect(() => {
    loadMessages();

    return () => {
      console.log('Clear messages');
      clearNewMessages();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('Mounted');
  }, []);

  const bottomValue = Platform.OS === 'android' ? 80 : 0;

  return (
    <>
      {/* <TopGradient text={'Ayuda'} style={{zIndex: 99999999}} /> */}
      {/*   <BackButton navigation={navigation} /> */}
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
            Ayuda
          </Text>
        </View>
      </View>
      {/* <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.4)',
          'rgba(255, 255, 255, 0.4)',
        ]}
        style={{
          height: 50,
          marginTop: 50,
        }}></LinearGradient> */}

      <FlatList
        ref={scrollRef.current}
        keyExtractor={(item, index) => index.toString()}
        data={messages}
        inverted
        ListFooterComponent={<View style={{height: 100}} />}
        ListHeaderComponent={
          <View style={{height: keyboardOut ? bottomValue : 100}} />
        }
        renderItem={({item}) => <ChatMessage message={item} />}
      />
      <InputBox keyboardOut={keyboardOut} />
    </>
  );
};
