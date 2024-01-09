<script setup>
import EventDetailSkeleton from './Skeleton.vue'
import { useService } from '@/hooks'
import { event as EventUtil } from '@/utils'

const [getEvent, getEventState, getEventActions] = useService('event/detail')
const [joinEvent, joinEventState] = useService('event/join')
const result = computed(() => getEventState.value.result)
const route = useRoute()
const { params } = route || {}
const data = computed(() => EventUtil.parseData(result?.value?.data))

onMounted(async () => {
  try {
    await getEvent(null, { urlParams: params?.id })
  }
  catch (e) {
    console.error(e)
  }
})
onBeforeUnmount(async () => {
  await getEventActions?.cancel?.()
})

async function onClick() {
  await joinEvent(null, { urlParams: params?.id })
}
</script>

<template>
  <EventDetailSkeleton v-if="getEventState?.isPending" />
  <common-page v-else :title="data?.name">
    <router-view v-if="result?.code === 404" />
    <n-space v-else vertical size="large">
      <n-image width="100%" class="min-h-[200px]" :src="data?.image" rounded-2 alt="event_banner" />
      <n-space vertical size="large" w-full rounded-sm bg-gray-100 pa-4 dark:bg-gray-800>
        <div flex items-center>
          <n-icon circle mr-1 size="16">
            <icon-mdi-person-group />
          </n-icon>
          <p text-sm>
            报名人数 <span text-lime-500 font-bold>({{ data?.joined }} <span>/</span> {{ data?.maximum }} 人)</span>
          </p>
        </div>
        <div flex items-center>
          <n-icon circle mr-1 size="18">
            <icon-mdi-date-range />
          </n-icon>
          <span text-sm>{{ data?.matchDay }}</span>
        </div>
        <div flex items-center>
          <n-icon circle mr-1 size="18">
            <icon-mdi-google-maps />
          </n-icon>
          <span text-sm>{{ data?.address }}</span>
        </div>
      </n-space>
      <n-space vertical px-2>
        <span text-lg>简介</span>
        <span>{{ data?.descript }}</span>
      </n-space>
      <div px-6 pb-12>
        <n-button :loading="joinEventState.isPending" :disabled="joinEventState.isPending" round mt-12 w-full size="large" type="primary" @click="onClick">
          ￥{{ data?.fee }} - {{ $t('event.detail.signUp') }}
        </n-button>
      </div>
    </n-space>
  </common-page>
</template>
