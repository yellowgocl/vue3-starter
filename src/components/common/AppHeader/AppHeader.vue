<script setup>
import Actions from './actions'

const router = useRouter()
const route = useRoute()

const title = computed(() => route.meta.title)
const isHome = computed(() => ['Home', 'Landing'].includes(route?.name))

function handleBack() {
  if (isHome.value)
    return
  $message.success('on back')
  router.back()
}
const headerClass = computed(() => {
  return isHome.value ? 'fixed right-0 left-0' : 'bg-[#ffffffee] dark:bg-[#00000044] sticky'
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
      <Actions />
    </template>
  </n-page-header>
</template>
