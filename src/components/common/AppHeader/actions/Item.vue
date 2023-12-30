<script setup>
import { TYPE, itemProps } from './definedItemProps'

const props = defineProps(itemProps)
const isUseRouteLink = computed(() => TYPE.ROUTE === props?.type)
</script>

<template>
  <div>
    <RouterLink v-if="isUseRouteLink" :to="props.url">
      <slot />
    </RouterLink>
    <div v-else>
      <slot />
    </div>
  </div>
</template>
