<template>
    <n-layout wh-full>
      <n-page-header subtitle="A podcast to improve designs" @back="handleBack">
        <template #extra>
          <n-space>
            <n-button>Refresh</n-button>
            <!-- <n-dropdown :options="options" placement="bottom-start">
              <n-button :bordered="false" style="padding: 0 4px">
                ···
              </n-button>
            </n-dropdown> -->
          </n-space>
        </template>
      </n-page-header>
      <article flex-col flex-1>
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

const appStore = useAppStore()
const hasHistory = window.history.length > 2
const handleBack = hasHistory ? () => {
  console.info({hasHistory, route})
  $message.success('on back')
  router.back()
} : null
</script>
  