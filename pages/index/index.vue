<template>
  <main class="flex-1 overflow-x-hidden">
    <Banner />

    <News />

    <About />

    <Rooms />

    <Menu />

    <div class="container">
      <div class="h-[2000px] border"></div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Banner from './components/banner.vue'
import News from './components/news.vue'
import About from './components/about.vue'
import Rooms from './components/rooms.vue'
import Menu from './components/menu.vue'
</script>
