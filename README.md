# gitsense-cli 🚀

AI-powered Git commit message generator. Automatically analyze your staged changes and generate meaningful, conventional commit messages with Gitmojis.

## Features

- 🤖 **AI-Powered**: Uses Llama 3.1 and GPT-4o models.
- ✨ **Conventional Commits**: Generates messages following standard conventions.
- 🎨 **Gitmojis**: Adds appropriate emojis to your commit messages.
- 🛠️ **Zero Config**: Works out of the box with shared free providers.
- 🔒 **Customizable**: Use your own API keys (Groq, OpenAI, etc.) via environment variables.

## Installation

```bash
npm install -g gitsense-cli
```

## Usage

1. Stage your changes:
   ```bash
   git add .
   ```

2. Run gitsense:
   ```bash
   gs commit
   ```

## Configuration (Optional)

If you want to use your own API key to avoid shared rate limits, create a `.env` file or set environment variables:

```env
AI_API_KEY=your_key_here
AI_BASE_URL=https://api.groq.com/openai/v1 # Optional
AI_MODEL=llama-3.1-8b-instant # Optional
```

## Support

If you encounter any issues or need assistance, feel free to contact:
✉️ **phyowaiaung.pxyo@gmail.com**

## License

MIT
