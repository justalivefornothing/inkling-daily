import type { Feedback } from './score.ts'

export interface ScoredGuess {
  guess: string
  feedback: Feedback[]
}

const ORDINAL = ['1st', '2nd', '3rd', '4th', '5th', '6th']

/**
 * Hard-mode rule: every hint you have been given must be honoured.
 *  - a letter scored 'correct' at position i must be at position i again;
 *  - a letter scored 'present' must appear somewhere in the next guess. We
 *    count them, so if a previous guess showed two yellow Ls the next guess
 *    must contain at least two Ls (greens count toward that total too).
 *
 * Returns a human-readable violation, or null when the guess is allowed.
 */
export function hardModeViolation(history: ScoredGuess[], next: string): string | null {
  const n = next.toLowerCase()

  for (const { guess, feedback } of history) {
    const g = guess.toLowerCase()
    const required = new Map<string, number>()

    for (let i = 0; i < g.length; i++) {
      const fb = feedback[i]
      if (fb === 'correct' && n[i] !== g[i]) {
        return `${ORDINAL[i] ?? `${i + 1}th`} letter must be ${g[i].toUpperCase()}`
      }
      if (fb === 'correct' || fb === 'present') {
        required.set(g[i], (required.get(g[i]) ?? 0) + 1)
      }
    }

    for (const [letter, count] of required) {
      let have = 0
      for (const ch of n) if (ch === letter) have++
      if (have < count) {
        return count > 1
          ? `Guess must contain ${letter.toUpperCase()} ${count} times`
          : `Guess must contain ${letter.toUpperCase()}`
      }
    }
  }

  return null
}

export const isHardModeValid = (history: ScoredGuess[], next: string): boolean =>
  hardModeViolation(history, next) === null
