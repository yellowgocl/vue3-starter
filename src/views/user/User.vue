<script setup>
import { BaseLayout } from '@/components';
</script>
<template>
    <base-layout>
        <template #header>user header</template >
        <router-view></router-view>
    </base-layout>
</template>