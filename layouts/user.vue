<template>
  <div id="default-layout">
    <PageHeader />
    <div class="relative flex h-[17rem] xl:h-[24rem]">
      <NuxtImg class="flex-1 object-cover" src="/img/desktop/hero.png" />
    </div>

    <main>
      <slot />
    </main>

    <CWave />

    <PageFooter />
  </div>
</template>

<script lang="ts" setup></script>

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
