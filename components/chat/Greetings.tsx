import { StyleSheet, Text, View } from "react-native";

const userName = 'Pawel';

export default function Greetings() {
    return (
        <View style={styles.greetingContainer}>
            <Text style={styles.greetingSub}>Hello, {userName}!</Text>
            <Text style={styles.greetingMain}>How can I help{'\n'}you today?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    greetingContainer: {
        marginTop: 80,
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    greetingSub: {
        fontSize: 16,
        color: '#8b8bb0',
        fontWeight: '400',
        marginBottom: 4,
    },
    greetingMain: {
        fontSize: 26,
        fontWeight: '600',
        color: '#3a2f6e',
        textAlign: 'center',
        lineHeight: 36,
    },
});