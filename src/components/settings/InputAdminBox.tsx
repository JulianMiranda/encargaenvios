import React, {useState, useContext, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ChatContext} from '../../context/chat/ChatContext';
import {Chat} from '../../interfaces/Chat.interface';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  userChat: Chat;
  keyboardOut: boolean;
}

export const InputAdminBox = ({userChat, keyboardOut}: Props) => {
  const {sendAdminMessage} = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const textInputReference = useRef(null);
  const {bottom} = useSafeAreaInsets();

  const onSendPres = () => {
    if (message === '') {
      return;
    }
    setMessage('');
    sendAdminMessage(message, userChat);
  };
  const bottomValue = Platform.OS === 'android' ? 80 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <View
        style={{
          ...styles.container,
          bottom: keyboardOut ? bottomValue : bottom + 60,
        }}>
        <View style={styles.mainContainer}>
          <FontAwesome5 name="laugh-beam" size={24} color="grey" />
          <TextInput
            ref={textInputReference}
            autoFocus
            multiline
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
            placeholder="Escribe un mensaje..."
          />
          {/* <Entypo
						name="attachment"
						size={24}
						color="grey"
						style={{marginHorizontal: 10}}
					/>
					{!message && <Fontisto name="camera" size={24} color="grey" />} */}
        </View>
        <TouchableOpacity onPress={onSendPres}>
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginRight: 10,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#4EB2E4',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
});
