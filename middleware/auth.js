export default defineNuxtRouteMiddleware(async (to) => {
  /* 全局屬性 */
  const authStore = useAuthStore()
  const styleStore = useStyleStore()
  const commonStore = useCommonStore()

  /* api */
  const { checkLoginApi } = useApi()
  // 前往: 需要登入的頁面

  // 無 token
  await import.meta.client
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
    commonStore.sweetalertList.push({
      title: '您的驗證已過期',
      text: '請重新登入',
      icon: 'warning',
      confirmButtonText: '確認',
      confirmButtonColor: styleStore.confirmButtonColor
    })
    commonStore.routerGuide = to.fullPath
    return navigateTo('/auth/login')
  }
})
