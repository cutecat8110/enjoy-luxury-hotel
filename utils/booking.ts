import type { OrderPayload } from '../types'
export const emptyOrder = (): OrderPayload => ({
  roomId: '',
  checkInDate: '',
  checkOutDate: '',
  peopleNum: 1,
  userInfo: { name: '', phone: '', email: '', address: { zipcode: 0, detail: '' } }
})
export function calendarDay(value: string): number {
  const match = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:T.*)?$/.exec(value)
  if (!match) return NaN
  const [, year, month, day] = match.map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date.getTime()
    : NaN
}
export function stayNights(start: string, end: string): number {
  const nights = (calendarDay(end) - calendarDay(start)) / 86400000
  return Number.isInteger(nights) && nights > 0 ? nights : 0
}
export function validStay(start: string, end: string, now = new Date()): boolean {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(now)
  return stayNights(start, end) > 0 && calendarDay(start) >= calendarDay(today)
}
