export default defineNuxtRouteMiddleware(async (to) => {
  /* 全局屬性 */
  const authStore = useAuthStore()
  const styleStore = useStyleStore()
  const commonStore = useCommonStore()

  /* api */
  const { checkLoginApi } = useApi()
  // 前往: 需要登入的頁面

  // 無 token
  if (import.meta.client) {
    if (!authStore.token) {
      commonStore.sweetalertList.push({
        title: '請先登入',
        icon: 'warning',
        confirmButtonText: '確認',
        confirmButtonColor: styleStore.confirmButtonColor
      })

      commonStore.routerGuide = to.fullPath
      return navigateTo('/auth/login')
    }

    // 檢查是否成功登入
    try {
      await checkLoginApi()
    } catch (error) {
      const expired = error?.statusCode === 401 || error?.response?.status === 401
      if (expired) {
        authStore.token = ''
        authStore.userName = ''
        authStore.id = ''
        useOrderStore().resetOrder()
      }
      commonStore.sweetalertList.push({
        title: expired ? '您的驗證已過期' : '暫時無法連線',
        text: expired ? '請重新登入' : '服務可能正在啟動，請稍後再試。',
        icon: 'warning',
        confirmButtonText: '確認',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      commonStore.routerGuide = to.fullPath
      return navigateTo('/auth/login')
    }
  }
})
