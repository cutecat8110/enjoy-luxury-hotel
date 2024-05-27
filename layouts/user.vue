<template>
  <div id="default-layout">
    <PageHeader />
    <div class="relative flex h-[17rem] xl:h-[24rem]">
      <!-- 背景 -->
      <NuxtImg class="h-full w-full object-cover" src="/img/desktop/hero.png" />

      <div class="absolute inset-0 flex items-center">
        <div class="container flex flex-wrap items-center gap-4 px-5 xl:gap-6 xl:px-3">
          <NuxtImg
            class="h-[4.5rem] w-[4.5rem] rounded-full object-cover xl:h-[9rem] xl:w-[9rem]"
            src="/img/desktop/user1.png"
          />
          <p class="text-h3 text-white xl:text-h1">
            {{ `Hello，${authStore.user.name}` }}
          </p>
        </div>
      </div>
    </div>

    <main class="container space-y-10 py-10 xl:space-y-20 xl:pb-[7.5rem] xl:pt-20">
      <nav>
        <NuxtLink v-slot="{ isActive }" to="/user">
          <UISectionTab :active="isActive" text="個人資料" />
        </NuxtLink>

        <NuxtLink v-slot="{ isActive }" to="/user/orders">
          <UISectionTab :active="isActive" text="我的訂單" />
        </NuxtLink>
      </nav>

      <slot />
    </main>

    <CWave />

    <PageFooter />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
#default-layout {
  @apply relative flex min-h-screen flex-col;

  > header {
    @apply sticky top-0 z-30 w-full bg-system-background;
  }

  > main {
    @apply flex-1;
  }
}
</style>
