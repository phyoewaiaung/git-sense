import OpenAI from "openai";

export async function generateCommitMessage(diff: string) {
    // Zero-config defaults using keyless API from api.airforce
    // Users can override these with environment variables if they have their own keys
    const apiKey = process.env.AI_API_KEY || "free";
    const baseURL = process.env.AI_BASE_URL || "https://api.airforce/v1";
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    const client = new OpenAI({
        apiKey,
        baseURL,
    });

    try {
        const response = await client.chat.completions.create({
            model,
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
    } catch (error: any) {
        if (error?.status === 401 || error?.status === 429) {
            console.error("\n❌ AI Service Error: The free API has reached its limit.");
            console.error("💡 To fix this, you can set your own API key in a .env file.");
            console.error("   Supported providers: Groq, OpenRouter, OpenAI, etc.");
        } else {
            console.error("\n❌ AI Service Error:", error.message || "Unknown error");
        }
        process.exit(1);
    }
}