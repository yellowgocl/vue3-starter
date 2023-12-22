<template>
    <n-layout wh-full class="bg-[#f5f6fb] dark:bg-hex-121212">
      <n-page-header class="p-4 pb-0 z-10 backdrop-blur-lg sticky top-0 " :subtitle="title" @back="handleBack">
        <!-- <template #extra>
          <n-space>
            <n-button>Refresh</n-button>
          </n-space>
        </template> -->
      </n-page-header>
      <article p-4 pt-0 flex-col flex-1>
        <!-- <header
          border-b="1 solid #eee"
          class="flex items-center bg-white px-15"
          dark="bg-dark border-0"
          :style="`height: ${header.height}px`"
        >
          <AppHeader />
        </header>
        <section v-if="tags.visible" hidden border-b bc-eee sm:block dark:border-0>
          <AppTags :style="{ height: `${tags.height}px` }" />
        </section> -->
        <section flex-1 bg-hex-f5f6fb dark:bg-hex-101014>
          <MainContent />
        </section>
      </article>
    </n-layout>
  </template>
  
<script setup>
import MainContent from './/MainContent.vue'
import { useAppStore } from '@/store'

const router = useRouter()
const route = useRoute()
const title = route.meta.title || import.meta.env.VITE_TITLE
const appStore = useAppStore()
const hasHistory = window.history.length > 2
const handleBack = hasHistory ? () => {
  $message.success('on back')
  router.back()
} : null
</script>
  