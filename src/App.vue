<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
const currentTheme = ref(darkTheme)
const themeOverrides = {}
</script>

<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped>

</style>
