<script setup>
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale, ...rest } = useI18n()
console.info({
    ...rest
})
const options = availableLocales.map((value) => ({
    label: t(`locale.${value}`),
    value
}))
</script>
<template>
    <n-select v-model:value="locale" :options="options" />
</template>