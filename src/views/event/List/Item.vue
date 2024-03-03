<script setup>
import { computed } from 'vue'
import { event as EventUtil } from '@/utils'

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  descript: {
    type: String,
    required: true,
  },
  location: {
    type: Array,
  },
  date: {
    type: String,
  },
  maximum: {
    type: Number,
  },
  joined: {
    type: Number,
  },
})
const data = computed(() => EventUtil.parseData(props))
const parseDate = computed(() => data?.value?.matchDay)
const isFull = computed(() => data?.value?.isFull)
</script>

<template>
  <n-card embedded :bordered="false">
    <n-thing>
      <template #avatar>
        <n-avatar
          :src="image"
          lazy
        />
      </template>
      <template #header>
        {{ name }}
      </template>
      <template #header-extra>
        <n-tag round :bordered="false">
          <span v-if="isFull" text-red-500>满员</span>
          <span v-else>￥{{ fee }}</span>
        <!-- <template #avatar>
            <n-avatar color="darkGreen">
                <n-icon><icon-mdi-currency-jpy /></n-icon>
            </n-avatar>
        </template> -->
        </n-tag>
      </template>
      <template #description>
        <n-space items-center text-sm size="small">
          报名人数:
          <p text-emerald-600 font-bold dark:text-lime-500 :class="[isFull && '!text-red-500']">
            {{ joined }} / <span>{{ maximum }}</span>
          </p>
          <!-- <span text-sm>{{ maximum }}人</span> -->
        </n-space>
      </template>
      <article px-2 py-0>
        {{ descript }}
      </article>
      <template #footer>
        <n-space vertical size="large" w-full rounded-sm bg-gray-100 pa-4 dark:bg-gray-800>
          <div flex items-center>
            <n-icon circle mr-1 size="18">
              <icon-mdi-date-range />
            </n-icon>
            <span text-sm>{{ parseDate }}</span>
          </div>
          <div flex items-center>
            <n-icon circle mr-1 size="18">
              <icon-mdi-google-maps />
            </n-icon>
            <span text-sm>{{ address }}</span>
          </div>
        </n-space>
      </template>
    <!-- <template  #action>
      <n-space justify="end">

        <n-button size="small">
          <template #icon>
            <n-icon><icon-mdi-currency-jpy /></n-icon>
          </template>
          {{ fee }}
        </n-button>
      </n-space>
    </template> -->
    </n-thing>
  </n-card>
</template>
