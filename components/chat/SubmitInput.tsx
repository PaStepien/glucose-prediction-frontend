import { useChatConversationContext } from '@/hooks/chat/useChatConversationContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";

export default function SubmitInput({ handleSubmit }: { handleSubmit: () => void }) {
    const { hasStartedConversation, setHasStartedConversation } = useChatConversationContext();

    const submitInput = () => {
        Keyboard.dismiss();
        if (!hasStartedConversation) {
            setHasStartedConversation(true);
        }
        handleSubmit();
    };
    return (
        <TouchableOpacity style={styles.submitButton} onPress={submitInput}>
            <LinearGradient
                colors={['#b8a8f0', '#e8a8d8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButton}
            >
                <AntDesign name="send" size={20} color="white" />
            </LinearGradient>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    submitButton: {
        width: 42,
        height: 42,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    }
});



