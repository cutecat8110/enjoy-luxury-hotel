export const useCommonStore = defineStore('common', () => {
  const isMobile = ref(true)
  const isClient = ref(false)

  return {
    isMobile,
    isClient
  }
})
