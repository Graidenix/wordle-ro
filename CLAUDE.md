# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Romanian-language Wordle clone. React 19 + TypeScript, SCSS, built with Vite. No tests.

## Commands

- `pnpm install` — install deps (pnpm 12.9.1). `pnpm-workspace.yaml` denies the `@parcel/watcher` build script (prebuilt binaries suffice).
- `pnpm dev` — Vite dev server at http://localhost:5173
- `pnpm build` — typecheck (`tsc`) then production build to `dist/`
- `pnpm preview` — serve the `dist/` build
- `pnpm typecheck` — `tsc` only
- `pnpm lint` — ESLint flat config (`eslint.config.js`)
- TypeScript is pinned to 6.x on purpose: typescript-eslint doesn't support TS 7 yet. Upgrade once it does.

## Architecture

- `src/utils/gameReducer.ts` — all game rules as a pure reducer (`GameState` / `GameAction` in `src/types/game.ts`). `NEW_GAME` takes the answer in its payload so the reducer stays pure; `gameId` increments per game and is used as the `Board` key to remount it.
- `src/contexts/GameContext.tsx` — `useReducer` provider with separate state and dispatch contexts; read via `useGameState()` / `useGameDispatch()`.
- `src/utils/evaluateGuess.ts` — scoring, including repeated letters (a letter is `present` only as many times as it is still unmatched in the answer). `getKeyStatuses` and `buildBoardRows` derive keyboard colors and board rows from it.
- `src/contexts/StatsContext.tsx` — player stats (played, wins, streaks, guess distribution) persisted to `localStorage` under `wordle-ro:stats` (`utils/statsStorage.ts` validates on load and falls back to empty stats). `hooks/useRecordGameResult.ts` records each finished game once, guarded by `gameId`.
- `src/utils/keyToAction.ts` — maps a key name to an action; shared by the on-screen keyboard and `hooks/usePhysicalKeyboard.ts`.
- `src/data/words.ts` — `WORDS`: uppercase 5-letter Romanian words **without diacritics** (keyboard is A–Z only). Guesses must exist in this list, and answers are drawn from it, so only add common words. Additions were checked against DEXonline's base-form list (dexonline.ro/scrabble). UI text does use diacritics.
- `src/utils/constants.ts` — `WORD_LENGTH`, `MAX_ATTEMPTS` (6), keyboard layout, Romanian messages.

## Styling and animation

- `src/styles/main.scss` pulls in partials; colors are CSS custom properties in `_tokens.scss` with a dark theme (system preference, or `data-theme` on `<html>`).
- Tiles and keys are styled by `data-state` (`empty` | `filled` | `correct` | `present` | `absent`).
- Timings are coupled across files: board flip (`_board.scss`, 0.6s + 0.25s stagger ≈ 1.6s), keyboard color delay (`$reveal-delay` 1.5s in `_keyboard.scss`), and result modal delay (`$result-delay` 1.8s in `_overlays.scss`). Change them together.
- The shake on an invalid guess is replayed by changing the current row's React key (`invalidSubmits` in the row id), not by toggling a class.

## Icons and assets

- UI icons come from `@phosphor-icons/react`; use the `*Icon` exports (e.g. `ChartBarIcon`). The names without the suffix are deprecated. No emojis in the UI.
- `public/` holds the favicon (`favicon.svg`, `favicon-32.png`), PWA icons (`manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png`) and `og-image.png` (1200×630). The PNGs were rendered once with headless Chrome; there's no generator script in the repo.
- Production URL is `https://wordle.odajiu.eu`; the canonical and OG/Twitter tags in `index.html` hardcode it.

## Code conventions

- Components: one per file, `const X: React.FC<Props> = (props) => { const { ... } = props; ... }`, `export default X;` on the last line.
- Pure helpers go in `src/utils/`, hooks in `src/hooks/`, contexts in `src/contexts/`. No external state libraries.
- JSX stays free of logic other than ternaries, `&&`/`||` and `.map()`; derive values above `return`.
- No `any`, no `as` casts, no `for...of`, no chained ternaries.
