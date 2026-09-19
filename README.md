# Inkling Daily

Daily five-letter word-guess game with correct duplicate-letter scoring, a keyboard heatmap, and hard mode.

Newsprint editorial look: cream paper, near-black ink, serif masthead, letterpress tiles.

## Features

- Deterministic daily answer from the local date (no network) + unlimited practice mode
- Two-pass scoring (exact then present) so duplicate letters are handled correctly
- Six guesses, tile flip animation, bundled answer + valid-guess lists
- Keyboard heatmap that heats from paper → ochre → ink based on cumulative feedback
- Hard mode: greens stay fixed, yellows must be reused
- Stats in localStorage (streak, distribution, win rate)
- Copyable emoji-grid result with no spoilers

## Run

```bash
npm install
npm run dev
npm test
```

## License

MIT
