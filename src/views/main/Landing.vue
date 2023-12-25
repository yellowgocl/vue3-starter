<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })
</script>
<template>
    <n-space vertical size="large">
        <n-layout>
            <p >{{ t('landing.title') }}</p>
        </n-layout>
    </n-space>
</template>