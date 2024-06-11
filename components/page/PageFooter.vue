<template>
  <footer class="section-container bg-system-background text-white xl:pb-[7.5rem]">
    <div class="container space-y-20">
      <div class="flex flex-col justify-between gap-10 xl:flex-row">
        <!-- 社群連結區塊 -->
        <div class="space-y-10">
          <!-- 連結: 首頁 -->
          <NuxtLink to="/">
            <PageLogo white />
          </NuxtLink>

          <div class="space-x-4">
            <!-- 連結: Line -->
            <NuxtLink class="link-wrapper" target="_blank" to="https://line.me/ti/p/l7E02lIDG4">
              <Icon class="shrink-0" name="bi:line" />
            </NuxtLink>

            <!-- 連結: IG -->
            <NuxtLink class="link-wrapper" target="_blank" to="https://instagram.com/cutecat8110">
              <Icon class="shrink-0" name="bi:instagram" />
            </NuxtLink>
          </div>
        </div>

        聯絡資訊區塊
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
        <!-- 地址 -->
        <address class="not-italic">402001 台灣台中市南區復興路三段362號</address>

        <!-- 版權及相關連結 -->
        <div class="flex flex-wrap items-center gap-4 xl:flex-row-reverse">
          <!-- 版權 -->
          <p>Copyright © 2024 by Hao</p>

          <div class="space-x-1">
            <!-- 連結: 後台 -->
            <NuxtLink class="hot-link-wrapper" target="_blank" to="/admin">
              <Icon class="shrink-0" name="bi:gear-wide-connected" />
            </NuxtLink>

            <!-- 連結: 設計準則 -->
            <NuxtLink class="hot-link-wrapper" target="_blank" to="/_guideline">
              <Icon class="shrink-0" name="bi:palette2" />
            </NuxtLink>

            <!-- 連結: Github -->
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
/* 聯絡資訊區塊 */
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
</script>

<style lang="scss" scoped>
.link-wrapper {
  @apply inline-flex h-10 w-10 items-center justify-center rounded-full border border-white text-icon-24 text-white transition-colors hover:border-system-primary-100 hover:text-system-primary-100;
}

.hot-link-wrapper {
  @apply inline-flex h-8 w-8 items-center justify-center rounded-full  text-icon-20 text-system-gray-80 transition-colors hover:border-system-primary-100 hover:text-system-primary-100;
}

.contact-info-wrapper {
  @apply grid gap-4;

  @include xl {
    @apply gap-x-20 gap-y-10;
    grid-template-columns: auto auto;
  }
}
</style>
