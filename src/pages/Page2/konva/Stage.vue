<script setup>
import { watch, ref, reactive, defineExpose } from 'vue'
import { useWindowSize } from '@vueuse/core'
const viewportSize = useWindowSize()
const stage = ref()
const keyStatus = reactive({
    space: false
})

const exposeData = ({
    keyStatus, stage, viewport: viewportSize
})

const onKeydown = (event) => {
    event.preventDefault()
    const keyCode = event.keyCode
    switch(keyCode) {
        case 32:
            keyStatus.space = true
            break;
    }
}
const onKeyup = (event) => {
    event.preventDefault()
    const keyCode = event.keyCode
    
    switch(keyCode) {
        case 32:
            keyStatus.space = false
            break;
    }
}

watch(() => stage?.value, (n, o) => {
    const container = n.getStage().container()
    if (!container) return 
    exposeData.stage = n
    container.tabIndex = 1;
    container.removeEventListener('keyup', onKeyup)
    container.addEventListener('keyup', onKeyup)
    container.removeEventListener('keydown', onKeydown);
    container.addEventListener('keydown', onKeydown);
})

const config = ref({
    width: viewportSize.width,
    height: viewportSize.height,
})
defineExpose(exposeData)
</script>

<template>
    <v-stage :config="config" ref="stage">
        <slot></slot>
    </v-stage>
</template>