
<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue'
import { Icon,  Button, Field, CellGroup ,Row,Space ,Form} from 'vant';
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import { ERROR_TYPES, DIRECTION } from '@/constants/types'
import {useRouter} from 'vue-router'
import { useService } from '@/hooks'

const error = ref()
const currentStaff = ref()
const services = useService()
const router=useRouter();
const buttonName = ref([{name:'扫描合同号归档',link:'/scanning'},{name:"待扫描归档合同查询",link:'/unfiled'},{name:"已扫描归档合同查询",link:'/archived'}]);
const onCLick=(item)=>{
  console.log('submit', item.link);
  router.push(item.link);
}

const onQueryUser = (async () => {
  currentStaff.value  = await services['user/get']()
})

</script>
<template>
  <!-- <ErrorBoundary v-model:error="error" :type="ERROR_TYPES.PARTS_END" :direction="DIRECTION.COLUMN" > -->
  <div class="langing main_space spaceUp_2"  >
    <Space direction="vertical"  :align="center"  fill size="1.2rem" >
      <Button v-for="(item, index) in buttonName" type="primary" :key="index" block @click="onCLick(item)">{{item.name}}</Button>
    </Space>
    <Button type="secondary" :key="index" block @click="onQueryUser">query user data</Button>
  </div>
<!-- </ErrorBoundary> -->
</template>

<style>
.iconStyle{margin: 0 auto;}
</style>
