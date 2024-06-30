export default defineNuxtRouteMiddleware((to) => {
  /* 全局屬性 */
  const commonStore = useCommonStore()

  /* 前往: 登入．註冊 */
  // 紀錄進入頁面
  const leaveAuth = ['auth-login', 'auth-signup']

  /* 離開: 登入．註冊 */
  // 清空返回原頁導航
  if (commonStore.routerGuide && !leaveAuth.includes(to.name)) {
    commonStore.routerGuide = ''
  }
})
