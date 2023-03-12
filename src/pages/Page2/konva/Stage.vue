<script setup>
import { watch, ref, reactive, defineExpose } from 'vue'
import { useWindowSize } from '@vueuse/core'
const viewportSize = useWindowSize()
const stage = ref()
const emit = defineEmits(['rightClick'])
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
const handleContextMenu = (event) => {
    if (event.evt.button !== 2) return

    event.evt.preventDefault(); // Prevent default context menu behavior
    const currentStage = stage.value.getStage(); // Get the Konva stage instance
    const mousePos = currentStage.getPointerPosition(); // Get the mouse position relative to the currentStage
    const intersection = currentStage.getIntersection(mousePos); // Get the intersection object

    if (intersection) {
    // Do something with the selected object
    // console.log("Selected object:", intersection);
    emit('rightClick', intersection)
    } else {
    // Do something if nothing is selected
    console.log("No object selected.");
    }
}
defineExpose(exposeData)
</script>

<template>
    <v-stage :config="config" ref="stage" @contextMenu="handleContextMenu">
        <slot></slot>
    </v-stage>
</template>