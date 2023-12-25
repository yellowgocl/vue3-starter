<script setup>
const router = useRouter()
const route = useRoute()
const title = route.meta.title || import.meta.env.VITE_TITLE
const hasHistory = window.history.length > 2
const handleBack = hasHistory ? () => {
  $message.success('on back')
  router.back()
} : null

const isShowUserIcon = computed(() => !['UserProfile'].includes(route?.name))
const isShowPerferencesIcon = computed(() => !['Perferences'].includes(route?.name))
</script>
<template>
    <n-page-header class="p-4 z-10 bg-[#ffffffee] dark:bg-[#00000044] backdrop-blur-sm sticky top-0 " :subtitle="title" @back="handleBack">
        <template #extra>
          <n-space size="large" justify="end" >
            <RouterLink v-if="isShowUserIcon" to="/user"><n-icon flex  size="24"><icon-mdi:account-settings /></n-icon></RouterLink>
            <RouterLink v-if="isShowPerferencesIcon" to="/perferences"><n-icon flex  size="24"><icon-mdi:cog /></n-icon></RouterLink>
          </n-space>
        </template>
      </n-page-header>
</template>