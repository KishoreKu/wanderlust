# Gubbu AI workspace

The homepage (`/`, also `/app`) is now the universal assistant. The previous travel homepage lives at `/travel`; other travel and blog routes remain available.

## Run locally

1. In `gubbu-api`, configure `OPENAI_API_KEY` or `GOOGLE_API_KEY` using the existing environment setup, then run `npm run dev` (port 3000).
2. In `travel-blog-website`, run `npm run dev` (port 5173). Vite proxies `/api-proxy` to port 3000.
3. Open http://127.0.0.1:5173/.

For production, deploy both repositories together. Set `VITE_API_BASE_URL` at frontend build time to use a different API origin (without a trailing slash). Otherwise the existing Azure API hostname is used. The new `/assistant` endpoint must be deployed before the new UI can answer requests. The travel `/chat` endpoint is unchanged.

## Implemented

- General AI conversation with Ask, Web preparation, Write, and Plan modes.
- Server-side capability classification for compound requests; this is a routing foundation, not external tool execution.
- Local `.txt`, `.md`, and `.csv` attachments up to 50 KB, included in conversation context sent to the configured AI provider.
- Browser speech recognition when supported and permitted.
- Up to 20 conversations saved in browser local storage, with a library and deletion controls. No account or cross-device sync.
- Connection directory with explicit availability and links to existing travel tools.
- Input validation, request timeout, provider error feedback, and retry without duplicate user messages.

## Next integration milestones

Add authenticated users and server-side conversation storage; then a tool registry and live search adapter with citations. Add OAuth for email, calendar, and cloud files with least-privilege scopes. External actions require structured previews, server-enforced approvals, idempotency, and execution records. Commerce, payments, and autonomous background agents are not implemented in this iteration. Before public rollout, add per-user rate limits and spending controls to the existing public AI API.

## Verification

Frontend: `npm run build`, `npm run test:run`, and `npx eslint src/pages/Assistant.jsx src/pages/Assistant.test.jsx src/App.jsx`.
Backend: `node --test tests/assistant.test.js` and `node --check src/server.js`.
Live model output requires configured provider credentials; automated frontend tests use mocked responses.
