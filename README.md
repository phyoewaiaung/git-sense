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

## Usage

Run the commit generator:

```bash
# 1. Stage your changes
git add .

# 2. Let AI write your commit
gs commit
```

*Note: You can run `gs` alone to see available commands and a brief introduction.*

### Options

```bash
# Generate commit message without Gitmoji icons
gs commit --no-icon
```

## Features

- 🤖 **Multi-Model Intelligence**: Powered by Llama 3.1 and GPT-4o mini via resilient failover providers.
- 🎨 **Gitmoji Support**: Makes your commit history readable and beautiful.
- 🔒 **Privacy Focused**: Only your staged diff is sent to the AI to generate the message.
- ⚙️ **Advanced Options**: Want to use your own Groq or OpenAI key? Just set `AI_API_KEY` in your environment.

## Support

If you have feedback or need a custom implementation, feel free to reach out:
✉️ **phyowaiaung.pxyo@gmail.com**

## License

MIT
