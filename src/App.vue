<script setup>
import { onErrorCaptured, onUpdated, ref, computed } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ErrorWrapper from './components/ErrorWrapper.vue';

const errorWrapper = ref()

</script>

<template>
  <ErrorWrapper ref="errorWrapper">
    <template v-slot:error="{ error, reset }">
      <span>{{error}}</span>
      <button @click="reset">clear error</button>
    </template>
    <HelloWorld msg="Vite + Color" />
  </ErrorWrapper>
</template>

<style scoped>
</style>
