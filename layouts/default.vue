<template>
  <div class="default-layout">
    <PageHeader />

    <main>
      <slot />
    </main>

    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  @apply relative flex min-h-screen flex-col;

  > * {
    @apply overflow-x-hidden;
  }

  > header {
    @apply fixed top-0 z-30 w-full;
  }

  > main {
    @apply flex-1;
  }
}
</style>
