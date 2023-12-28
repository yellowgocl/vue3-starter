<script setup>
import { useUserStore } from '@/store'

const userInfo = useUserStore()
const router = useRouter()
const route = useRoute()
const { pageHeader } = route?.meta

const title = computed(() => route.meta.title)
const isHome = computed(() => ['Home', 'Landing'].includes(route?.name))

function handleBack() {
  if (isHome.value)
    return
  $message.success('on back')
  router.back()
}

const isShowUserIcon = computed(() => !['UserProfile'].includes(route?.name))
const isShowPerferencesIcon = computed(() => !['Perferences'].includes(route?.name))

const headerClass = computed(() => {
  return isHome.value ? 'fixed right-0 left-0' : 'bg-[#ffffffee] dark:bg-[#00000044] sticky'
})
const actionsClass = computed(() => {
  const common = 'pa-1 bg-cyan-600 rounded-full'
  const { hidden } = route?.meta?.pageHeader?.actions || {}
  const hiddenActionsClass = hidden ? 'hidden' : ''
  return `${common} ${hiddenActionsClass}`
})
</script>

<template>
  <n-page-header :class="headerClass" class="top-0 z-10 p-4 backdrop-blur-sm" :subtitle="title" @back="handleBack">
    <template #back>
      <div class="min-h-[32px] flex items-center">
        <img v-if="isHome" src="@/assets/images/logo.png" height="20">
        <n-icon v-else>
          <icon-mdi-arrow-left />
        </n-icon>
      </div>
    </template>
    <template #extra>
      <div :class="actionsClass">
        <n-space size="large" justify="end">
          <RouterLink v-if="isShowUserIcon" to="/user">
            <div v-if="userInfo.isLogged" h-full flex items-center>
              <n-avatar
                bordered
                round
                :size="24"
                :src="userInfo.avatar"
              />
            </div>
            <n-icon v-else flex size="24">
              <icon-mdi:account-settings />
            </n-icon>
          </RouterLink>
          <RouterLink v-if="isShowPerferencesIcon" to="/perferences">
            <n-icon color="#F6CB6A" flex size="24">
              <icon-mdi:cog />
            </n-icon>
          </RouterLink>
        </n-space>
      </div>
    </template>
  </n-page-header>
</template>
