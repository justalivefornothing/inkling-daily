import { describe, expect, it } from 'vitest'
import { hardModeViolation, isHardModeValid, type ScoredGuess } from './hardMode.ts'
import { score } from './score.ts'

const craneWithGreenA: ScoredGuess[] = [
  { guess: 'CRANE', feedback: ['absent', 'absent', 'correct', 'absent', 'absent'] },
]

describe('hard mode validator', () => {
  it('keeps a revealed green in place: CRANE (A green at 2) -> PLANT ok, BLIMP not', () => {
    expect(isHardModeValid(craneWithGreenA, 'PLANT')).toBe(true)
    expect(isHardModeValid(craneWithGreenA, 'BLIMP')).toBe(false)
    expect(hardModeViolation(craneWithGreenA, 'BLIMP')).toBe('3rd letter must be A')
  })

  it('requires every yellow to be reused somewhere', () => {
    const history: ScoredGuess[] = [{ guess: 'CRANE', feedback: score('CRANE', 'ROUTE') }]
    // R is present, E is correct at index 4
    expect(isHardModeValid(history, 'WROTE')).toBe(true)
    expect(hardModeViolation(history, 'WHITE')).toBe('Guess must contain R')
    expect(hardModeViolation(history, 'WRITS')).toBe('5th letter must be E')
  })

  it('counts duplicate yellows', () => {
    const history: ScoredGuess[] = [{ guess: 'ALLEY', feedback: score('ALLEY', 'LOCAL') }]
    expect(hardModeViolation(history, 'LAMPS')).toBe('Guess must contain L 2 times')
    expect(isHardModeValid(history, 'LOCAL')).toBe(true)
    expect(isHardModeValid(history, 'LLAMA')).toBe(true)
  })

  it('checks every prior guess, not just the last one', () => {
    const history: ScoredGuess[] = [
      { guess: 'CRANE', feedback: score('CRANE', 'PLANT') },
      { guess: 'SLANT', feedback: score('SLANT', 'PLANT') },
    ]
    expect(isHardModeValid(history, 'PLANT')).toBe(true)
    expect(isHardModeValid(history, 'GIANT')).toBe(false) // drops the L green from SLANT
  })

  it('accepts anything with no history', () => {
    expect(isHardModeValid([], 'QUERY')).toBe(true)
  })
})
