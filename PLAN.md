# Inkling — plan

A daily five-letter word-guess game with correct duplicate-letter scoring, a
keyboard heatmap, and a hard mode. Newsprint editorial look: cream paper,
near-black ink, serif display masthead, letterpress tiles.

## Goal

Ship a small, polished, fully offline word game where the on-screen keyboard
is the star: after every guess each key "heats up" from paper through a warm
ochre to ink-black depending on how often it has come back green/yellow, so by
the fourth guess the keyboard layout itself is telling you where to look.

## Features (all required)

1. Deterministic daily answer derived from the local date (no network), plus
   unlimited practice mode with random answers.
2. Duplicate-letter-correct scoring (two-pass exact-then-present).
3. Six guesses, tile flip animation, bundled ~2300-word answer list and
   ~10k valid-guess list.
4. Keyboard heatmap: keys coloured by cumulative feedback across the current
   game.
5. Hard mode: every revealed green must stay in place, every yellow must be
   reused.
6. Stats panel in localStorage: streak, guess distribution histogram, win rate.
7. Copyable emoji-grid result with no spoilers.

## Architecture

```
src/
  game/
    score.ts        two-pass scorer (exact pass, then present pass with counts)
    daily.ts        days-since-epoch -> (days * 2654435761) mod listLength
    hardMode.ts     validator: greens fixed, yellows (by count) must reappear
    heatmap.ts      per-key tallies -> heat in [0,1] -> paper/ochre/ink colour
    stats.ts        pure stats reducer + localStorage load/save
    share.ts        emoji grid builder (no letters leak)
    words.ts        answers/guesses as packed strings + lookup Set
    *.test.ts       vitest, node environment
  ui/
    App.tsx         layout + game state machine (useReducer) + key handling
    Board.tsx       6x5 letterpress tiles with staggered flip
    Keyboard.tsx    QWERTY keyboard, heat colours from heatmap.ts
    Masthead.tsx    newspaper title, small-caps date, puzzle number
    StatsModal.tsx  streak, histogram, win rate, share button
    Toast.tsx       live-region messages
  index.css        paper texture, ink palette, tile/keyboard animations
```

State is a small reducer: `{ mode, answer, guesses, current, status, hardMode }`.
Daily progress is persisted under `inkling:daily:<puzzleNo>` so a reload keeps
the board; practice games are not persisted and do not count toward stats.

## Milestones

1. Plan, license, gitignore — `chore: project plan and license`
2. Vite + React + TS + Tailwind scaffold — `chore: scaffold vite-react`
3. Core: scorer, daily index, hard mode, word lists + tests — `feat: core scoring, daily index and hard mode`
4. Board, keyboard heatmap, game loop — `feat: board, keyboard heatmap and game loop`
5. Hard mode toggle, practice mode, persistence — `feat: hard mode, practice mode and persistence`
6. Stats panel and shareable emoji grid — `feat: stats panel and share grid`
7. Build + headless smoke + screenshot fixes — `fix: ...`
8. README — `docs: readme`
