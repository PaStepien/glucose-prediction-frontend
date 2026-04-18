import AssistantSuggestions from '@/components/chat/AssitantSuggestions';
import { ChatList } from '@/components/chat/chats/ChatList';
import TextInputBar from '@/components/chat/TextInputArea';
import VoiceAnimation from '@/components/chat/VoiceAnimation';
import WelcomeMessage from '@/components/chat/WelcomeMessage';
import { ChatProvider, useChatConversationContext } from '@/hooks/chat/useChatConversationContext';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';


export default function ChatScreen() {
  return (
    <ChatProvider>
      <LinearGradient
        colors={['#dde8fb', '#e8d6f5', '#f5d6ee', '#dce9fc']}
        locations={[0, 0.35, 0.65, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{ flex: 1 }}
      >
        <ChatScreenContent />
      </LinearGradient>
    </ChatProvider>
  );
}


export function ChatScreenContent() {

  const { voiceInputActivated, setVoiceInputActivated, messages } = useChatConversationContext();

  const footer = voiceInputActivated ? <VoiceAnimation isActive={voiceInputActivated} /> : <TextInputBar />;

  const touchedOutsideInput = () => {
    Keyboard.dismiss();
    if (voiceInputActivated) {
      setVoiceInputActivated(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => touchedOutsideInput()} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View
          style={styles.container}
        >

          {messages.length === 0 ?
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <WelcomeMessage />
              <AssistantSuggestions />
            </ScrollView> :
            <>
              <WelcomeMessage />
              <ChatList messages={messages} />
            </>
          }
          {footer}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.55,
  },
});
