# Generative AI app built with Langgraph.js, Next.js and Vercel AI SDK

This is a simple app that demonstrates how to build a generative AI app with Langgraph.js, Next.js and Vercel AI SDK with streaming support.

> **Please leave a ⭐️ if you like the project!**

## Features

### Chat completions with streaming and history

[Try out](https://ai-next-langgraph.vercel.app/stream-text) the chat completions with history where the response is **streamed** to the UI

<!-- <img src="./static/chat.gif" alt="Chat completions with history" height="400" /> -->

### Chat generation without streaming

[Try out](https://ai-next-langgraph.vercel.app/generate-text) the simple chat generation demo where the response is **generated** all at once

<!-- <img src="./static/completion.gif" alt="Simple chat completions" height="400" /> -->

## How to run locally

1. Copy the `.env.example` file to `.env` and set the environment variables.

```bash
cp .env.example .env
```

2. Install the dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

## Future work

- [x] Add simple chat generation with history
- [x] Add chat completions with history
- [ ] Add tool calling
- [ ] Add Generative UI with tool calling
