<script setup>
import { onErrorCaptured, onUpdated, ref, computed } from 'vue'

import HelloWorld from './components/HelloWorld.vue'
import ErrorWrapper from './components/ErrorWrapper.vue';
import { ERROR_TYPES } from '@/constants/types'

const errorWrapper = ref()

</script>

<template>
  <ErrorWrapper ref="errorWrapper" :type="ERROR_TYPES.PARTS_END">
    <template v-slot:error="{ error, reset }" >
      <span class="error-tips">{{error}}</span>
      <button @click="reset">clear error</button>
    </template>
    <template v-slot = '{ reset }'>
      <HelloWorld msg="Vite + Color" />
      <button @click="reset">clear error</button>
    </template>
  </ErrorWrapper>
</template>

<style scoped>
.error-tips{
  color: red;
}
</style>
