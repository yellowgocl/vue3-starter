<script setup>
import ThemeSwitch from './components/ThemeSwitch.vue'
import LanguageSelect from './components/LanguageSelect.vue'
import { useAppStore } from '@/store'
import { useDark } from '@vueuse/core'
const isDark = useDark()
const { toggleDark } = useAppStore()
</script>
<template>
    <common-page>
        <n-space vertical size="small">
            <n-layout mb-6>
                <n-layout-header mb-4>语言设置</n-layout-header>
                <n-layout-content px-2>
                    <LanguageSelect></LanguageSelect>
                </n-layout-content>
            </n-layout>
            <n-layout>
                <n-layout-header mb-4>显示设置</n-layout-header>
                <n-layout-content px-2>
                    <div flex mb-2>
                        <span flex-1>{{ isDark ? '切换到明亮模式' : '切换到黑暗模式' }}</span>
                        <div flex-none><theme-switch></theme-switch></div>
                    </div>
                </n-layout-content>
            </n-layout>
        </n-space>
    </common-page>
</template>