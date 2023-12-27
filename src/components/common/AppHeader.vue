<script setup>
import { useUserStore } from '@/store'
const userInfo = useUserStore()
const router = useRouter()
const route = useRoute()
const title = computed(() => route.meta.title)
const isHome = computed(() => ['Home', 'Landing'].includes(route?.name))

const handleBack = (() => {
    if(isHome.value) return
    $message.success('on back')
    router.back()
})

const isShowUserIcon = computed(() => !['UserProfile'].includes(route?.name))
const isShowPerferencesIcon = computed(() => !['Perferences'].includes(route?.name))

const headerClass = computed(() => {
    return isHome.value ? 'fixed right-0 left-0' : 'bg-[#ffffffee] dark:bg-[#00000044] sticky'
})

</script>
<template>
    <n-page-header :class="headerClass" class="p-4 z-10 backdrop-blur-sm top-0 " :subtitle="title" @back="handleBack">
        <template #back>
            <img v-if="isHome" src="@/assets/images/logo.png" height="20" />
            <n-icon v-else><icon-mdi-arrow-left></icon-mdi-arrow-left></n-icon>
        </template>
        <template #extra>
          <n-space size="large" justify="end" >
            <RouterLink v-if="isShowUserIcon" to="/user">
                <div items-center h-full flex v-if="userInfo.isLogged">
                <n-avatar
                    bordered
                    round
                    :size="24"
                    :src="userInfo.avatar"
                    />
                </div>
                <n-icon v-else flex size="24"><icon-mdi:account-settings /></n-icon>
            </RouterLink>
            <RouterLink v-if="isShowPerferencesIcon" to="/perferences"><n-icon color="#F6CB6A" flex  size="24"><icon-mdi:cog /></n-icon></RouterLink>
          </n-space>
        </template>
      </n-page-header>
</template>