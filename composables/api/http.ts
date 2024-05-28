import { useAuthStore } from '@/stores/auth'
import type { UseFetchOptions } from 'nuxt/app'
import type { FetchResponse } from 'ofetch'

interface ResOptions<T> {
  data: T
  code: number
  success: boolean
  message?: string
  detail?: string
}

const handleError = <T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) => {
  const err = (text: string) => {
    console.log(response?._data?.message ?? text)
  }
  if (!response._data) {
    err('請求超時，服務器無回應！')
    return
  }

  const handleMap: { [key: number]: () => void } = {
    404: () => err('服務器資源不存在'),
    500: () => err('服務器內部錯誤'),
    403: () => err('沒有權限訪問該資源'),
    401: () => {
      err('登錄狀態已過期，請重新登錄')
    }
  }

  handleMap[response.status] ? handleMap[response.status]() : err('未知錯誤！')
}

const fetch = <T = any>(url: string, options: UseFetchOptions<T>) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase } = runtimeConfig.public
  const reqUrl = url.startsWith('/api') ? apiBase + url : url

  const fetch = useFetch(reqUrl, {
    onRequest({ options }) {
      /* 檢查是否已登入 */
      const authStore = useAuthStore()
      if (!authStore.token) return
      /* 已登入 API 帶 token */
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', authStore.token)
    },
    onResponseError({ response }) {
      handleError<T>(response)
    },
    ...options
  })
  return fetch
}

export default class Http {
  static get<T = any>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'get', ...options })
  }

  static post<T = any>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'post', ...options })
  }

  static put<T = any>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'put', ...options })
  }

  static delete<T = any>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'delete', ...options })
  }
}
