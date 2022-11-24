<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
    
const props = defineProps({
    data:{
      type: Object, default: () => {}
    },
    num:{
      type:Number,default:()=>'3'
    }
})    

</script>
<template>
  <div>
      <Grid  :column-num="props.num">
        <GridItem v-show="props.data.contractNo" :text="props.data.contractNo" />
        <GridItem v-show="props.data.contractName" :text="props.data.contractName" />
        <GridItem v-show="props.data.projectName"  :text="props.data.projectName" />
        <GridItem v-show="props.data.company" :text="props.data.company" />
        <GridItem v-show="props.data.fileTime" :text="props.data.fileTime" />
      </Grid>
  </div>
</template>

<style>
</style>
