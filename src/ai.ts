import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function generateCommitMessage(diff: string) {
    const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "system",
                content: `
You generate concise git commit messages.

Rules:
- Use conventional commits
- Maximum 72 characters
- Return ONLY the commit message
- Be specific and professional
`,
            },
            {
                role: "user",
                content: diff,
            },
        ],
    });

    return response.choices[0].message.content?.trim();
}