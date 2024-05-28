import type { UseFetchOptions } from 'nuxt/app'
import Http from '~/composables/api/http'

const addressAPI = {
  getTwzipcodeApi: <T = any>(options: UseFetchOptions<T>) => {
    return Http.get('/twzipcode', options)
  }
}

export default addressAPI
