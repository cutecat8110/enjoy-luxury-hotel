<template>
  <div>
    <CBanner />

    <News />

    <About />

    <Rooms />

    <Menu />

    <Travel />
  </div>
</template>

<script lang="ts" setup>
import News from './components/news.vue'
import About from './components/about.vue'
import Rooms from './components/rooms.vue'
import Menu from './components/menu.vue'
import Travel from './components/travel.vue'

definePageMeta({
  layout: 'landing'
})
</script>
