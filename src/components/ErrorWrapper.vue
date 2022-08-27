<script setup>
import { ref, useSlots, onMounted, onErrorCaptured, watch, computed } from 'vue'

import { DIRECTION, ERROR_TYPES } from '@/constants/types'

const props = defineProps({
    onError: Function,
    stopPropagation: Boolean,
    type: {
        validator(value) {
            return Object.values(ERROR_TYPES).includes(value)
        },
        default: ERROR_TYPES.REPLACE
    },
    direction: {
        validator(value) {
            return Object.values(DIRECTION).includes(value)
        },
    }
})

const slots = useSlots()
const error = ref()
const reset = () => {
    error.value = null
}
const hasError = computed(() => {
    return !!error.value
})
const hasErrorSlot = computed(() => {
    return !!slots.error
})
onErrorCaptured((innerError) => {
    error.value = innerError
    const flag = !!props.onError?.(innerError)
    return !!props.stopPropagation || flag
})

const exposeData = {
    reset,
    error,
    hasError
}
defineExpose(exposeData)
</script>

<template>
    <div>
        <template v-if="type === ERROR_TYPES.REPLACE">
            <template v-if="hasError">
                <slot name="error" v-if="hasErrorSlot" :hasError="hasError" :error="error" :reset="reset"></slot>
                <span v-else class="error-tips">{{error?.message || error}}</span>
            </template>
            <slot v-else></slot>
        </template>
    </div>
</template>

<style scoped>
.error-tips {
    color: 'red';
}
</style>