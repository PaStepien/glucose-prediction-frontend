const ASSISTANT_URL = 'http://localhost:8000';

export async function askAssistant(question: string): Promise<string> {
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