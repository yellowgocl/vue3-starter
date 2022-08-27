<script setup>
import { onErrorCaptured, onUpdated, ref, computed } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
const error = ref()

onErrorCaptured((innerError, instance, info) => {
  console.error(innerError.message, info)
  error.value = innerError
  return false
})
onUpdated(() => {
  console.info({error}, error.message)
})

const errorMessage = computed(() => {
  return error.value && error.value.message
})

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld v-if="!errorMessage" msg="Vite + Color" />
  <HelloWorld2 v-if="!errorMessage" msg="Helloworld2" />
  <h2 v-else>{{errorMessage}}</h2>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
