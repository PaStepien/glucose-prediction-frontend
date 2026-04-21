import { askAssistant } from "@/components/services/assistant";
import { QuestionResponse } from "@/constants/chat/question-response";
import * as FileSystem from 'expo-file-system';

export async function askQuestion(question: string, addMessage: (text: string, role: 'user' | 'assistant') => void, setIsAssistantThinking: (value: boolean) => void) {

    setIsAssistantThinking(true);
    try {
        const answer = await askAssistant(question);
        setIsAssistantThinking(false);
        const answerText = typeof answer.answer === 'string' ? answer.answer : JSON.stringify(answer.answer);
        const audio = await getAudioFile(answer);
        addMessage(answerText, 'assistant');
        return audio;
    } catch (error) {
        console.error('Error asking assistant:', error);
        setIsAssistantThinking(false);
        const answer = "Sorry, I couldn't get an answer right now.";
        addMessage(answer, 'assistant');
        const uri = 'app/assets/sounds/error_audio.wav';
        return uri;
    }
};

const getAudioFile = async (data: QuestionResponse): Promise<string> => {
    const base64Data = data.audio.split(",")[1];
    const fileUri = `${FileSystem.Directory}response_audio_${Date.now()}.wav`;
    await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: 'base64' });
    return fileUri;
}