
<script setup>
import { ref, defineAsyncComponent, computed, watch } from 'vue'
import { List, PullRefresh} from 'vant';
import Search from '@/components/Search.vue'
import CardName from '@/components/CardName.vue';
import Card from '@/components/Card.vue';
import Title from '@/components/Title.vue'
import { useService, usePagination, usePromise } from '@/hooks'

const listName=['合同编号','合同名称','项目名称','签约方']
//listName行名称
const dateTime = ref([])
//呈批时间数组
const dateStart = computed(() => dateTime.value?.[0])
//dateStart获取呈批时间数组第一个数
const dateEnd = computed(() => dateTime.value?.[1])
//dateStart获取呈批时间数组第二个数
const submitDate = computed(() => (
  dateStart.value && dateEnd.value && {
    fileDateGe: dateStart.value,
    fileDateLe: dateEnd.value
  }
))

const services = useService()
// 列表接口请求
const retrivePageData = (page, size, total) => {
  return services.beScanned({
      page, 
      ...submitDate.value
  })
}
// 传入下一页请求参数
const [{ next: onNextPage, to: onRefreshPage }, paginationState] = usePagination(retrivePageData, { immediately: false, keys: { data: 'contractList', total: "totalPage" } })
// 触发下一页
const onLoadNextPage = async (initialPage) => await onNextPage()
// 搜索提交
const onRefresh = () => onRefreshPage();
// 错误提示
const errorIndicator = ref(paginationState.value.isRejected)
watch(() => paginationState.value.isRejected, (n, o) => {
  errorIndicator.value = n
})
// 是否处于加载中状态（搜索）
const refreshing = ref(false);
watch(() => paginationState.value?.isPending, (n, o) => {
  // 实时检测isPending（接口数据是否在加载中）赋值
  refreshing.value = n
})
const parsedState = computed(() => {
  const { data, ...rest } = paginationState.value
  return rest
})
</script>

<template>
  <div>
    <!-- 搜索插件 -->
    <Search :disabled="paginationState.isPending" @submit="onRefresh" v-model="dateTime" title="搜索条件" :optionTitle="'呈批时间：'"></Search>
    <!-- 标题 -->
    <Title value="合同归档信息"></Title>
    <div>
      <!-- 列表名称 -->
      <CardName :data="listName" :num="listName.length"></CardName>
      <!-- 列表名称 -->
      <div class="listH">
        <!-- 下拉刷新 -->
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
          <List
            :immediate-check="false"
            v-model:loading="paginationState.isPending"
            v-model:error="errorIndicator"
            :finished="paginationState.finished"
            :finished-text="paginationState.paginationState<1?'暂无数据':'没有更多了'"
            error-text="请求失败"
            @load="onLoadNextPage" >
            <!-- 单个列表传入数据（data传入列表行参数顺序，num行个数）-->
            <Card v-for="item in paginationState.data" :key="item" :data="[item.contractNo, item.contractName, item.projectName, item.company]" :num="4"></Card>
          </List>
        </PullRefresh>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listH{ height: calc( 100vh - 240px) ; overflow-y: auto;}
</style>
