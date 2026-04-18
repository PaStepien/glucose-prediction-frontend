import { StyleSheet, Text, View } from "react-native";

const userName = 'Pawel';

export default function WelcomeMessage() {
    return (
        <View style={styles.greetingContainer}>
            <Text style={styles.greetingSub}>Hello, {userName}!</Text>
            <Text style={styles.greetingMain}>How can I help{'\n'}you today?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    greetingContainer: {
        marginTop: 120,
        alignItems: 'center',
        paddingHorizontal: 32,
        marginBottom: 48,
    },
    greetingSub: {
        fontSize: 16,
        color: '#8b8bb0',
        fontWeight: '400',
        marginBottom: 10,
    },
    greetingMain: {
        fontSize: 26,
        fontWeight: '600',
        color: '#3a2f6e',
        textAlign: 'center',
        lineHeight: 36,
    },
});