<template>
  <AppPage :show-footer="showFooter">
    <header v-if="showHeader" mb-4 min-h-12 flex items-center justify-between >
      <slot v-if="$slots.header" name="header"></slot>
      <template v-else>
        <h2 text-5 font-normal text-hex-333 dark:text-hex-ccc>{{ title || route.meta?.title }}</h2>
        <slot name="action"></slot>
      </template>
    </header>
    <slot></slot>
  </AppPage>
</template>

<script setup>
defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: undefined,
  },
})
const route = useRoute()
</script>
