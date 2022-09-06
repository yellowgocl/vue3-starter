<script setup>
    import { onMounted } from 'vue';
    import { MultValueError } from '@/beans/error';
    onMounted(() => {
        throw new Error('to do list mounted error')
    })
    const onAdd = () => {
        throw new MultValueError('mult value error')
    }
</script>

<template>
    <button @click="onAdd">add</button>
    <h1 v-for="i in 100" :key="i">Page3</h1>
</template>