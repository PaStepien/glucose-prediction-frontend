const ASSISTANT_URL = "";

export async function askAssistant(question: string): Promise<string> {
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
    return data.answer; 
}