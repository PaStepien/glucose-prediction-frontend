import {
    ExpoSpeechRecognitionModule,
    useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import { useState } from 'react';

export function useSpeechRecognition({ onTranscriptReady }: { onTranscriptReady: (transcript: string) => void }) {
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState('');

    useSpeechRecognitionEvent('start', () => setRecognizing(true));
    useSpeechRecognitionEvent('end', () => {
        setRecognizing(false);
        if (transcript) onTranscriptReady(transcript);
    });
    useSpeechRecognitionEvent('result', (event) => {
        setTranscript(event.results[0]?.transcript);
    });
    useSpeechRecognitionEvent('error', (event) => {
        console.error('Speech error:', event.error, event.message);
    });

    const startListening = async () => {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
            console.warn('Permissions not granted', result);
            return;
        }
        ExpoSpeechRecognitionModule.start({
            lang: 'en-US',
            interimResults: true,
            continuous: false,
        });
    };

    const stopListening = () => ExpoSpeechRecognitionModule.stop();

    return { recognizing, transcript, startListening, stopListening };
}