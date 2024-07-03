<template>
  <header
    v-show="commonStore.isClient"
    ref="pageHeaderRefs"
    :class="[bgBlack && ' bg-system-background', 'transition-colors duration-300']"
  >
    <div class="container flex items-center justify-between py-4 xl:max-w-full xl:px-20 xl:py-6">
      <!-- 連結: 首頁 -->
      <NuxtLink to="/">
        <PageLogo
          class="shrink-0 transition-colors hover:text-system-primary-100"
          :size="svgSize"
          white
        />
      </NuxtLink>

      <!-- Mobile: 選單按鈕 -->
      <button
        v-if="commonStore.isMobile"
        class="flex h-10 w-10 items-center justify-center text-icon-24 text-white transition-colors hover:text-system-primary-100"
        type="button"
        @click="toggleModal('show')"
      >
        <Icon name="ic:round-menu"></Icon>
      </button>

      <!-- Desktop: 導航列 -->
      <nav v-else class="flex items-center gap-4">
        <NuxtLink to="/rooms">
          <UIButton text="客房旅宿" variant="ghost" />
        </NuxtLink>

        <ClientOnly>
          <Transition name="dropdown" mode="out-in">
            <UIDropdown v-if="authStore.userName && authStore.token" v-model="userDropdown">
              <UIButton
                class="flex-row-reverse"
                :text="authStore.userName"
                icon="ic:outline-account-circle"
                variant="ghost"
              />
              <template #item>
                <NuxtLink to="/user" @click="userDropdown = false">
                  <UIButton block text="我的帳戶" variant="dropdown" />
                </NuxtLink>

                <UIButton block text="登出" variant="dropdown" @click="logout" />
              </template>
            </UIDropdown>

            <NuxtLink v-else to="/auth/login">
              <UIButton text="會員登入" variant="ghost" />
            </NuxtLink>
          </Transition>
        </ClientOnly>

        <UIButton text="立即訂房" />
      </nav>
    </div>

    <!-- Mobile: 選單彈窗 -->
    <UIModal v-model="isModalShow" black fullscreen>
      <div
        v-if="isModalShow"
        class="relative flex h-screen flex-col items-stretch justify-center px-5"
      >
        <button
          class="absolute right-5 top-5 flex h-16 w-16 items-center justify-center text-icon-48 text-white transition-colors hover:text-system-primary-100"
          type="button"
          @click="toggleModal('close')"
        >
          <Icon name="ic:baseline-close" />
        </button>
        <nav class="space-y-10">
          <NuxtLink class="block" to="/rooms" @click="toggleModal('close')">
            <UIButton block text="客房旅宿" variant="ghost" />
          </NuxtLink>
          <NuxtLink
            v-if="authStore.userName && authStore.token"
            class="block"
            to="/user"
            @click="toggleModal('close')"
          >
            <UIButton block text="我的帳戶" variant="ghost" />
          </NuxtLink>
          <NuxtLink v-else class="block" to="/auth/login" @click="toggleModal('close')">
            <UIButton block text="會員登入" variant="ghost" />
          </NuxtLink>
          <NuxtLink class="block" to="/rooms" @click="toggleModal('close')">
            <UIButton block text="立即訂房" />
          </NuxtLink>
          <UIButton
            v-if="authStore.userName && authStore.token"
            block
            text="登出"
            variant="ghost"
            @click="logout"
          />
        </nav>
      </div>
    </UIModal>
  </header>
</template>

<script lang="ts" setup>
/* 全局屬性 */
const commonStore = useCommonStore()
const authStore = useAuthStore()
const route = useRoute()

/* 計算 Logo 尺寸 */
const svgSize = computed(() => ({
  height: commonStore.isMobile ? 40 : 72,
  width: commonStore.isMobile ? 109.76 : 196
}))

/* 彈窗開關 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}

/* 滾動黑底 */
const { height } = useWindowSize()
const { y } = useWindowScroll()
const bgBlack = ref(false)
onMounted(() => {
  watch(y, () => {
    bgBlack.value = height.value / 4 < y.value
  })
})

/* 用戶下拉 */
const userDropdown = ref(false)

// 登出
const logout = async () => {
  userDropdown.value = false
  authStore.token = ''
  authStore.userName = ''
  if (useAuth.includes(route.name as string)) {
    toggleModal('close')
    await navigateTo('/')
  }
}
</script>
