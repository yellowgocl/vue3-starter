<script setup>
import { computed, ref } from 'vue'
import { useInitService } from '@/hooks'

const dateRange = ref([Date.now(), Date.now()])
const [_, getListState] = useInitService('ranking/list')

const list = computed(() => (
  getListState?.value?.result?.data
))
</script>

<template>
  <common-page>
    <n-date-picker v-model:value="dateRange" type="quarterrange" clearable />
    <n-list hoverable clickable class="mt-5">
      <n-list-item v-for="(item, index) in list" :key="item.id">
        <template #prefix>
          <icon-mdi-crown class="text-5" :class="{ 'opacity-0': index > 2, 'text-yellow-500': index === 0, 'text-gray-500': index === 1, 'text-orange-400': index === 2 }" />
        </template>

        <n-thing :title="item.name" content-style="margin-top: 10px;">
          <pre>{{ item.phone }}</pre>
        </n-thing>
      </n-list-item>
    </n-list>
  </common-page>
</template>
