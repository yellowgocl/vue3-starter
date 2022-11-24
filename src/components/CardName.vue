<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
    
const props = defineProps({
    data:{
      type: Array, default: () => []
    },
    num:{
      type:Number,default:()=>'3'
    }
})    

</script>
<template>
  <div>
    <Grid :column-num="props.num">
      <GridItem v-for="item in data" :key="item" :text="item"/>
      <!-- <GridItem  text="合同编号" />
      <GridItem  text="合同名称" />
      <GridItem  text="归档时间" /> -->
    </Grid>
  </div>
</template>

<style>
</style>
