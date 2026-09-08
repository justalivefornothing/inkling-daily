import { describe, expect, it } from 'vitest'
import { dailyIndex, daysSinceEpoch, msUntilTomorrow, puzzleNumber } from './daily.ts'

const N = 2315

describe('dailyIndex', () => {
  it('is stable for the whole local day and changes at midnight', () => {
    const morning = dailyIndex(new Date('2026-09-07'), N)
    const night = dailyIndex(new Date('2026-09-07T23:59:00'), N)
    const tomorrow = dailyIndex(new Date('2026-09-08'), N)
    expect(morning).toBe(night)
    expect(morning).not.toBe(tomorrow)
  })

  it('follows (days * 2654435761) mod listLength', () => {
    const d = new Date(2026, 8, 7) // local 7 Sep 2026
    const days = daysSinceEpoch(d)
    expect(days).toBe(249) // Jan(31)+Feb(28)+Mar(31)+Apr(30)+May(31)+Jun(30)+Jul(31)+Aug(31)+6
    expect(dailyIndex(d, N)).toBe((249 * 2654435761) % N)
  })

  it('always lands inside the list, including before the epoch', () => {
    for (const iso of ['2025-12-31', '2026-01-01', '2030-06-15', '2099-12-31']) {
      const i = dailyIndex(new Date(iso), N)
      expect(i).toBeGreaterThanOrEqual(0)
      expect(i).toBeLessThan(N)
      expect(Number.isInteger(i)).toBe(true)
    }
  })

  it('scatters consecutive days rather than walking the list', () => {
    const a = dailyIndex(new Date(2026, 8, 7), N)
    const b = dailyIndex(new Date(2026, 8, 8), N)
    expect(Math.abs(a - b)).toBeGreaterThan(1)
  })

  it('numbers puzzles from 1 at the epoch', () => {
    expect(puzzleNumber(new Date(2026, 0, 1))).toBe(1)
    expect(puzzleNumber(new Date(2026, 8, 7))).toBe(250)
  })

  it('rejects a non-positive list length', () => {
    expect(() => dailyIndex(new Date(), 0)).toThrow()
  })

  it('counts down to the next local midnight', () => {
    const ms = msUntilTomorrow(new Date(2026, 8, 7, 23, 0, 0))
    expect(ms).toBe(60 * 60 * 1000)
  })
})
