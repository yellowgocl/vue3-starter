<script setup>
const props = defineProps({
  slim: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: props => !!props?.title,
  },
  title: {
    type: String,
    default: undefined,
  },
})
const route = useRoute()
const wrapperClass = computed(() => (props.slim ? '' : 'pa-4 pt-0'))
const isShowHeader = computed(() => (props?.title || props?.showHeader))
</script>

<template>
  <AppPage :show-footer="showFooter" :class="wrapperClass">
    <header v-if="isShowHeader" mb-4 min-h-12 flex items-center justify-between px-1>
      <slot v-if="$slots.header" name="header" />
      <template v-else>
        <h2 text-5 text-hex-333 font-normal dark:text-hex-ccc>
          {{ title || route.meta?.title }}
        </h2>
        <slot name="action" />
      </template>
    </header>
    <slot />
  </AppPage>
</template>
