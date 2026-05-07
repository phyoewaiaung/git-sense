# gitsense-cli 🚀

**Instant, Lightweight, and Zero-Config AI Commits.**

`gitsense-cli` is a professional Git assistant that traces your project changes and generates meaningful, high-quality commit messages in seconds. No complex setup, no expensive subscriptions—just better commits.

## Why GitSense?

- ⚡ **Instant & Lightweight**: Minimal footprint, maximum speed. Get suggestions in milliseconds.
- 🆓 **Truly Free**: Uses shared AI providers out of the box. No personal API keys required for basic use.
- 🛠️ **Zero Configuration**: Just install and run. No `.env` files or tokens needed to get started.
- 🧠 **Project Aware**: Traces your staged `git diff` to understand the *intent* of your changes, not just the code.
- ✨ **Conventional & Clean**: Automatically applies [Conventional Commits](https://www.conventionalcommits.org/) and [Gitmojis](https://gitmoji.dev/) for a professional repo history.

## Installation

```bash
npm install -g gitsense-cli
```

## Available Commands

### 1. Introduction & Help
See what GitSense can do and view available commands.
```bash
gs
```
Or for technical help:
```bash
gs --help
```

### 2. Generate Commit Message (Default)
The primary command to analyze your staged changes and suggest a commit message.
```bash
# First, stage your changes
git add .

# Then, run the generator
gs commit
```
## Interactive Workflow

When you run `gs commit`, you'll enter an interactive session:
- **✅ y / enter**: Accept the suggestion and create the commit.
- **🔄 r / retry**: Regenerate a new suggestion if you're not satisfied.
- **❌ n / no**: Cancel the operation.

## Configuration (Optional)

If you want to use your own API key to avoid shared rate limits:

```bash
# Set your key via environment variable
export AI_API_KEY=your_key_here
```

Or use a `.env` file:
```env
AI_API_KEY=your_key_here
AI_BASE_URL=https://api.groq.com/openai/v1 # Optional
AI_MODEL=llama-3.1-8b-instant # Optional
```

## Support

If you have feedback or need assistance:
✉️ **phyowaiaung.pxyo@gmail.com**

## License

MIT
