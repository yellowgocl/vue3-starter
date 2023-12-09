<script setup>
import { ref } from 'vue'
import { NSpace, NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui'

import { NConfigProvider, darkTheme } from 'naive-ui'
const currentTheme = ref(darkTheme)
const themeOverrides = {}
</script>

<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-space vertical size="large">
        <n-layout>
            <n-layout-content>
                <router-view></router-view>
            </n-layout-content>
        </n-layout>
    </n-space>
    
  </n-config-provider>
</template>

<style scoped>
.n-layout-content {
  height: 100vh;
}
</style>
