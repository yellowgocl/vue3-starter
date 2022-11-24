<script setup>
import { ref, defineAsyncComponent, computed,defineProps } from 'vue'
import { Cell } from 'vant';
const props = defineProps({
    value:{
      type: String, default: () => "搜索条件"
    },
}) 
// let title=ref(props.value)
</script>

<template>
  <div>
    <Cell :value="value" />
  </div>
</template>
<style scoped>

</style>
