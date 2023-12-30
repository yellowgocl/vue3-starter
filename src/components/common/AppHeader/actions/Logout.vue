<script setup>
import AppHeaderActionsItem from './Item.vue'
import { useUserStore } from '@/store'

const userInfo = useUserStore()
function onClick() {
  userInfo.logout()
}
</script>

<template>
  <AppHeaderActionsItem>
    <n-button color="white" class="h-[24px]" quaternary round size="small" @click="onClick">
      <template #icon>
        <n-icon flex size="20">
          <icon-mdi:logout />
        </n-icon>
      </template>
      {{ $t('user.profile.logout') }}
    </n-button>
  </AppHeaderActionsItem>
</template>
