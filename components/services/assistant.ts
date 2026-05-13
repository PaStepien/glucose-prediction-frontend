import { QuestionResponse } from "@/constants/chat/question-response";
import { JwtPayload } from "@supabase/supabase-js";

const ASSISTANT_URL = "http://localhost:8000";

export async function askAssistant(question: string, claims: JwtPayload | null): Promise<QuestionResponse> {
    if (!ASSISTANT_URL) {
        throw new Error("Assistant URL is not defined. Please set the ASSISTANT_URL environment variable.");
    }
    console.log("Asking assistant with question:", question);
    console.log("User claims:", claims);
    const response = await fetch(`${ASSISTANT_URL}/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, user_id: claims?.sub }),
    });

    const data = await response.json();
    return data; 
}