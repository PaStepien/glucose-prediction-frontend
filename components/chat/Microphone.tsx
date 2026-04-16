import { useChatConversationContext } from "@/hooks/chat/useChatConversationContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function Microphone({handleDetectedText} : {handleDetectedText: (detectedText: string) => void}) {
    const { setHasStartedConversation } = useChatConversationContext();
    
    const handleMicPress = () => {
        const detectedText = "Simulated detected text from microphone";
        handleDetectedText(detectedText);
        setHasStartedConversation(true); 
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
