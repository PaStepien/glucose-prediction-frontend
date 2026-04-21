import { askAssistant } from "@/components/services/assistant";

export async function askQuestion(question: string, addMessage: (text: string, role: 'user' | 'assistant') => void, setIsAssistantThinking: (value: boolean) => void) {

    setIsAssistantThinking(true);
    try {
        const answer = await askAssistant(question);
        setIsAssistantThinking(false);
        const answerText = typeof answer.answer === 'string' ? answer.answer : JSON.stringify(answer.answer);
        const audio = answer.audio;
        addMessage(answerText, 'assistant');
        return audio;
    } catch (error) {
        console.error('Error asking assistant:', error);
        setIsAssistantThinking(false);
        const answer = "Sorry, I couldn't get an answer right now.";
        addMessage(answer, 'assistant');
        const uri = require('../../assets/sounds/error_audio.wav');
        return uri;
    }
};
