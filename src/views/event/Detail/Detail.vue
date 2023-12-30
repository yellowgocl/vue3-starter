<script setup>
import { useService } from '@/hooks'

const [getEvent] = useService('event/detail')
const route = useRoute()
const { params } = route || {}
const data = ref([])

onMounted(async () => {
  const { data: event } = await getEvent(null, { urlParams: params?.id })
  data.value = event
})
</script>

<template>
  <common-page :title="data?.name">
    <div>
      {{ JSON.stringify($route.params) }}
      event detail {{ data }}
      <router-view />
    </div>
  </common-page>
</template>
