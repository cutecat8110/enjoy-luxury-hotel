export default defineNuxtRouteMiddleware(async (to, from) => {
  /* 全局屬性 */
  const authStore = useAuthStore()
  const styleStore = useStyleStore()
  const commonStore = useCommonStore()

  /* 前往: 登入．註冊 */
  // 紀錄進入頁面
  const leaveAuth = ['auth-login', 'auth-signup']
  if (from.name && !leaveAuth.includes(from.name) && leaveAuth.includes(to.name)) {
    commonStore.routerGuide = from.fullPath
  }

  /* 離開: 登入．註冊 */
  // 清空返回原頁導航
  if (leaveAuth.includes(from.name) && !leaveAuth.includes(to.name)) {
    commonStore.routerGuide = ''
  }

  /* api */
  const { checkLoginApi } = useApi()

  // 前往: 需要登入的頁面
  if (useAuth.includes(to.name)) {
    // 無 token
    if (!authStore.token) {
      commonStore.sweetalertList.push({
        title: '請先登入',
        icon: 'warning',
        confirmButtonText: '確認',
        confirmButtonColor: styleStore.confirmButtonColor
      })
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

      return navigateTo('/auth/login')
    }
  }
})
