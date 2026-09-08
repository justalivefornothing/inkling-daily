import { describe, expect, it } from 'vitest'
import { ANSWERS, VALID_GUESS_COUNT, dailyAnswer, isValidGuess, randomAnswer } from './words.ts'

describe('word lists', () => {
  it('bundles ~2300 answers and ~13k valid guesses, all five lower-case letters', () => {
    expect(ANSWERS.length).toBe(2315)
    expect(VALID_GUESS_COUNT).toBe(2315 + 10657)
    expect(ANSWERS.every((w) => /^[a-z]{5}$/.test(w))).toBe(true)
    expect(new Set(ANSWERS).size).toBe(ANSWERS.length)
  })

  it('accepts answers and obscure words, rejects junk', () => {
    expect(isValidGuess('CRANE')).toBe(true)
    expect(isValidGuess('aargh')).toBe(true)
    expect(isValidGuess('zzzzz')).toBe(false)
    expect(isValidGuess('cran')).toBe(false)
  })

  it('daily answer is a real answer and stable within the day', () => {
    const a = dailyAnswer(new Date(2026, 8, 7, 8))
    const b = dailyAnswer(new Date(2026, 8, 7, 22))
    expect(a).toBe(b)
    expect(ANSWERS).toContain(a)
  })

  it('random answer uses the supplied generator', () => {
    expect(randomAnswer(() => 0)).toBe(ANSWERS[0])
    expect(randomAnswer(() => 0.999999)).toBe(ANSWERS[ANSWERS.length - 1])
  })
})
