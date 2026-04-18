import { StyleSheet, Text, View } from "react-native";
import WaveBar from "./animation/WaveBar";

export default function VoiceAnimation({ isActive }: { isActive: boolean }) {
    const waveBars = [
        { maxHeight: 18, duration: 500 },
        { maxHeight: 38, duration: 700 },
        { maxHeight: 54, duration: 400 },
        { maxHeight: 60, duration: 600 },
        { maxHeight: 48, duration: 500 },
        { maxHeight: 60, duration: 800 },
        { maxHeight: 42, duration: 450 },
        { maxHeight: 54, duration: 650 },
        { maxHeight: 30, duration: 550 },
        { maxHeight: 20, duration: 500 },
        { maxHeight: 46, duration: 700 },
        { maxHeight: 36, duration: 600 },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.barsContainer}>
                {waveBars.map((bar, index) => (
                    <WaveBar key={index} maxHeight={bar.maxHeight} duration={bar.duration} isActive={isActive} minHeight={15} />
                ))}
            </View>
            <Text style={styles.listeningText}>Listening...</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingInline: 24,

    },
    barsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 5,
        marginBottom: 8,
        height: 80,
    },
    listeningText: {
        fontSize: 14,
        color: '#5a4e8a',
        fontWeight: '600',
        marginBottom: 2,
    }
});

