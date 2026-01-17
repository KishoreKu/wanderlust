# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React app, with `pages/` for route-level views, `components/` for shared UI, `utils/` for helpers, and `content/` for markdown articles.
- `public/` hosts static assets (images, robots/sitemap, HTML snippets).
- `docs/` holds internal documentation and deployment notes.
- Build output is generated into `dist/`.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server at `http://localhost:5173`.
- `npm run build`: build a production bundle into `dist/`.
- `npm run preview`: locally preview the production build.
- `npm run lint`: run ESLint on `.js`/`.jsx` sources.

## Coding Style & Naming Conventions
- JavaScript/React with ES modules and JSX; follow the existing 2-space indentation and semicolon usage.
- Components and pages use `PascalCase` filenames (e.g., `src/pages/BlogPost.jsx`).
- Keep Tailwind utility classes in JSX and global styles in `src/index.css`.
- Linting is configured via `eslint.config.js` with React Hooks and React Refresh rules.
- React Router uses v7 future flags (`v7_startTransition`, `v7_relativeSplatPath`) in app and tests.

## Testing Guidelines
- Tests use Vitest with Testing Library.
- Run `npm run test` for watch mode or `npm run test:run` for CI-style runs.
- Place tests alongside components/pages using `*.test.jsx` (example: `src/components/Navbar.test.jsx`).

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits (examples from history: `feat: ...`, `fix: ...`).
- PRs should include a concise summary, steps to verify, and screenshots for UI changes.
- Link related issues or docs when applicable.

## Configuration & Content Tips
- Affiliate settings live in `src/config/affiliate.js`; keep tokens out of source control and prefer environment variables when expanding configuration.
- Add or update blog content in `src/content/` (markdown files) and corresponding page data in `src/pages/Blog.jsx` when needed.
