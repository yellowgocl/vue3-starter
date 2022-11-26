
<script setup>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue'
import { List, Cell } from 'vant';
import { debounce } from 'lodash'
import Search from '@/components/Search.vue'
import {useRouter} from 'vue-router'

import { useService, usePagination } from '@/hooks'

const searchDate = ref('')
const [paginationState, onNextPage] = usePagination()
const services = useService()

const onLoadNextPage = debounce(async (page) => {
  console.info(searchDate)
  await onNextPage((page, size, total) => {
    console.info({page, size})
    return services['contract/list']({
      page, size
    })
  }, page)
}, 100, {
  leading: true,
  trailing: false
})

</script>
<template>
  
  <div>
    <Search v-model="searchDate" @submit="onLoadNextPage(1)" :title="'搜索条件'"></Search>
    <List
      v-if="searchDate"
      v-model:loading="paginationState.isPending"
      :finished="paginationState.isFinished"
      finished-text="没有更多了"
      @load="onLoadNextPage"
    >
      <Cell v-for="item in paginationState.data" :key="item.id" :title="item.name" />
    </List>
  </div>
</template>

<style>
.iconStyle{margin: 0 auto;}
</style>
