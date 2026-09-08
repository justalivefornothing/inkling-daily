/**
 * Deterministic daily puzzle selection with no network and no schedule file.
 *
 * Every calendar day (in the player's local time zone) maps to one index into
 * the answer list:  index = (daysSinceEpoch * 2654435761) mod listLength.
 * 2654435761 is the 32-bit golden-ratio multiplier (Knuth), which scatters
 * consecutive days across the list instead of walking it alphabetically.
 */

/** Fixed epoch: 1 January 2026, local time. Puzzle No. 1. */
export const EPOCH = { year: 2026, month: 0, day: 1 } as const

const GOLDEN = 2654435761
const MS_PER_DAY = 86_400_000

/** Local calendar day as a UTC day-number, so DST changes cannot skew the count. */
function localDayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY)
}

export function daysSinceEpoch(date: Date): number {
  const epoch = Math.floor(Date.UTC(EPOCH.year, EPOCH.month, EPOCH.day) / MS_PER_DAY)
  return localDayNumber(date) - epoch
}

/** 1-based puzzle number shown in the masthead: "No. 251". */
export const puzzleNumber = (date: Date): number => daysSinceEpoch(date) + 1

export function dailyIndex(date: Date, listLength: number): number {
  if (!Number.isInteger(listLength) || listLength <= 0) {
    throw new Error('dailyIndex: listLength must be a positive integer')
  }
  const days = daysSinceEpoch(date)
  // days * GOLDEN stays far inside Number.MAX_SAFE_INTEGER for any real date.
  const product = days * GOLDEN
  return ((product % listLength) + listLength) % listLength
}

/** Milliseconds until the next local midnight, for the "next puzzle" countdown. */
export function msUntilTomorrow(now: Date): number {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  return next.getTime() - now.getTime()
}
