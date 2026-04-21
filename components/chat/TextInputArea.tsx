import { useChatConversationContext } from '@/hooks/chat/useChatConversationContext';
import { useAudioPlayer } from 'expo-audio';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import Microphone from './Microphone';
import SubmitInput from './SubmitInput';

export default function TextInputArea({ microphonePress, submitMessage }: { microphonePress: () => void; submitMessage: (message: string) => void }) {
    const { questionInput, setQuestionInput } = useChatConversationContext();
    const player = useAudioPlayer(null);

    return (
        <View style={styles.inputWrapper}>
            <View style={styles.inputBar}>
                <TextInput
                    value={questionInput}
                    onChangeText={setQuestionInput}
                    style={styles.textInput}
                    placeholder="Ask me anything..."
                    placeholderTextColor="#a99fc4"
                />
                {questionInput.length === 0 ? (
                    <Microphone
                        onPress={microphonePress}
                    />
                ) : (
                    <SubmitInput handleSubmit={() => submitMessage(questionInput)} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 24,
        width: '100%',
        paddingTop: 8,
        paddingInline: 24,

    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        borderRadius: 999,
        paddingVertical: 8,
        paddingLeft: 20,
        paddingRight: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        gap: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 15,
        color: '#3a2f6e',
        paddingVertical: 4,
    },

});

