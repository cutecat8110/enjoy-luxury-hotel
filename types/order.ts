import type { UserInfo } from './auth.ts'

export type OrderPayload = {
  roomId: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  userInfo: UserInfo
}
