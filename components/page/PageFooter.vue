<template>
  <footer class="section-container bg-system-background text-white xl:pb-[7.5rem]">
    <!-- <div class="container flex h-14 items-center justify-center text-white">
      Copyright © 2024
      <NuxtLink to="/_guideline">guideline</NuxtLink>
      <button class="rounded border px-4 py-2" type="button" @click="changeLanguage">
        {{ $t('language') }}
      </button>
    </div> -->

    <div class="container space-y-20">
      <div class="flex flex-col justify-between gap-10 xl:flex-row">
        <div class="space-y-10">
          <PageLogo white />
          <div class="space-x-4">
            <button class="link-wrapper" type="button">
              <Icon class="shrink-0" name="bi:line" />
            </button>
            <button class="link-wrapper" type="button">
              <Icon class="shrink-0" name="bi:instagram" />
            </button>
          </div>
        </div>

        <ul class="contact-info-wrapper">
          <li v-for="(contact, index) in contactInfo" :key="index">
            <h4 class="text-title">{{ contact.category }}</h4>
            <p class="text-body-2 xl:text-body">{{ contact.details }}</p>
          </li>
        </ul>
      </div>

      <div
        class="flex flex-col gap-4 text-body-2 xl:flex-row xl:items-center xl:justify-between xl:text-body"
      >
        <address class="not-italic">402001 台灣台中市南區民生路14巷5號</address>
        <div class="flex items-center gap-4 xl:flex-row-reverse">
          Copyright © 2024 by Hao

          <div class="space-x-1">
            <NuxtLink class="hot-link-wrapper" target="_blank" to="/admin">
              <Icon class="shrink-0" name="bi:gear-wide-connected" />
            </NuxtLink>
            <NuxtLink class="hot-link-wrapper" target="_blank" to="/_guideline">
              <Icon class="shrink-0" name="bi:palette2" />
            </NuxtLink>
            <NuxtLink
              class="hot-link-wrapper"
              target="_blank"
              to="https://github.com/cutecat8110/enjoy-luxury-hotel"
            >
              <Icon class="shrink-0" name="bi:github" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const contactInfo = ref([
  {
    category: 'TEL',
    details: '+886 9803-530-64'
  },
  {
    category: 'MAIL',
    details: 'cutecat8110@gmail.com'
  },
  {
    category: 'FAX',
    details: '+886 9803-530-64'
  },
  {
    category: 'WEB',
    details: 'www.github.com/cutecat8110'
  }
])

const { locale, setLocaleCookie } = useI18n()
const changeLanguage = () => {
  const localeCode = locale.value === 'en' ? 'zh' : 'en'
  locale.value = localeCode
  setLocaleCookie(localeCode)
}
</script>

<style lang="scss" scoped>
.link-wrapper {
  @apply inline-flex h-10 w-10 items-center justify-center rounded-full border border-white text-[1.5rem] text-white transition-colors hover:border-system-primary-100 hover:text-system-primary-100;
}

.hot-link-wrapper {
  @apply inline-flex h-8 w-8 items-center justify-center rounded-full  text-[1.25rem] text-system-gray-80 transition-colors hover:border-system-primary-100 hover:text-system-primary-100;
}

.contact-info-wrapper {
  @apply grid gap-4;

  @include xl {
    @apply gap-x-20 gap-y-10;
    grid-template-columns: auto auto;
  }
}
</style>
