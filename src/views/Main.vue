<script setup>
import { useApi } from '@/hooks'

const [getUser, getUserState, getUserActions] = useApi()
</script>
<template>
    <div>
        landing page
        <router-view></router-view>
    </div>
</template>