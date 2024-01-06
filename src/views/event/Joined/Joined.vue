<script setup>
import { useService } from '@/hooks'

const [getEvent, getEventState] = useService('event/detail')
const data = computed(() => getEventState.value.result?.data)
const route = useRoute()
const { params } = route || {}
onMounted(async () => {
  await getEvent(null, { urlParams: params?.id })
})
</script>

<template>
  <common-page mt-20>
    <n-result status="success" title="恭喜晒！" :description="data?.name">
      <template #footer>
        <div w-full flex items-center rounded-sm bg-gray-100 px-4 py-6 dark:bg-gray-800>
          <n-icon circle mr-1 color="darkGreen" size="18">
            <icon-mdi-google-maps />
          </n-icon>
          <span text-sm>{{ data?.address }}</span>
        </div>
        <div mt-6 bg-gray-100 pa-6 text-start dark:bg-gray-800>
          <span>举办时间: {{ data?.date }}</span>
          <div mt-4>
            已经成功报名<b>{{ data?.name }}</b>，期待当日您的精彩发挥
          </div>
        </div>
        <RouterLink to="/event">
          <n-button size="large" type="primary" round mt-12>
            返回赛事列表
          </n-button>
        </RouterLink>
      </template>
    </n-result>
  </common-page>
</template>
