<script setup>
import { BaseLayout } from '@/components'
</script>

<template>
  <BaseLayout>
    <template #header>
      user header
    </template>
    <router-view />
  </BaseLayout>
</template>
