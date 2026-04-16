import TextInputBar from '@/components/chat/TextInputArea';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ChatConversation } from './ChatConversation';
import { EmptyChatState } from './EmptyChatState';

export default function ChatScreen() {

  const isConversationEmpty = false; // Placeholder for conversation state
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={['#dde8fb', '#e8d6f5', '#f5d6ee', '#dce9fc']}
        locations={[0, 0.35, 0.65, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.container}
      >

        {isConversationEmpty ? <EmptyChatState /> : <ChatConversation />}

        <TextInputBar />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingInline: 24,
  },

  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.55,
  },
});
