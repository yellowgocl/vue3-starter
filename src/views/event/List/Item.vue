<script setup>
import moment from 'moment'
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fee: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  descript: {
    type: String,
    required: true
  },
  location: {
    type: Array,
  },
  date: {
    type: String,
  },
  maximum: {
    type: Number,
  }
})
const parseDate = computed(() => moment(props.date).format('DD/MM/YYYY'))
</script>
<template>
    <n-card embedded :bordered="false">
<n-thing>
    <template #avatar>
      <n-avatar
        :src="image"
        lazy>
      </n-avatar>
    </template>
    <template #header>{{name}}</template>
    <template #header-extra>
        <n-tag round :bordered="false">
        ￥{{ fee }}
        <!-- <template #avatar>
            <n-avatar color="darkGreen">
                <n-icon><icon-mdi-currency-jpy /></n-icon>
            </n-avatar>
        </template> -->
    </n-tag>
    </template>
    <template #description>
        <n-space justify="space-between">
            <span text-sm>{{ parseDate }}</span>
            <!-- <span text-sm>{{ maximum }}人</span> -->
        </n-space>
        
    </template>
    <article px-2 py-0>{{descript}}</article>
    <template #footer>
        <div flex items-center w-full bg-gray-100 dark:bg-gray-800 rounded-sm pa-2>
            <n-icon  mr-1 circle color="darkGreen" size="18">
                <icon-mdi-google-maps />
            </n-icon>
            <span text-sm>{{ address }}</span>
        </div>
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