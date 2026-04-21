import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const suggestions = [
    { iconItem: <Ionicons name="alarm-outline" size={24} color="#b8a8f0" />, label: "What will my blood sugar be in 2 hours?" },
    { iconItem: <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#b8a8f0" />, label: "Can I eat a banana now?" },
    { iconItem: <Feather name="trending-up" size={24} color="#b8a8f0" />, label: "Explain my spike in blood sugar at 3 PM yesterday." },
    { iconItem: <Feather name="help-circle" size={24} color="#b8a8f0" />, label: "What is the cause of diabetes?" },
    { iconItem: <MaterialIcons name="support-agent" size={24} color="#b8a8f0" />, label: "I'm feeling sad, can you cheer me up?" },
];

export default function AssistantSuggestions({setQuestionInput} : {setQuestionInput: (input: string) => void}) {


    return (
        <View style={styles.chipsContainer}>
            <Text style={styles.chipHeader}>I'm  <Text style={styles.chipHeaderBold}>PAM</Text>, your virtual diabetes assistant</Text>
            <Text style={styles.chipHeader}>Here are some things you can ask me:</Text>
            {suggestions.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.chip}
                    onPress={() => setQuestionInput(item.label)}
                >

                    {item.iconItem}
                    <Text style={styles.chipText}>{item.label}</Text>
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
        marginInline: 24,
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
        marginTop: 6,
        width: '100%',
    },
    chipIcon: {
        fontSize: 13,
    },
    chipHeader: {
        fontSize: 14,
        color: '#5a4e8a',
        fontWeight: '600',
        marginBottom: 2,
    },
    chipText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#5a4e8a',
        flexShrink: 1,
        fontWeight: '500',
    },
    chipHeaderBold: {
        fontWeight: '700',
    },
});