import { Message } from "@/constants/chat/message";
import { useChatConversationContext } from "@/hooks/chat/useChatConversationContext";
import { useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ChatBubble } from "./ChatBubble";

export function ChatList({ messages }: { messages: Message[] }) {
    const chatListRef = useRef<FlatList>(null);
    const { isAssistantThinking } = useChatConversationContext();

    useEffect(() => {
        if (messages.length === 0) return;
        chatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={styles.container}
            ref={ref => ref?.scrollToEnd({ animated: true })}
            ListFooterComponent={
                isAssistantThinking ? (
                    <View style={styles.thinkingRow}>
                        <View style={styles.thinkingBubble}>
                            <Text style={styles.thinkingText}>Thinking...</Text>
                        </View>
                    </View>
                ) : null
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    thinkingRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    thinkingBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderRadius: 18,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    thinkingText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#3a2f6e',
        fontStyle: 'italic',
    },
});
