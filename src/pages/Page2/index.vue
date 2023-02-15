<script setup>
import { ref, watch, reactive, computed } from 'vue'
import backgroupImage from '@/assets/demo1.jpg'
import { chain } from 'lodash'

import { useWindowSize } from '@vueuse/core'
import { relativePointTo } from './utils'

const stage = ref()
const layer = ref()
const isMouseDown = ref(false)

const keyStatus = reactive({
    space: false
})
const viewportSize = useWindowSize()

const configLayer = reactive({
    draggable: true,
})
const configBackground = reactive({
})

const onKeydown = (event) => {
    event.preventDefault()
    const keyCode = event.keyCode
    switch(keyCode) {
        case 32:
            keyStatus.space = configLayer.draggable = true
            break;
    }
}
const onKeyup = (event) => {
    event.preventDefault()
    const keyCode = event.keyCode
    
    switch(keyCode) {
        case 32:
            keyStatus.space = configLayer.draggable = false
            break;
    }
}

watch(() => stage?.value, (n, o) => {
    const container = n.getStage().container()
    if (!container) return 

    container.tabIndex = 1;
    container.removeEventListener('keyup', onKeyup)
    container.addEventListener('keyup', onKeyup)
    container.removeEventListener('keydown', onKeydown);
    container.addEventListener('keydown', onKeydown);
})

const configKonva = ref({
    width: viewportSize.width,
    height: viewportSize.height,
})


const selectionPos = reactive({
    x1: 0, y1: 0, x2: 0, y2: 0
})
const selectionRectConfig = reactive({
    x: 0, y: 0, width: 0, height: 0, fill: 'blue', opacity: .5, visible: false,
})

const handleMouseMove = (event) => {
    if (!!configLayer.draggable) return

    const newPos = relativePointTo(layer.value, stage.value)

    selectionPos.x2 = newPos.x
    selectionPos.y2 = newPos.y

    const { x1, y1, x2, y2 } = selectionPos
    selectionRectConfig.x = Math.min(x1, x2)
    selectionRectConfig.y = Math.min(y1, y2)
    selectionRectConfig.width = Math.abs(x2 - x1)
    selectionRectConfig.height = Math.abs(y2 - y1)
}
const handleMouseDown = (event) => {
    if (!!configLayer.draggable) return

    const newPos = relativePointTo(layer.value, stage.value)

    selectionRectConfig.width =  0
    selectionRectConfig.height = 0
    selectionPos.x1 = selectionPos.x2 = selectionRectConfig.x = newPos.x
    selectionPos.y1 = selectionPos.y2 = selectionRectConfig.y = newPos.y
    selectionRectConfig.visible = true
}
const handleMouseUp = (event) => {
    if (!!configLayer.draggable) return
    
    setTimeout(() => selectionRectConfig.visible = false, 100)
}

const handleDragMove = (e) => {
    const target = e.target
    const { width: vw, height: vh } = viewportSize
    const bounds = layer.value.getNode().getClientRect({ relativeTo: stage.value })
    const absPos = layer.value.getNode().getAbsolutePosition();
    // console.info({bounds, absPos})
    const offsetWidth = bounds.width - vw.value
    const offsetHeight = bounds.height - vh.value
    const isBiggerThanViewport = true
    if (isBiggerThanViewport) {
        if (bounds.x > 0) target.x(0)
        if (bounds.y > 0) target.y(0)
        if (bounds.x < offsetWidth * -1) target.x(offsetWidth * -1)
        if (bounds.y < offsetHeight * -1) target.y(offsetHeight * -1)
    }
}

const gridConfig = reactive({
    width: 1280, height: 700, cellHeight: 50, cellWidth: 50, thickness: 1, color: '#000',
})

const rows = computed(() => {
    const { width, height, cellWidth, cellHeight, thickness, color } = gridConfig
    const n = Math.ceil(height / cellHeight)
    console.info('rows: ', n, height, cellHeight)
    const result = chain(n).times().map(i => ({
        points: [0, Math.round(i * cellHeight), width, Math.round(i * cellHeight)],
        stroke: color,
        strokeWidth: thickness,
        __id: `row-${i}`
    })).value()
    return result
})
const cells = computed(() => {
    const { width, height, cellWidth, cellHeight, thickness, color } = gridConfig
    const n = Math.ceil(width / cellWidth)
    console.info('cells: ', n)
    const result = chain(n).times().map(i => ({
        points: [Math.round(i * cellWidth), 0, Math.round(i * cellWidth), height],
        stroke: color,
        strokeWidth: thickness,
        __id: `cell-${i}`
    })).value()
    return result
})

const image = new Image()
image.src = backgroupImage
image.onload = () => {
    configBackground.image = image
    gridConfig.width = image.naturalWidth
    gridConfig.height = image.naturalHeight
    console.info(image.naturalWidth, image.naturalHeight)
}

</script>

<template>
    <div>
    <h1>Page2 {{viewportSize.width}} - {{ configKonva.width }}</h1>
    <button @click="configLayer.draggable = !configLayer.draggable">enable draggable, current: {{configLayer.draggable}}</button>
    <v-stage :config="configKonva" ref="stage">
        <v-layer ref="layer" 
            :config='configLayer'
            @dragmove='handleDragMove'
            @mousedown="handleMouseDown" 
            @mouseup='handleMouseUp' 
            @mousemove='handleMouseMove'>
            <v-image :config="configBackground"></v-image>
            <v-group>
                <v-line v-for="row in rows" :config="row" :key="row.__id"></v-line>
                <v-line v-for="cell in cells" :config="cell" :key="cell.__id"></v-line>
            </v-group>
            <!-- <v-group>
                <v-rect v-for="(item, index) in configRects" :key="`rect-${index}`" :config="item"></v-rect>
            </v-group> -->
            <v-rect :config="selectionRectConfig"></v-rect>
        </v-layer>
    </v-stage>
</div>
</template>