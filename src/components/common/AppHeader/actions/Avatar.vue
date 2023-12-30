<script setup>
import AppHeaderActionsItem from './Item.vue'
import { useUserStore } from '@/store'

const userInfo = useUserStore()
</script>

<template>
  <AppHeaderActionsItem>
    <div v-if="userInfo.isLogged" h-full flex items-center>
      <n-avatar
        :size="24"
        :src="userInfo.avatar"
        bordered
        round
      />
    </div>
    <n-icon v-else flex size="24">
      <icon-mdi:account-settings />
    </n-icon>
  </AppHeaderActionsItem>
</template>
