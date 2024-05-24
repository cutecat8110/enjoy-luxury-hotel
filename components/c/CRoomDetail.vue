<template>
  <div :class="[border ? 'border border-system-gray-40' : '', 'c-room-detail-wrapper']">
    <ul :class="[auto ? 'auto' : '', 'c-room-detail-container']">
      <li v-for="(detail, index) in details" :key="index">
        <Icon name="ic:baseline-check" />
        {{ detail.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  details: { type: Array as () => { title: string; isProvide: boolean }[], required: true },
  border: Boolean,
  auto: Boolean
})
</script>

<style lang="scss" scoped>
.c-room-detail-wrapper {
  @apply rounded-lg bg-white p-6;
  ul.c-room-detail-container {
    @apply grid gap-x-10 gap-y-2;
    grid-template-columns: repeat(auto-fit, minmax(96px, auto));

    @include xl {
      @apply inline-grid;
      grid-template-columns: repeat(5, auto);
    }

    li {
      @apply flex gap-2 text-nowrap text-sub-title text-system-gray-80 xl:text-title;
    }

    svg {
      @apply text-icon-24 text-system-primary-100;
    }
  }

  ul.c-room-detail-container.auto {
    @apply grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, auto));
  }
}
</style>
