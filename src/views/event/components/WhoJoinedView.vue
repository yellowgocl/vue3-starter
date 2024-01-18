<script setup>
import { useService } from '@/hooks'
import { event as EventUtil } from '@/utils'

defineProps({
  event: {
    type: Object,
  },
})

const [getWhoJoined, getWhoJoinedState, getWhoJoinedActions] = useService('event/who-joined')
const route = useRoute()
const { params } = route || {}
const whoJoinedList = computed(() => getWhoJoinedState?.value?.result?.data)
onMounted(async () => {
  try {
    const eventId = params?.id
    await getWhoJoined(null, { urlParams: eventId })
  }
  catch (e) {
    console.error(e)
  }
})
onBeforeUnmount(async () => {
  await getWhoJoinedActions?.cancel?.()
})
</script>

<template>
  <n-collapse>
    <n-collapse-item title="参赛人员" name="whoJoinedCollapse">
      <template v-if="!!event" #header-extra>
        <span text-lime-500 font-bold>({{ event?.joined }} <span>/</span> {{ event?.maximum }})</span>
      </template>
      <n-space size="small">
        <n-tag v-for="(item, index) in whoJoinedList" :key="`${item.name}-${index}`" round :bordered="false">
          {{ item.name }}
          <template #avatar>
            <n-avatar :src="item.avatar" />
          </template>
        </n-tag>
      </n-space>
    </n-collapse-item>
  </n-collapse>
</template>
