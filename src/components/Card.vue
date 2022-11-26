<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { filter } from 'lodash'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
    
const props = defineProps({
    data:{
      type: [Object, String, Number], default: () => {}
    },
    num:{
      type: Number, default:() => 0
    }
})
const parsedData = computed(() => {
  return filter(props.data, (v) => !!v).map(v => v)
})
const column = computed(() => props.num > 0 ? props.num : parsedData.length)
</script>
<template>
  <div>
      <Grid  :column-num="column">
        <GridItem v-for='item in parsedData' :key="item" :text="item" />
        <!-- <GridItem v-show="props.data.contractNo" :text="props.data.contractNo" />
        <GridItem v-show="props.data.contractName" :text="props.data.contractName" />
        <GridItem v-show="props.data.projectName"  :text="props.data.projectName" />
        <GridItem v-show="props.data.company" :text="props.data.company" />
        <GridItem v-show="props.data.fileTime" :text="props.data.fileTime" /> -->
      </Grid>
  </div>
</template>

<style>
</style>
