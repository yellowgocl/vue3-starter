<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'
import ListItem from './Item.vue'
import { useService } from '@/hooks'

const [getEventList, getEventListState] = useService('event/list')

const isLoading = computed(() => getEventListState.value.isPending)
const notification = useNotification()

const data = ref([])
const router = useRouter()
function goto({ id, maximum, joined }) {
  const isFull = joined >= maximum
  if (isFull) {
    notification.warning({
      content: '报名人数已满，请选择其他待举行的赛事',
    })
  }
  else {
    router.push({ path: `/event/${id}` })
  }
}
onMounted(async () => {
  const { data: eventList } = await getEventList()
  data.value = [...eventList]
})
</script>

<template>
  <common-page :show-header="true" :title="$t('event.list.title')">
    <n-skeleton v-if="isLoading" text :repeat="32" />
    <template v-else>
      <n-list clickable hoverable :show-divider="false">
        <n-list-item v-for="(item) in data" :key="item.id" class="mb-4 !pa-0" @click="goto(item)">
          <ListItem v-bind="item" />
        </n-list-item>
      </n-list>
    </template>
  </common-page>
</template>

<style scoped>
</style>
