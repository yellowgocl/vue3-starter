<script setup>
import { ref, onMounted, onErrorCaptured, watch, computed } from 'vue'

import { DIRECTION, ERROR_TYPES } from '@/constants/types'

const props = defineProps({
    onError: Function,
    error: {
        validator: (value) => value instanceof Error
    },
    stopPropagation: Boolean,
    type: {
        validator(value) {
            return Object.values(ERROR_TYPES).includes(value)
        },
        default: () => ERROR_TYPES.PARTS_END
    },
    direction: {
        validator(value) {
            return Object.values(DIRECTION).includes(value)
        },
        default: DIRECTION.COLUMN
    }
})
console.info('error wrapper: ', props.error)
const emit = defineEmits(['update:error'])
const directionClass = ref(`direction-${props.direction}`)
const error = ref(props.error)
const reset = () => {
    error.value = null
}
const hasError = computed(() => {
    return !!error.value
})
const isTypeOfParts = computed(() => {
    return [ERROR_TYPES.PARTS_START, ERROR_TYPES.PARTS_END, ERROR_TYPES.NONE]
        .some(v => v === props.type)
})
watch(() => props?.error, (newError, oldError) => {
    error.value = newError
})

const layoutClass = computed(() => {
    return [
        { [`layout-${props.type}`]: isTypeOfParts }
    ]
})

onErrorCaptured((innerError) => {
    emit('update:error', innerError)
    const flag = !!props.onError?.(innerError)
    !flag && (error.value = innerError)
    return !!props.stopPropagation || flag
})

const exposeData = {
    reset,
    error,
    hasError,
}
defineExpose(exposeData)
</script>

<template>
    <div class="error-wrapper">
        <template v-if="type === ERROR_TYPES.REPLACE">
            <template v-if="hasError && type !== ERROR_TYPES.NONE">
                <slot name="error" v-bind="exposeData">
                    <span class="error-tips">{{error?.message || error}}</span>
                </slot>
            </template>
            <slot v-else v-bind="exposeData"></slot>
        </template>
        <template v-else-if="isTypeOfParts">
            <div :class="[directionClass, 'layout-parts']">
                <div><slot v-bind="exposeData"></slot></div>
                <div v-if="hasError" :class="layoutClass">
                    <slot name="error" v-bind="exposeData">
                        <span class="error-tips">{{error?.message || error}}</span>
                    </slot>
                </div>
            </div>
        </template>
        
    </div>
</template>

<style scoped>
.layout-parts {
    display: flex;
}
.layout-parts-start {
   order: -1;
}
.direction-row {
    flex-direction: row;
}
.direction-column {
    flex-direction: column;
}
.error-tips {
    color: red;
}
</style>
