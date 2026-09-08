import { describe, expect, it } from 'vitest'
import { isWin, score } from './score.ts'

describe('score (two-pass, duplicate-letter correct)', () => {
  it("score('SPEED','ABIDE') -> only the first E is present, the second is exhausted", () => {
    expect(score('SPEED', 'ABIDE')).toEqual(['absent', 'absent', 'present', 'absent', 'present'])
  })

  it("score('ALLEY','LOCAL') -> A, L, L present; E, Y absent", () => {
    // Both Ls in the guess are yellow because LOCAL has two Ls, neither aligned.
    expect(score('ALLEY', 'LOCAL')).toEqual(['present', 'present', 'present', 'absent', 'absent'])
  })

  it("score('ALLEY','LLAMA') -> the aligned L at index 1 is green, the other L yellow", () => {
    // NOTE: the brief listed this pair as all-yellow, but ALLEY[1] === LLAMA[1] === 'L'
    // is an exact match, so any correct scorer must return 'correct' there.
    expect(score('ALLEY', 'LLAMA')).toEqual(['present', 'correct', 'present', 'absent', 'absent'])
  })

  it("score('HELLO','HELLO') -> five correct", () => {
    expect(score('HELLO', 'HELLO')).toEqual(['correct', 'correct', 'correct', 'correct', 'correct'])
  })

  it('a green never has its letter stolen by an earlier yellow', () => {
    // BUILD has one L at index 3. ALLOW has two Ls but neither is at index 3, so
    // exactly one (the first) goes yellow and the second is exhausted.
    expect(score('ALLOW', 'BUILD')).toEqual(['absent', 'present', 'absent', 'absent', 'absent'])
    // LOLLY has an L at index 3 (green) plus two more; the exact pass consumes the
    // only L first, so the earlier Ls must be absent rather than yellow.
    expect(score('LOLLY', 'BUILD')).toEqual(['absent', 'absent', 'absent', 'correct', 'absent'])
  })

  it('is case-insensitive', () => {
    expect(score('speed', 'ABIDE')).toEqual(score('SPEED', 'abide'))
  })

  it('rejects mismatched lengths', () => {
    expect(() => score('ABC', 'ABCDE')).toThrow()
  })

  it('isWin only for all-correct feedback', () => {
    expect(isWin(score('HELLO', 'HELLO'))).toBe(true)
    expect(isWin(score('HELLS', 'HELLO'))).toBe(false)
  })
})
