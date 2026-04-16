import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import Microphone from './Microphone';
import SubmitInput from './SubmitInput';

export default function TextInputArea() {
    const [textInput, setText] = React.useState('');

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.inputWrapper}
        >
            <View style={styles.inputBar}>
                <TextInput
                    value={textInput}
                    onChangeText={setText}
                    style={styles.textInput}
                    placeholder="Ask me anything..."
                    placeholderTextColor="#a99fc4"
                />
                {textInput.length === 0 ? <Microphone /> : <SubmitInput />}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
       marginBottom: 24,
        width: '100%'
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