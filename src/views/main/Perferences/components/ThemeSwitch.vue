<script setup>
import { useDark } from '@vueuse/core'
import { useAppStore } from '@/store'

const isDark = useDark()
const { toggleDark } = useAppStore()
</script>

<template>
  <n-switch v-model:value="isDark" size="large" @change="toggleDark">
    <template #checked-icon>
      <n-icon><icon-mdi-moon-waning-crescent /></n-icon>
    </template>
    <template #unchecked-icon>
      <n-icon><icon-mdi-white-balance-sunny /></n-icon>
    </template>
  </n-switch>
</template>
