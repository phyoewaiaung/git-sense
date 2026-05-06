import OpenAI from "openai";

export async function generateCommitMessage(diff: string) {
    const client = new OpenAI({
        apiKey: "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",
        baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "system",
                content: `
You generate concise git commit messages.

Rules:
- Use conventional commits
- Add appropriate Gitmoji at the beginning
- Maximum 72 characters
- Return ONLY the commit message

Examples:
✨ feat(auth): add Google OAuth login
🐛 fix(api): handle null response
♻️ refactor(ui): simplify modal logic
📝 docs: update installation guide
✅ test(auth): add login validation tests
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