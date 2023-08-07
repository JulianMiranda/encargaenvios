import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import {AuthContext} from '../../context/auth/AuthContext';

const ChatMessage = (props: any) => {
  const {message} = props;
  const {user} = useContext(AuthContext);

  const isMyMessage = () => {
    if (user?.role === 'ADMIN') {
      return message.de === '628af2682668335c40e79106';
    } else {
      return message.de === user?.id;
    }
  };

  return (
    <View
      style={{
        padding: 10,
        alignItems: isMyMessage() ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={[
          styles.messageBox,
          {
            borderColor: isMyMessage() ? '#4EB2E4' : '#c1c1c1',
            borderWidth: 1,
            backgroundColor: isMyMessage() ? '#4EB2E4' : '#c1c1c1',
            alignItems: isMyMessage() ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
          },
        ]}>
        <Text style={[{color: isMyMessage() ? 'white' : 'white'}]}>
          {message.message}
        </Text>
      </View>
      <Text
        style={{
          color: 'gray',
          fontSize: 10,
          marginRight: isMyMessage() ? 10 : 0,
          marginLeft: isMyMessage() ? 0 : 10,
          fontWeight: '300',
        }}>
        {moment(message.createdAt).fromNow()}
      </Text>
    </View>
  );
};
export default ChatMessage;
const styles = StyleSheet.create({
  messageBox: {
    borderRadius: 20,
    padding: 10,
  },
});
