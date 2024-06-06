import type { UseFetchOptions } from 'nuxt/app'

const homeAPI = {
  getNewsApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/api/v1/home/news', options)
  },
  getNewApi: <T = any>(id: string, options: UseFetchOptions<T>) => {
    return useHttp.get(`/api/v1/home/news/${id}`, options)
  }
}

export default homeAPI
