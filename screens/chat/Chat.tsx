import AssistantSuggestions from '@/components/chat/AssitantSuggestions';
import { ChatList } from '@/components/chat/chats/ChatList';
import TextInputBar from '@/components/chat/TextInputArea';
import VoiceAnimation from '@/components/chat/VoiceAnimation';
import WelcomeMessage from '@/components/chat/WelcomeMessage';
import { askQuestion } from '@/hooks/chat/ask-question';
import { ChatProvider, useChatConversationContext } from '@/hooks/chat/useChatConversationContext';
import { useAudioPlayer } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSpeechRecognition } from '../../hooks/chat/use-speech-regonition';


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
  const player = useAudioPlayer(null);
  const { voiceInputActivated, setVoiceInputActivated, messages, addMessage, setIsAssistantThinking, setQuestionInput } = useChatConversationContext();
  const { startListening, stopListening } = useSpeechRecognition({
    onTranscriptReady: (text: string) => {
      setVoiceInputActivated(false);
      submitMessage(text, '');
    }
  });

  const handleStartListening = () => {
    setVoiceInputActivated(true);
    startListening();
  }

  const submitMessage = async (message: string, nextInput = '') => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return;
    }

    addMessage(trimmedMessage, 'user');
    setQuestionInput(nextInput);
    const audio = await askQuestion(trimmedMessage, addMessage, setIsAssistantThinking);
    player.replace(audio);
    player.play();
  };

  const footer = voiceInputActivated
    ? <VoiceAnimation isActive={voiceInputActivated} stopListening={stopListening} />
    : <TextInputBar microphonePress={handleStartListening} submitMessage={submitMessage} />;

  return (
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
            <AssistantSuggestions setQuestionInput={setQuestionInput} />
          </ScrollView> :
          <>
            <WelcomeMessage />
            <ChatList messages={messages} />
          </>
        }
        {footer}
      </View>
    </KeyboardAvoidingView>
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
