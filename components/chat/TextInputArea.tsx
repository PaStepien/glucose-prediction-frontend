import { askQuestion } from '@/hooks/chat/ask-question';
import { useChatConversationContext } from '@/hooks/chat/useChatConversationContext';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import Microphone from './Microphone';
import SubmitInput from './SubmitInput';

export default function TextInputArea() {
    const [textInput, setText] = React.useState('');
    const { addMessage, setIsAssistantThinking } = useChatConversationContext();
   

    const submitMessage = async (message: string, nextInput = '') => {
        const trimmedMessage = message.trim();
        if (trimmedMessage.length === 0) {
            return;
        }

        addMessage(trimmedMessage, 'user');
        setText(nextInput);
        await askQuestion(trimmedMessage, addMessage, setIsAssistantThinking);
    };

    return (
        <View style={styles.inputWrapper}>
            <View style={styles.inputBar}>
                <TextInput
                    value={textInput}
                    onChangeText={setText}
                    style={styles.textInput}
                    placeholder="Ask me anything..."
                    placeholderTextColor="#a99fc4"
                />
                {textInput.length === 0 ? (
                    <Microphone
                        handleDetectedText={(detectedText) => submitMessage(detectedText, detectedText.trim())}
                    />
                ) : (
                    <SubmitInput handleSubmit={() => submitMessage(textInput)} />
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

