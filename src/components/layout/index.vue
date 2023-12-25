<template>
    <n-layout wh-full >
      <AppHeader></AppHeader>
      <article px-4 pt-0 flex-col flex-1>
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
        <section flex-1 >
          <MainContent />
        </section>
      </article>
    </n-layout>
  </template>
  
<script setup>
import MainContent from './/MainContent.vue'
import AppHeader from '@/components/common/AppHeader.vue'
</script>
  