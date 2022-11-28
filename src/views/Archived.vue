
<script setup>
import { ref, defineAsyncComponent, computed, watch } from 'vue'
// import { debounce } from 'lodash'
import { List, PullRefresh} from 'vant';
import Search from '@/components/Search.vue'
import CardName from '@/components/CardName.vue';
import Card from '@/components/Card.vue';
import Title from '@/components/Title.vue'
import { useService, usePagination, usePromise } from '@/hooks'

const listName=['合同编号','合同名称','归档时间']

const dateTime = ref([])
const dateStart = computed(() => dateTime.value?.[0])
const dateEnd = computed(() => dateTime.value?.[1])
const submitDate = computed(() => (
  dateStart.value && dateEnd.value && {
    fileDateGe: dateStart.value,
    fileDateLe: dateEnd.value
  }
))

const services = useService()
const retrivePageData = 
// debounce(
  (page, size, total) => {
  return services.scanned({
      page, 
      ...submitDate.value
  })
}
// , 100, {
//   'leading': true,
//   'trailing': false
// })
const [{ next: onNextPage, to: onRefreshPage }, paginationState] = usePagination(retrivePageData, { keys: { data: 'contractList', total: "totalPage" } })
const onLoadNextPage = async (e) => {
  setTimeout(async () => await onNextPage() )
}
const onRefresh = () => onRefreshPage();

const errorIndicator = ref(paginationState.value.isRejected)
watch(() => paginationState.value.isRejected, (n, o) => {
  errorIndicator.value = n
})
const refreshing = ref(false);
watch(() => paginationState.value?.isPending, (n, o) => {
  refreshing.value = n
})
const parsedState = computed(() => {
  const { data, ...rest } = paginationState.value
  return rest
})
</script>

<template>
  <div>
    <Search :disabled="paginationState.isPending" @submit="onRefresh" v-model="dateTime" title="搜索条件"></Search>
    <Title value="合同归档信息"></Title>
    <div :v-if="parsedState.current!='0'">
      <CardName :data="listName" :num="listName.length"></CardName>
      <div class="listH">
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
          <List
            :immediate-check="true"
            v-model:loading="paginationState.isPending"
            v-model:error="errorIndicator"
            :finished="paginationState.finished"
            :finished-text="paginationState.data?.length === 0?'暂无数据':'没有更多了'"
            error-text="请求失败"
            @load="onLoadNextPage" >
            <Card v-for="item in paginationState.data" :key="item" :data="[item.contractNo, item.contractName, item.fileDate]" :num="3"></Card>
          </List>
        </PullRefresh>
      </div>
    </div>
    
    <!-- <List :title="'合同列表'" :listName="listName"></List> -->
  </div>
</template>

<style scoped>
.listH{ height: calc( 100vh - 15rem) ; overflow-y: auto;}
</style>
