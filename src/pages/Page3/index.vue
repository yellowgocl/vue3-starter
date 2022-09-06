<script setup>
    import { onMounted } from 'vue';
    import { MultValueError } from '@/beans/error';
    import ToDoList from './ToDoList.vue'
    import ErrorWrapper from '@/components/ErrorWrapper.vue'
    import { ERROR_TYPES, DIRECTION } from '@/constants/types'

    const onStopPropagation = (innerError) => {
        return !(innerError instanceof MultValueError)
    }
</script>

<template>
    <ErrorWrapper :stopPropagation="onStopPropagation" :type="ERROR_TYPES.PARTS_START" :direction="DIRECTION.COLUMN">
        <ToDoList />
    </ErrorWrapper>
</template>