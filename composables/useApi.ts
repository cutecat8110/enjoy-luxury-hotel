import addressAPI from '../api/address.ts'
import homeAPI from '../api/home.ts'
import userAPI from '../api/user.ts'
import verifyAPI from '../api/verify.ts'

export default function () {
  return {
    ...addressAPI,
    ...userAPI,
    ...verifyAPI,
    ...homeAPI
  }
}
