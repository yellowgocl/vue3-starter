<script setup>
defineProps({
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
})
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
        <n-button circle size="small">
            <template #icon><icon-mdi-google-maps /></template>
        </n-button>
    </template>
    {{descript}}
    <template #footer><span text-sm>{{ address }}</span></template>
    <template  #action>
      <n-space justify="end">
        <n-button size="small">
          <template #icon>
            <n-icon><icon-mdi-currency-jpy /></n-icon>
          </template>
          {{ fee }}
        </n-button>
      </n-space>
    </template>
  </n-thing>
</n-card>
</template>