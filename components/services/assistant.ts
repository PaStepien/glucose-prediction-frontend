import { QuestionResponse } from "@/constants/chat/question-response";

const ASSISTANT_URL = "localhost:8000";

export async function askAssistant(question: string): Promise<QuestionResponse> {
    if (!ASSISTANT_URL) {
        throw new Error("Assistant URL is not defined. Please set the ASSISTANT_URL environment variable.");
    }
    const response = await fetch(`${ASSISTANT_URL}/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return data; 
}