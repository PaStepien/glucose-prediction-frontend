import AssistantSuggestions from '@/components/chat/AssitantSuggestions';
import Greetings from '@/components/chat/Greetings';
import TextInputBar from '@/components/chat/TextInputArea';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ChatScreen() {


  return (
    <LinearGradient
      colors={['#dde8fb', '#e8d6f5', '#f5d6ee', '#dce9fc']}
      locations={[0, 0.35, 0.65, 1]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.container}
    >
      <Greetings />
      <AssistantSuggestions />
      <TextInputBar />
    </LinearGradient>
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
