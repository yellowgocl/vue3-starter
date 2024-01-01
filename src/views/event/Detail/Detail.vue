<script setup>
import { useService } from '@/hooks'

const [getEvent, getEventState] = useService('event/detail')
const result = computed(() => getEventState.value.result)
const route = useRoute()
const { params } = route || {}
const data = computed(() => result?.value?.data)

onMounted(async () => {
  await getEvent(null, { urlParams: params?.id })
})
</script>

<template>
  <n-space v-if="getEventState?.isPending" vertical m-6>
    <n-skeleton height="40px" width="33%" />
    <n-skeleton height="180px" :sharp="false" />
    <n-skeleton height="30px" :sharp="false" />
    <n-skeleton height="30px" :sharp="false" />
    <n-skeleton height="30px" width="33%" />
    <n-skeleton text :repeat="4" />
    <n-skeleton height="40px" round />
  </n-space>
  <common-page v-else :title="data?.name">
    <router-view v-if="result?.code === 404" />
    <n-space v-else vertical size="large">
      <n-image width="100%" class="min-h-[200px]" :src="data?.image" rounded-2 alt="event_banner" />
      <div w-full flex items-center rounded-sm bg-gray-100 pa-2 dark:bg-gray-800>
        <n-icon circle mr-1 color="darkGreen" size="18">
          <icon-mdi-google-maps />
        </n-icon>
        <span text-sm>{{ data?.address }}</span>
      </div>
      <n-space vertical px-2>
        <n-space justify="space-between">
          <span text-md>报名人数上限 - {{ data?.maximum }} 人</span>
          <n-tag round :bordered="false">
            ￥{{ data?.fee }}
          </n-tag>
        </n-space>
        <span text-lg>简介</span>
        <span>{{ data?.descript }}</span>
      </n-space>
      <div px-6>
        <n-button round mt-12 w-full size="large" type="primary">
          {{ $t('event.detail.signUp') }}
        </n-button>
      </div>
    </n-space>
  </common-page>
</template>
