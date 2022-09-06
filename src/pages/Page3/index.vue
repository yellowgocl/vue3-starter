<script setup>
    import { onMounted } from 'vue';
    onMounted(() => {
        throw new Error('page3 error')
    })
</script>

<template>
    <h1 v-for="i in 100" :key="i">Page3</h1>
</template>