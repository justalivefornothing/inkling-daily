import { PACKED_ANSWERS } from './data/answers.ts'
import { PACKED_GUESSES } from './data/guesses.ts'
import { WORD_LENGTH } from './score.ts'
import { dailyIndex } from './daily.ts'

function unpack(packed: string): string[] {
  const out: string[] = new Array(packed.length / WORD_LENGTH)
  for (let i = 0, j = 0; i < packed.length; i += WORD_LENGTH, j++) {
    out[j] = packed.slice(i, i + WORD_LENGTH)
  }
  return out
}

/** ~2300 common words: the only words that can be an answer. */
export const ANSWERS: readonly string[] = unpack(PACKED_ANSWERS)

/** Everything you are allowed to type: answers plus ~10k obscure-but-real words. */
const VALID = new Set<string>(ANSWERS)
for (const w of unpack(PACKED_GUESSES)) VALID.add(w)

export const VALID_GUESS_COUNT = VALID.size

export const isValidGuess = (word: string): boolean => VALID.has(word.toLowerCase())

export const dailyAnswer = (date: Date): string => ANSWERS[dailyIndex(date, ANSWERS.length)]

export function randomAnswer(rand: () => number = Math.random): string {
  return ANSWERS[Math.floor(rand() * ANSWERS.length) % ANSWERS.length]
}
