<script setup>
import AppProvider from '@/components/common/AppProvider.vue'
</script>

<template>
  <Suspense>
    <template #fallback>
      Loading...
    </template>
    <AppProvider>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </AppProvider>
  </Suspense>
</template>
