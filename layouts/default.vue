<template>
  <div class="layout">
    <PageHeader class="fixed top-0 z-30 w-full" />

    <slot />

    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  @apply relative flex min-h-screen flex-col;

  > * {
    @apply overflow-x-hidden;
  }

  > main {
    @apply flex-1;
  }
}
</style>
