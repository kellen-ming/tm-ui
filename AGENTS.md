# TM-UI Agent Guide

This file governs the entire repo unless a deeper directory provides its own AGENTS.md. Also apply `.cursor/skills/vercel-react-best-practices/AGENTS.md` for any React/Next.js or performance-sensitive work.

## Project Snapshot
- Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.
- Package manager: pnpm (single workspace package).
- Path alias: `@/*` -> repo root (tsconfig).
- Default to Server Components in `app/`; add `'use client'` only when needed.

## Commands
- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start (prod): `pnpm start`
- Lint: `pnpm lint`
- Tests: not configured. If you add tests, prefer Vitest/Jest.
- Single-test examples (future):
  - Vitest: `pnpm vitest run path/to/file.test.ts --watch=false`
  - Jest: `pnpm jest path/to/file.test.ts --runInBand`

## Repo Structure
- `app/`: routes (Server Components by default), layouts, route handlers.
- `components/ui/`: primitives; `components/showcase/`: showcase-specific UI.
- `lib/`: shared utilities (fetching, formatting, config, hooks).
- `public/`: static assets; update `next.config` only when required.
- Avoid new barrel exports; import modules directly to keep bundles lean.

## Imports & Order
- Group with blank lines: built-ins -> external packages -> `@/...` -> relative.
- Avoid barrel imports from heavy libs (lucide-react, radix, MUI, lodash, date-fns, react-icons). Import deep paths or use `optimizePackageImports` if enabled.
- Keep import lists minimal; remove unused symbols; prefer named exports for utilities/components.

## Formatting
- Use ESLint config (`eslint.config.mjs`) and Next defaults; run `pnpm lint`.
- Prettier not configured—match existing style (2-space TS/TSX indentation).
- Keep JSX tidy; prefer className over inline styles when possible.
- Stick to ASCII unless the file already uses non-ASCII and it is required.

## Types & Naming
- Components: PascalCase files/components; hooks: camelCase `useX`; utilities: camelCase; types/interfaces: PascalCase.
- Prefer explicit types for public exports. Avoid `any`; use `unknown` + narrowing.
- Favor discriminated unions or literal unions over boolean flags.
- Use enums/const objects instead of magic strings. Export narrow field shapes to clients to reduce RSC payload.

## React/Next Patterns
- Start independent async work early; use `Promise.all` for unrelated tasks. Avoid waterfalls per Vercel guidance.
- Keep props crossing RSC/Client boundaries serializable and minimal; pass only needed fields.
- Use Suspense for parallel loading; avoid blocking layout with upstream awaits.
- Dynamic import heavy or rare client-only components with `next/dynamic` and `ssr: false` when appropriate.
- For data fetch reuse inside a request, use `React.cache`; consider LRU for cross-request caching when needed.
- Defer non-critical third-party libs/analytics until after hydration.
- Hoist static JSX when large; memoize only for hot paths (React Compiler not present).
- Use functional `setState` to avoid stale closures; narrow effect deps to primitives.
- Prefer derived booleans for deps; subscribe to booleans instead of continuous values.
- Avoid inline event listeners that recreate functions unnecessarily; favor stable callbacks.

## Tailwind & Styling
- Tailwind CSS v4 configless utilities; compose with `clsx`/`tailwind-merge` if helpful.
- Place tokens/variables in `app/globals.css`; keep theme toggle compatibility (light/dark).
- Avoid inline styles except when dynamic; keep animations purposeful and minimal.

## Data Fetching & API
- Validate inputs in route handlers; return structured/typed responses.
- Use early returns to skip unnecessary awaits; start auth/config/data fetches concurrently when independent.
- For post-response side effects, prefer `after()` to avoid blocking responses.
- Cache external calls when sensible; guard against repeated storage reads with in-memory caches if hot.

## Error Handling & Logging
- Wrap expected-failure calls in try/catch; bubble unexpected errors to Next boundaries.
- Log actionable context only (no secrets/PII). Prefer structured logs.
- Normalize error shapes for API routes; avoid leaking stack traces to clients.

## Performance Guardrails (from Vercel guide)
- Avoid waterfalls; defer awaits to the branch that needs them.
- Eliminate bundle bloat: no barrel imports from large libraries; dynamic import heavy UI.
- Minimize RSC serialization; pass primitives/needed fields only.
- Share promises across components when possible to dedupe fetches.
- Use `content-visibility: auto` for long lists; animate wrappers (not SVG nodes) for GPU accel.

## State & Re-render Hygiene
- Prefer single source of truth; derive booleans (e.g., `const isMobile = width < 768`).
- Use lazy `useState` initializers for expensive setup (runs once).
- Use transitions for non-urgent updates to keep UI responsive.
- Avoid `&&` rendering when value can be 0/NaN; use explicit ternaries.

## Testing Guidance (future)
- Place tests in `__tests__/` or alongside files as `.test.ts(x)`.
- Keep tests deterministic; mock network/FS; avoid real side effects.
- Document new test commands here when adding a runner.

## Git & Reviews
- Conventional Commits; do not commit secrets or unnecessary lockfile changes.
- Keep diffs focused; avoid drive-by refactors unless requested.
- Respect existing user changes; never reset or amend without explicit instruction.

## Security & Privacy
- Do not log secrets or PII. Use env vars through Next runtime mechanisms.
- Scrub tokens from telemetry; prefer server-side storage for sensitive data.

## Docs & Config
- Update this file and README/DevelopmentPlan when altering workflows or adding major components/features.
- When adding showcase components, update `lib/showcase-config.tsx` and related types in `components/showcase/types/`.

## Cursor/Copilot Rules
- No `.cursorrules` or `.github/copilot-instructions.md` present.
- React performance rules live in `.cursor/skills/vercel-react-best-practices/AGENTS.md`; apply them for React/Next.js or perf work.

## When in Doubt
- Ask for clarification; prefer minimal, reversible changes.
- Keep UX stable (no theme flicker; avoid blocking renders with unnecessary awaits).
- Prioritize parallelism, bundle size discipline, and clear typing.
