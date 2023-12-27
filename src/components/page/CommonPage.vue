<template>
  <AppPage :show-footer="showFooter" :class="wrapperClass">
    <header v-if="showHeader" px-1 mb-4 min-h-12 flex items-center justify-between >
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

const props = defineProps({
  slim: {
    type: Boolean,
    default: false
  },
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
const wrapperClass = computed(() => (props.slim ? '' : 'pa-4 pt-0'))
</script>
