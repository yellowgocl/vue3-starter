<script setup>
import { useI18n } from 'vue-i18n'

const { t, availableLocales, locale } = useI18n()
const options = computed(() => (availableLocales.map(value => ({
  label: t(`locale.${value}`),
  value,
}))))
</script>

<template>
  <n-select v-model:value="locale" :options="options" />
</template>
