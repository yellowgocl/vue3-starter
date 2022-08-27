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
        default: () => ERROR_TYPES.PARTS_END
    },
    direction: {
        validator(value) {
            return Object.values(DIRECTION).includes(value)
        },
        default: DIRECTION.COLUMN
    }
})
const directionClass = ref(`direction-${props.direction}`)
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
const isTypeOfParts = computed(() => {
    return [ERROR_TYPES.PARTS_START, ERROR_TYPES.PARTS_END].some(v => v === props.type)
})

const layoutClass = computed(() => {
    return [
        { [`layout-${props.type}`]: isTypeOfParts }
    ]
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
    <div class="error-wrapper">
        <template v-if="type === ERROR_TYPES.REPLACE">
            <template v-if="hasError">
                <slot name="error" v-if="hasErrorSlot" :hasError="hasError" :error="error" :reset="reset"></slot>
                <span v-else class="error-tips">{{error?.message || error}}</span>
            </template>
            <slot v-else hasError="hasError" :error="error" :reset="reset"></slot>
        </template>
        <template v-else-if="isTypeOfParts">
            <div :class="[directionClass, 'layout-parts']">
                <div><slot :hasError="hasError" :error="error" :reset="reset"></slot></div>
                <div v-if="hasError" :class="layoutClass">
                    <slot name="error" v-if="hasErrorSlot" :hasError="hasError" :error="error" :reset="reset"></slot>
                    <span v-else class="error-tips">{{error?.message || error}}</span>
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