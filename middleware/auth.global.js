export default defineNuxtRouteMiddleware(async (to, from) => {
  /* 全局屬性 */
  const authStore = useAuthStore()

  /* api */
  const { getUserApi } = useApi()
  // api: token 自動登入
  if (authStore.user == null && authStore.token) {
    const { data, error } = await getUserApi()
    if (error.value) {
      token.value = undefined
    } else {
      authStore.user = data.value.result
    }
  }
})
