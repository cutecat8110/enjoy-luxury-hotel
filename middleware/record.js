export default defineNuxtRouteMiddleware((_, from) => {
  /* 全局屬性 */
  const commonStore = useCommonStore()

  /* 前往: 登入．註冊 */
  // 紀錄進入頁面
  const leaveAuth = ['auth-login', 'auth-signup']
  if (from.name && !leaveAuth.includes(from.name) && !commonStore.routerGuide) {
    commonStore.routerGuide = from.fullPath
  }
})
