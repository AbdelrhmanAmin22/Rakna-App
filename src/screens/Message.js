import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Message = () => {
  const [messages, setMessages] = useState([]); // state for storing messages
  const [inputText, setInputText] = useState(''); // state for storing input text

  // function to handle sending message
  const handleSendMessage = () => {
    if (inputText.trim()) { // check if input text is not empty
      setMessages([...messages, inputText]); // add input text to messages array
      setInputText(''); // clear input text
    }
  };

  return (
    <View style={styles.container}>
      <FlatList // use FlatList to render messages
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginBottom: 5,
    padding: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  message: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#f77d0a',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Message;
