# Chat Implementation (Frontend)

This document explains how the frontend integrates with the Gubbu chat API.

## Overview

The frontend uses a single entry point:
- `src/components/ChatInterface.jsx` (full-screen modal used on the Home page)

Both send chat history to the backend:
- Endpoint: `POST https://api.gubbu.io/chat`
- Payload: `{ "messages": [ { "role": "user|assistant", "content": "..." }, ... ] }`
- Response: `{ "answer": "..." }` (string)

## ChatInterface (Home)

Entry point:
- `src/pages/Home.jsx` toggles the modal and passes `initialQuery`.

Behavior:
- On submit, the input is appended to the message list.
- Full history is sent in the request body.
- The assistant response is rendered as plain text lines.

Key file:
- `src/components/ChatInterface.jsx`

## Voice Features

ChatInterface includes:
- Browser speech recognition (voice input).
- Text-to-speech playback.
- Optional continuous mode (auto listen after speaking).

## Error Handling

Both components:
- Parse JSON response; fall back to plain text if parsing fails.
- Surface errors as assistant messages (e.g., network errors).

## Notes for Backend Alignment

- The backend expects the `messages` array with roles and content.
- Responses should return a JSON object with `answer`.
- Outbound links in chat responses should only use `/go/*` endpoints.

## Local Testing

1) Start the dev server:
   - `npm run dev`
2) Open the home page and submit a question.
3) Verify the network request hits `https://api.gubbu.io/chat`.
