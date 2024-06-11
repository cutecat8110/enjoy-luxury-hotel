<template>
  <div>
    <!-- 全屏輪播 -->
    <CBanner />

    <!-- 最新消息 -->
    <News />

    <!-- 關於我們 -->
    <About />

    <!-- 房型預覽 -->
    <Rooms />

    <!-- 佳餚美饌 -->
    <Menu />

    <!-- 交通方式 -->
    <Travel />

    <!-- 條紋裝飾 -->
    <CWave />
  </div>
</template>

<script lang="ts" setup>
import News from './components/news.vue'
import About from './components/about.vue'
import Rooms from './components/rooms.vue'
import Menu from './components/menu.vue'
import Travel from './components/travel.vue'

/* layout */
definePageMeta({
  layout: 'landing'
})
</script>
