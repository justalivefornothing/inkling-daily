export type Feedback = 'correct' | 'present' | 'absent'

export const WORD_LENGTH = 5
export const MAX_GUESSES = 6

/**
 * Two-pass scorer with correct duplicate-letter handling.
 *
 * Pass 1 marks exact matches and consumes one count of that letter from a
 * tally built from the answer. Pass 2 walks the remaining positions and marks
 * a letter 'present' only while its tally is still positive (consuming one),
 * otherwise 'absent'. Doing exact matches first guarantees a green never has
 * its letter "stolen" by an earlier yellow.
 *
 *   score('SPEED', 'ABIDE')  ->  absent absent present absent present
 *   (ABIDE has one E; SPEED's first E is present, the second E is exhausted)
 */
export function score(guess: string, answer: string): Feedback[] {
  const g = guess.toLowerCase()
  const a = answer.toLowerCase()
  if (g.length !== a.length) {
    throw new Error(`score: guess and answer must have equal length (${g.length} vs ${a.length})`)
  }

  const result: Feedback[] = new Array<Feedback>(g.length).fill('absent')
  const remaining = new Map<string, number>()

  for (let i = 0; i < a.length; i++) {
    if (g[i] === a[i]) {
      result[i] = 'correct'
    } else {
      remaining.set(a[i], (remaining.get(a[i]) ?? 0) + 1)
    }
  }

  for (let i = 0; i < g.length; i++) {
    if (result[i] === 'correct') continue
    const left = remaining.get(g[i]) ?? 0
    if (left > 0) {
      result[i] = 'present'
      remaining.set(g[i], left - 1)
    }
  }

  return result
}

export const isWin = (feedback: Feedback[]): boolean => feedback.every((f) => f === 'correct')
