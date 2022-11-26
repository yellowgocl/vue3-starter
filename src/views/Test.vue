
<script setup>
import { ref, defineAsyncComponent, computed, onUnmounted, onMounted } from 'vue'
import { debounce } from 'lodash'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
import Search from '@/components/Search.vue'
// import List from '@/components/List.vue'
import CardName from '@/components/CardName.vue';
import Card from '@/components/Card.vue';
import Title from '@/components/Title.vue'

import { useService, usePagination, usePromise, useRetry } from '@/hooks'

const services = useService()
const retrivePageData = (page, size, total) => {
  return services.scanned({
      page, 
      fileDateGe: '2022-07-12',
      fileDateLe: '2022-08-11'
  })
}

const [promsie2Wrapper, promise2State] = useRetry(services.scanned)
const [paginationActions, paginationState] = usePagination(retrivePageData, { keys: { data: "contractList" } })
const { next, to } = paginationActions

const onLoadNextPage = //debounce(
  async () => {
    console.info("next page")
    return (await next())
  }
//, 100, { leading: true, trailing: false })

const parsedState = computed(() => {
  const { data, ...rest } = paginationState.value
  return rest
})

const refreshing = ref(false)
const onclick = async () => {
  await to(1)
}

</script>
<template>
  <button @click="onclick">reset</button>
  {{parsedState}}
  <div class="listH">
      <PullRefresh v-model="refreshing" @refresh="to(1)">
        <List
          v-model:loading="paginationState.isPending"
          :finished="paginationState.finished"
          finished-text="没有更多了"
          @load="next" >
          <Card v-for="item in paginationState.data" :key="item" :data="[item.contractNo, item.contractName, item.fileDate]" :num="3"></Card>
        </List>
      </PullRefresh>
    </div>
</template>

<style scoped>
.iconStyle{margin: 0 auto;}
.listH{ height: calc( 100vh ) ; overflow-y: auto;}
.empty-block {
  min-height: 4rem;
}
</style>
