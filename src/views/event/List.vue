<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const isLoading = ref(true)
const data = ref([
    { id: 1, title: 'event 1', address: '廣州市 海珠區 琶洲會展 B區', content: '商演活動，獎品豐富，高手如云，大量真實36d車模湧現，抓閃最好機會' },
    { id: 2, title: 'event 2', address: '廣州市 黃埔區 政府總部大樓大堂', content: '商演活動，獎品豐富，高手如云，大量真實36d車模湧現，抓閃最好機會' },
    
])
const router = useRouter()
const goto = (id) => {
    router.push({ path: `/event/${id}` })
}
onMounted(() => {
    setTimeout(() => isLoading.value = false, 1000)
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
                <n-thing :title="item.title" content-style="margin-top: 10px;">
                    <template #description>
                        <n-space size="small" style="margin-top: 4px">
                            <n-tag :bordered="false" type="info" size="small">
                                {{item.address}}
                            </n-tag>
                        </n-space>
                    </template>
                    {{ item.content }}
                </n-thing>
            </n-list-item>
        </n-list>
      </template>
    </n-card>
  </n-space>
</template>
<style scoped>
</style>