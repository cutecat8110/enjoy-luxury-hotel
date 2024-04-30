<template>
  <footer class="bg-gray-800">
    <div class="container flex h-14 items-center justify-center text-white">
      Copyright © 2024
      <NuxtLink to="/_guideline">guideline</NuxtLink>
      <button class="rounded border px-4 py-2" type="button" @click="changeLanguage">
        {{ $t('language') }}
      </button>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { locale, setLocaleCookie } = useI18n()
const changeLanguage = () => {
  const localeCode = locale.value === 'en' ? 'zh' : 'en'
  locale.value = localeCode
  setLocaleCookie(localeCode)
}
</script>
