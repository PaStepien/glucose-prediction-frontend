import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const suggestions = [
    {icon: '⏰', label: "What will my blood sugar be in 2 hours?"},
    {icon: '🍌', label: "Can I eat a banana now?"},
    {icon: '📈', label: "Explain my spike in blood sugar at 3 PM yesterday."},
    {icon: '❓', label: "What is the cause of diabetes?"},
    {icon: '😊', label: "I'm feeling sad, can you cheer me up?"},
]

export default function AssistantSuggestions() {
    return (
        <View style={styles.chipsContainer}>
            <Text style={styles.chipHeader}>I'm  <b>PAM</b>, your virtual diabetes assistant{'\n'}I can help you with:</Text>
            {suggestions.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.chip}
                >
                    <Text style={styles.chipIcon}>{item.icon}</Text>
                    <Text style={styles.chipText} numberOfLines={1}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 'auto',
        gap: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        padding: 12,
        marginBottom: 10,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        paddingVertical: 7,
        paddingHorizontal: 12,
        gap: 6,
        width: '100%',
    },
    chipIcon: {
        fontSize: 13,
    },
    chipHeader: {
        fontSize: 14,
        color: '#5a4e8a',
        fontWeight: '600',
        marginBottom: 6,
    },
    chipText: {
        fontSize: 12,
        color: '#5a4e8a',
        fontWeight: '500',
    },
});