import { useChatConversationContext } from "@/hooks/chat/useChatConversationContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
const voiceAssistantSound = require("../../assets/sounds/ding.mp3");

export default function Microphone({ handleDetectedText }: { handleDetectedText: (detectedText: string) => void }) {
    const { setVoiceInputActivated } = useChatConversationContext();

    const audio = useAudioPlayer(voiceAssistantSound);

    const handleMicPress = async () => {
        const detectedText = "Hi, I'm PAM, your diabetes voice assistant";
        audio.seekTo(0)
        audio.play();

        setVoiceInputActivated(true);
    };
    return (
        <TouchableOpacity style={styles.micButton} onPress={handleMicPress}>
            <LinearGradient
                colors={['#b8a8f0', '#e8a8d8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.micButton}
            >
                <FontAwesome name="microphone" size={24} color="white" />
            </LinearGradient>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    micButton: {
        width: 42,
        height: 42,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
