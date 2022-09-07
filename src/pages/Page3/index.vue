<script setup>
    import { onMounted, ref } from 'vue';
    import { MultValueError } from '@/beans/error';
    import ToDoList from './ToDoList.vue'
    import ErrorWrapper from '@/components/ErrorWrapper.vue'
    import { ERROR_TYPES, DIRECTION } from '@/constants/types'

    const errorWrapper = ref()
    const onStopPropagation = (innerError) => {
        return !(innerError instanceof MultValueError)
    }
    const onChange = (v,) => {
        errorWrapper?.value?.reset()
    }
</script>

<template>
    <ErrorWrapper ref="errorWrapper" :stopPropagation="onStopPropagation" :type="ERROR_TYPES.NONE">
        <ToDoList @change="onChange">
            <template v-if="!!errorWrapper.error" #error><div style="color:red; padding: 6px 2px;">{{errorWrapper.error?.message}}</div></template>
        </ToDoList>
    </ErrorWrapper>
</template>