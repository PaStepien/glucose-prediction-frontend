import { Message } from '@/constants/chat/message';
import { StyleSheet, Text, View } from 'react-native';

export function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textAssistant]}>
          {message.text}
        </Text>
      </View>
      {message.time && (
        <Text style={styles.time}>{message.time}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    gap: 2,
    marginBottom: 10,
  },
  rowUser: { alignItems: 'flex-end' },
  rowAssistant: { alignItems: 'flex-start' },

  bubble: {
    maxWidth: '80%',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  bubbleUser: {
    backgroundColor: '#7b6abf',
    borderRadius: 18,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  text: { fontSize: 14, lineHeight: 20 },
  textUser: { color: '#fff' },
  textAssistant: { color: '#3a2f6e' },
  time: { fontSize: 10, color: '#a99fc4', paddingHorizontal: 4 },
});