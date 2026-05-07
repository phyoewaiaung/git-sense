import OpenAI from "openai";

export async function generateCommitMessage(diff: string) {
    // We try multiple providers and models to ensure a "zero-config" experience
    const providers = [
        {
            name: "Groq (Shared)",
            baseURL: "https://api.groq.com/openai/v1",
            apiKey: "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",
            models: ["llama-3.1-8b-instant", "llama3-8b-8192"]
        },
        {
            name: "Airforce (Keyless)",
            baseURL: "https://api.airforce/v1",
            apiKey: "sk-air-wYxKpA7Fx73G94O9Er9cOHtWWtt1AJXqyPcc50f9N5T6d9PXiDt3yDBTkcL9hWWY",
            models: ["gpt-4o-mini", "llama-3.3-70b"]
        }
    ];

    const configuredModel = process.env.AI_MODEL;
    const configuredKey = process.env.AI_API_KEY;
    const configuredBase = process.env.AI_BASE_URL;

    // If user has custom config, prioritize it
    if (configuredKey) {
        const defaultBase = configuredKey.startsWith("gsk_")
            ? "https://api.groq.com/openai/v1"
            : "https://api.openai.com/v1";

        const client = new OpenAI({
            apiKey: configuredKey,
            baseURL: configuredBase || defaultBase,
        });
        try {
            const response = await client.chat.completions.create({
                model: configuredModel || (configuredKey.startsWith("gsk_") ? "llama-3.1-8b-instant" : "gpt-4o-mini"),
                messages: getMessages(diff)
            });
            return response.choices[0]?.message?.content?.trim();
        } catch (e) {
            console.error("❌ Custom AI Config Error:", (e as any).message);
            process.exit(1);
        }
    }

    // Otherwise, loop through providers and their models
    for (const provider of providers) {
        const client = new OpenAI({
            apiKey: provider.apiKey,
            baseURL: provider.baseURL,
        });

        for (const model of provider.models) {
            try {
                const response = await client.chat.completions.create({
                    model,
                    messages: getMessages(diff),
                });

                if (response.choices?.[0]?.message?.content) {
                    return response.choices[0].message.content.trim();
                }
            } catch (error: any) {
                // If 429 (Rate Limit) or 401 (Unauthorized), try next model/provider
                if (error?.status === 429 || error?.status === 401) continue;
                // For other errors, log if in debug mode and try next
                if (process.env.DEBUG) console.error(`[${provider.name}] ${model} failed:`, error.message);
            }
        }
    }

    console.error("\n❌ AI Service Error: All free providers are currently busy or unavailable.");
    console.error("💡 To fix this, you can set your own FREE API key in a .env file.");
    console.error("   1. Get a FREE key from Groq: https://console.groq.com/keys");
    console.error("   2. Add to .env: AI_API_KEY=your_key_here");
    console.error("\n✉️  Need help? Contact: phyowaiaung.pxyo@gmail.com");
    process.exit(1);
}

function getMessages(diff: string): any[] {
    return [
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
    ];
}