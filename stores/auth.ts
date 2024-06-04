export const useAuthStore = defineStore(
  'auth',
  () => {
    const userName = ref('')
    const token = ref('')
    const email = ref('')

    return {
      userName,
      token,
      email
    }
  },
  {
    persist: {
      storage: persistedState.localStorage
    }
  }
)
