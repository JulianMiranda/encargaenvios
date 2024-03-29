import React, {useContext, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TopGradient} from '../common/TopGradient';
import {BackButton} from '../common/BackButton';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ChatContext} from '../../context/chat/ChatContext';
import {FadeInImage} from '../common/FadeInImage';

export const AdminMessages = () => {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const {loadingAdminMessges, adminChats, loadAdminChats} =
    useContext(ChatContext);

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  useEffect(() => {
    loadAdminChats();
  }, []);

  return (
    <>
      <TopGradient text={'Chats'} style={{zIndex: 99999999}} />
      <BackButton navigation={navigation} />
      {loadingAdminMessges && (
        <ActivityIndicator
          size={24}
          color={colors.card}
          style={{flex: 1, marginTop: 100}}
        />
      )}
      {!loadingAdminMessges && adminChats.length === 0 && (
        <View
          style={{
            flex: 1,
            marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.card,
              fontWeight: 'bold',
            }}>
            Bandeja de entrada vacía
          </Text>
        </View>
      )}
      <FlatList
        ref={scrollRef.current}
        keyExtractor={(item, index) => index.toString()}
        data={adminChats}
        ListHeaderComponent={<View style={{height: 100}} />}
        renderItem={({item}) => (
          <>
            {console.log(item.image.url)}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('AdminPersonalChatScreen', {
                  userChat: item,
                })
              }
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FadeInImage
                  uri={item.image.url}
                  style={{height: 30, width: 30, borderRadius: 30}}
                />
                <Text
                  style={{
                    fontWeight:
                      item.newMessages.length !== 0 ? 'bold' : 'normal',
                    marginLeft: 5,
                  }}>
                  {item.name}
                </Text>
              </View>
              {item.newMessages.length !== 0 && (
                <View
                  style={{
                    backgroundColor: 'rgba(38, 132, 253, 0.7)',
                    borderRadius: 100,
                    padding: 5,
                    paddingHorizontal: 12,
                  }}>
                  <Text style={{color: '#fff'}}>{item.newMessages.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}
      />
    </>
  );
};
