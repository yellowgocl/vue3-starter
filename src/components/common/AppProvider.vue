<script setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useCssVar } from '@vueuse/core'
import { kebabCase } from 'lodash-es'
import { naiveThemeOverrides, naiveThemeOverridesLight } from '~/settings'
import { useAppStore } from '@/store'

const appStore = useAppStore()

function setupCssVar() {
  const common = naiveThemeOverrides.common
  for (const key in common) {
    useCssVar(`--${kebabCase(key)}`, document.documentElement).value = common[key] || ''
    if (key === 'primaryColor')
      window.localStorage.setItem('__THEME_COLOR__', common[key] || '')
  }
}
setupCssVar()
</script>

<template>
  <n-config-provider
    wh-full
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="appStore.isDark ? darkTheme : undefined"
    :theme-overrides="appStore.isDark ? naiveThemeOverrides : naiveThemeOverridesLight"
  >
    <slot />
  </n-config-provider>
</template>
