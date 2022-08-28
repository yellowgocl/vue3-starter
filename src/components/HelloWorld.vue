
<script setup>
import { ref, onMounted, onUpdated, watch } from 'vue'

import { Button } from 'ant-design-vue';

const props = defineProps({
  msg: String
})

const count = ref(0)
const bool = ref(false)

onMounted(() => {
  console.log(`the component is now mounted.`)
})

watch(count, (count, oldCount) => {
  if (count.value > 4) {
    throw new Error('fuck , go to shit from ' + props.msg)
  }
})


const onClick = (e) => {
  count.value += 1
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <a-button @click="onClick">count is {{ count }}</a-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
