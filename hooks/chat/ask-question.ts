import { askAssistant } from "@/components/services/assistant";


export async function askQuestion(question: string, addMessage: (text: string, role: 'user' | 'assistant') => void, setIsAssistantThinking: (value: boolean) => void) {

    setIsAssistantThinking(true);
    try {
        const answer = await askAssistant(question);
        setIsAssistantThinking(false);
        addMessage(answer, 'assistant');
    } catch (error) {
        console.error('Error asking assistant:', error);
        setIsAssistantThinking(false);
        addMessage("Sorry, I couldn't get an answer right now.", 'assistant');
    }
};
