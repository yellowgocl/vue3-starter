<script setup>
import { useUserStore, usePermissionStore } from '@/store'
const userStore = useUserStore()
const avatar = userStore.avatar
</script>
<template>
    <div>
        <n-avatar
            :size="64"
            :src='avatar'></n-avatar>
    </div>
</template>