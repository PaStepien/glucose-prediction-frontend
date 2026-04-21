import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity } from "react-native";
export default function Microphone({ onPress }: { onPress: () => void }) {

    return (
        <TouchableOpacity style={styles.micButton} onPress={onPress}>
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
