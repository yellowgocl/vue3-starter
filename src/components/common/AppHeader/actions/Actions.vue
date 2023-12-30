<script setup>
import AppHeaderActionsAvatar from './Avatar.vue'
import AppHeaderActionsLogout from './Logout.vue'
import AppHeaderActionsSetting from './Setting.vue'
const route = useRoute()
// const { pageHeader } = route?.meta
const isInUserProfile = computed(() => ['UserProfile'].includes(route?.name))
const isInPerferences = computed(() => ['Perferences'].includes(route?.name))
const isShowUserIcon = computed(() => !isInUserProfile.value)
const isShowPerferencesIcon = computed(() => !(isInPerferences.value || isInUserProfile.value))

const actionsClass = computed(() => {
  const common = 'pa-1 bg-cyan-600 rounded-full'
  const { hidden } = route?.meta?.pageHeader?.actions || {}
  const hiddenActionsClass = hidden ? 'hidden' : ''
  return `${common} ${hiddenActionsClass}`
})
</script>

<template>
  <div :class="actionsClass">
    <n-space size="large" justify="end">
      <AppHeaderActionsAvatar v-if="isShowUserIcon" to="/user" />
      <AppHeaderActionsSetting v-if="isShowPerferencesIcon" to="/perferences" />
      <AppHeaderActionsLogout v-if="isInUserProfile" />
    </n-space>
  </div>
</template>
