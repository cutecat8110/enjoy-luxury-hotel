export const useCommonStore = defineStore('common', () => {
  const test = ref(true)
  const isMobile = ref(true)
  const isClient = ref(false)

  return {
    test,
    isMobile,
    isClient
  }
})
