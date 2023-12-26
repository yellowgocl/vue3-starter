<script setup>
import { ref, reactive,  onMounted } from 'vue'
import ListItem from './Item.vue'
import { useRouter } from 'vue-router'
import { useService } from '@/hooks'

const [getEventList, getEventListState, getEventListActions] = useService('event/list')

const isLoading = computed(() => getEventListState.value.isPending)

const data = ref([])
const router = useRouter()
const goto = (id) => {
    router.push({ path: `/event/${id}` })
}
onMounted(async () => {
  const { data: eventList } = await getEventList()
  data.value = [...eventList]
})
</script>
<template>
    <common-page :showHeader="true" title="Event list">
      <n-skeleton v-if="isLoading" text :repeat="32" />
      <template v-else>
        <n-list hoverable clickable :show-divider="false">
            <n-list-item class='!pa-0 mb-4' v-for='(item) in data' :key="item.id" @click="goto(item.id)">
                <ListItem v-bind="item"></ListItem>
            </n-list-item>
        </n-list>
      </template>
    </common-page>
    
</template>
<style scoped>
</style>