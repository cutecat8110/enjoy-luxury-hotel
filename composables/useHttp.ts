import { useAuthStore } from '@/stores/auth'
import type { UseFetchOptions } from 'nuxt/app'

const fetch = <T>(url: string, options: UseFetchOptions<T>) => {
  const {
    public: { apiBase }
  } = useRuntimeConfig()
  const auth = useAuthStore()
  const common = useCommonStore()
  const order = useOrderStore()
  const requestToken = auth.token
  const alert = (text: string) => {
    if (import.meta.client && !common.sweetalertList.some((item) => item.text === text)) {
      common.sweetalertList.push({ title: '操作未完成', text, icon: 'error' })
    }
  }
  const runHooks = async (hooks: any, context: any) => {
    for (const hook of [hooks].flat().filter(Boolean)) await hook(context)
  }
  const { onResponseError, onRequestError, ...rest } = options
  return useFetch(url.startsWith('/api') ? apiBase + url : url, {
    timeout: 90000,
    retry: 0,
    dedupe: 'defer',
    ...rest,
    onRequest({ options }) {
      options.headers = new Headers(options.headers)
      options.headers.set('Content-Type', 'application/json')
      if (auth.token) options.headers.set('Authorization', auth.token)
    },
    async onRequestError(context) {
      alert('目前無法連線，請稍後再試。若剛送出訂房，請先至訂單確認結果，避免重複預訂。')
      await runHooks(onRequestError, context)
    },
    async onResponseError(context) {
      if (context.response.status === 401 && auth.token === requestToken) {
        auth.token = ''
        auth.userName = ''
        auth.id = ''
        order.resetOrder()
      }
      // Keep existing field errors; server/transport failures must also be visible.
      if (!onResponseError || context.response.status >= 500 || context.response.status === 401) {
        alert(
          context.response.status >= 500
            ? '服務暫時無法使用，請稍後再試。'
            : (context.response._data as { message?: string } | undefined)?.message ||
                '操作失敗，請稍後再試。'
        )
      }
      await runHooks(onResponseError, context)
    }
  })
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

export { useHttp }
