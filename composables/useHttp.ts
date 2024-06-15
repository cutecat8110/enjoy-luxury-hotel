import { useAuthStore } from '@/stores/auth'
import type { UseFetchOptions } from 'nuxt/app'
import type { FetchResponse } from 'ofetch'

interface ResOptions {
  message: string
  status: boolean
}

const handleError = (response: FetchResponse<ResOptions>) => {
  const showError = (message: string) => {
    console.log('Error Message:', response?._data?.message ?? message)
  }

  if (!response._data) {
    showError('請求超時，服務器無回應！')
    return
  }

  const errorHandlers: Record<number, () => void> = {
    404: () => showError('服務器資源不存在'),
    500: () => showError('服務器內部錯誤'),
    403: () => showError('沒有權限訪問該資源'),
    401: () => showError('登錄狀態已過期，請重新登錄')
  }

  if (errorHandlers[response.status]) {
    errorHandlers[response.status]()
  } else {
    showError('未知錯誤！')
  }
}

const fetch = <T>(url: string, options: UseFetchOptions<T>) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase } = runtimeConfig.public
  const reqUrl = url.startsWith('/api') ? apiBase + url : url

  const fetch = useFetch(reqUrl, {
    onRequest({ options }) {
      /* 檢查是否已登入 */
      const authStore = useAuthStore()
      options.headers = new Headers(options.headers)
      options.headers.set('Content-Type', 'application/json')
      if (!authStore.token) return
      /* 已登入 API 帶 token */
      options.headers.set('Authorization', authStore.token)
    },
    onResponseError({ response }) {
      handleError(response)
    },
    ...options
  })
  return fetch
}

export default class useHttp {
  static get<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'get', ...options })
  }

  static post<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'post', ...options })
  }

  static put<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'put', ...options })
  }

  static delete<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'delete', ...options })
  }
}
