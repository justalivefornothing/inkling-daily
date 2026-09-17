# Inkling Daily

A daily five-letter word-guess game with correct duplicate-letter scoring, a keyboard heatmap, and hard mode.

Newsprint editorial look: cream paper, near-black ink, serif masthead, letterpress tiles.

## Features

- Deterministic daily answer from the local date (no network) + unlimited practice mode
- Two-pass scoring (exact then present) so duplicate letters are handled correctly
- Six guesses, tile flip animation, bundled answer + valid-guess lists
- Keyboard heatmap that heats up from paper → ochre → ink based on cumulative feedback
- Hard mode: greens stay fixed, yellows must be reused
- Stats in localStorage (streak, distribution, win rate)
- Copyable emoji-grid result with no spoilers

## Why the keyboard is the star

After a few guesses the keys themselves start telling you where to look. That’s the whole point of the heatmap — not decoration, information.

## Status

See `PLAN.md` for architecture and milestones. Core scoring + UI scaffolding are in place.

## License

MIT
