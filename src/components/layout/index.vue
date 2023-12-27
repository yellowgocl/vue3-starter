<template>
    <n-layout wh-full >
      <AppHeader></AppHeader>
      <article flex-col flex-1>
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
  