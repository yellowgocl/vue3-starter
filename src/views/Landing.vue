
<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue'
import { Icon,  Button, Field, CellGroup ,Row,Space ,Form} from 'vant';
import {useRouter} from 'vue-router'

import { useService } from '@/hooks'

const currentStaff = ref()
const services = useService()
const router=useRouter();
const buttonName = ref([{name:'扫描合同号归档',link:'/scanning'},{name:"待扫描归档合同查询",link:'/unfiled'},{name:"已扫描归档合同查询",link:'/archived'}]);
const onCLick=(item)=>{
  console.log('submit', item.link);
  router.push(item.link);
}

onMounted(() => {
  services['user/get']().then((data) => {
    currentStaff.value = data
  })
})
</script>
<template>
  <div class="langing main_space spaceUp_2"  >
    <Space direction="vertical"  :align="center"  fill size="1.2rem" >
      <Button v-for="(item, index) in buttonName" type="primary" :key="index" block @click="onCLick(item)">{{item.name}}</Button>
    </Space>
    {{currentStaff}}
  </div>
</template>

<style>
.iconStyle{margin: 0 auto;}
</style>
