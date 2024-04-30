<template>
  <div class="flex min-h-screen flex-col">
    <PageHeader class="fixed top-0 z-40 w-full" />
    <main class="flex-1 overflow-x-hidden">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>
