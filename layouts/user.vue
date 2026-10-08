<template>
  <div id="default-layout">
    <PageHeader />
    <div class="relative flex h-[17rem] xl:h-[24rem]">
      <!-- 背景圖片 -->
      <CImage
        class="h-full w-full object-cover"
        src="imgur/9Ae9QeE.png"
        sizes="100vw"
        loading="eager"
      />

      <div class="absolute inset-0 flex items-center">
        <div class="container flex flex-wrap items-center gap-4 px-5 xl:gap-6 xl:px-3">
          <CImage
            class="h-[4.5rem] w-[4.5rem] rounded-full object-cover xl:h-[9rem] xl:w-[9rem]"
            src="imgur/darOkIL.png"
            sizes="(min-width: 1200px) 144px, 72px"
            loading="eager"
          />
          <ClientOnly>
            <p
              class="line-clamp-2 min-w-0 flex-1 text-h3 text-white [overflow-wrap:anywhere] xl:text-h1"
              :title="`Hello，${authStore.userName}`"
            >
              {{ `Hello，${authStore.userName}` }}
            </p>
          </ClientOnly>
        </div>
      </div>
    </div>

    <main class="section-container container space-y-10 overflow-x-hidden xl:space-y-20 xl:pt-20">
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

    <!-- 條紋裝飾 -->
    <CWave />

    <PageFooter />
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
#default-layout {
  @apply relative flex min-h-screen flex-col;

  > header {
    @apply sticky top-0 z-[25] w-full bg-system-background;
  }

  > main {
    @apply flex-1;
  }
}
</style>
