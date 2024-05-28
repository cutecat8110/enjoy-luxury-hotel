import addressAPI from '../api/address.ts'
import userAPI from '../api/user.ts'

export default function () {
  return {
    ...addressAPI,
    ...userAPI
  }
}
