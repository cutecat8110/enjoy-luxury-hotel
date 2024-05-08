<template>
  <main class="flex-1 overflow-x-hidden">
    <Banner />

    <News />

    <About />

    <Rooms />

    <Menu />

    <Travel />
  </main>
</template>

<script lang="ts" setup>
import Banner from './components/banner.vue'
import News from './components/news.vue'
import About from './components/about.vue'
import Rooms from './components/rooms.vue'
import Menu from './components/menu.vue'
import Travel from './components/travel.vue'
</script>
