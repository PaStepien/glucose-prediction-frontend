import { askAssistant } from "@/components/services/assistant";
import * as Speech from 'expo-speech';


export async function askQuestion(question: string, addMessage: (text: string, role: 'user' | 'assistant') => void, setIsAssistantThinking: (value: boolean) => void) {

    const speechSettings = {
        language: 'en-US',
    };

    setIsAssistantThinking(true);
    try {
        const answer = await askAssistant(question);
        setIsAssistantThinking(false);
        addMessage(answer, 'assistant');
        Speech.speak(answer,speechSettings);
    } catch (error) {
        console.error('Error asking assistant:', error);
        setIsAssistantThinking(false);
        const answer = "Sorry, I couldn't get an answer right now.";
        addMessage(answer, 'assistant');
        Speech.speak(answer, speechSettings);
    }
};
