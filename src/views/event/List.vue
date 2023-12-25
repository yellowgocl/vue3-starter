<script setup>
import { ref, reactive,  onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useService } from '@/hooks'

const [getEventList, { isPending: isLoading }, getEventListActions] = useService('event/list')

// const isLoading = ref(true)
const data = ref([])
const router = useRouter()
const goto = (id) => {
    router.push({ path: `/event/${id}` })
}
onMounted(async () => {
    // setTimeout(() => isLoading.value = false, 1000)
    const { data: eventList } = await getEventList()
    console.info({
      eventList
    })
    data.value = [...eventList]
})
</script>
<template>
    <n-space vertical>
    <n-card>
      <template #header>
        <n-skeleton v-if="isLoading" text width="60%" />
        <template v-else>
          Event List
        </template>
      </template>
      <n-skeleton v-if="isLoading" text :repeat="6" />
      <template v-else>
        <n-list hoverable clickable>
            <n-list-item v-for='(item) in data' :key="item.id" @click="goto(item.id)">
                <n-thing :title="item.name" content-style="margin-top: 10px;">
                    <template #description>
                        <n-space size="small" style="margin-top: 4px">
                            <n-tag :bordered="false" type="info" size="small">
                                {{item.address}}
                            </n-tag>
                        </n-space>
                    </template>
                    {{ item.descript }}
                </n-thing>
            </n-list-item>
        </n-list>
      </template>
    </n-card>
  </n-space>
</template>
<style scoped>
</style>