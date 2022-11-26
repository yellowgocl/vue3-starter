
<script setup>
import { ref, defineAsyncComponent, computed, watch } from 'vue'
import { debounce } from 'lodash'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
import Search from '@/components/Search.vue'
// import List from '@/components/List.vue'
import CardName from '@/components/CardName.vue';
import Card from '@/components/Card.vue';
import Title from '@/components/Title.vue'
import { useService, usePagination } from '@/hooks'

const isLoading = ref(true)
const onSubmit=(item)=>{
  console.log('submit123',item);
}
const listName=['合同编号','合同名称','归档时间']

const refreshing = ref(false);
const dateTime = ref([])
const dateStart = computed(() => dateTime.value?.[0])
const dateEnd = computed(() => dateTime.value?.[1])
const submitDate = computed(() => (
  dateStart.value && dateEnd.value && {
    fileDateGe: dateStart.value,
    fileDateLe: dateEnd.value
  }
))
const [paginationState, onNextPage] = usePagination({ keys: { data: 'contractList', total: "totalPage" } })
const services = useService()

watch(() => paginationState.value?.isPending, (n, o) => {
  refreshing.value = n
})
const onLoadNextPage = debounce(async (initialPage) => {
  if (!submitDate.value) return

  await onNextPage((page, size, total) => {
    return services.scanned({
      page, ...submitDate.value
    })
  }, initialPage)
}, 100, {
  leading: true,
  trailing: false
})
const onRefresh = () => onLoadNextPage(1);

</script>
<template>
  <div>
    <Search :disabled="paginationState.isPending" @submit="onLoadNextPage(1)" v-model="dateTime" title="搜索条件"></Search>
    <Title value="合同归档信息"></Title>
    <CardName :data="listName" :num="listName.length"></CardName>
    <div class="listH">
      <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List
          v-if="dateTime && !!paginationState.data?.length"
          v-model:loading="paginationState.isPending"
          :finished="paginationState.isFinished"
          finished-text="没有更多了"
          @load="onLoadNextPage"
    >
          <Card v-for="item in paginationState.data" :key="item" :data="[item.contractNo, item.contractName, item.fileDate]" :num="3"></Card>
        </List>
        <div v-else class="empty-block"></div>
      </PullRefresh>
    </div>
    <!-- <List :title="'合同列表'" :listName="listName"></List> -->
  </div>
</template>

<style scoped>
.listH{ height: calc( 100vh - 19rem) ; overflow-y: auto;}
.empty-block {
  min-height: 4rem;
}
</style>
