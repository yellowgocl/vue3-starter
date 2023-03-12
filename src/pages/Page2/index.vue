<script setup>
import { ref, watch, reactive, computed, nextTick } from 'vue'
import backgroupImage from '@/assets/demo2.jpg'
import { chain } from 'lodash'

import { relativePointTo } from './utils'

import { Stage, GridCover } from './konva'

const stage = ref()
const layer = ref()
const gridCover = ref()
const isMouseDown = ref(false)

const gridsConfig = reactive({
    tagItems: ["rect-1-0", "rect-1-1", "rect-1-2", "rect-1-3"],
    activeItems: ["rect-0-0", "rect-0-1"]
})

const activeItems = computed(() => {
    return [...(gridsConfig.activeItems ?? []),]
})
const tagItems = computed(() => {
    return [...gridsConfig.tagItems]
})

// const { keyStatus } = stage.value
const configLayer = reactive({
    draggable: !!stage?.value?.keyStatus?.space,
})
watch(() => stage?.value?.keyStatus?.space, (n,) => {
    configLayer.draggable = n
})
const configBackground = reactive({
})

const selectionPos = reactive({
    x1: 0, y1: 0, x2: 0, y2: 0
})
const selectionRectConfig = reactive({
    x: 0, y: 0, width: 0, height: 0, fill: 'blue', opacity: .5, visible: false,
})

const currentStage = computed(() => stage?.value?.stage)
const layerPosition = reactive({ x: 0, y: 0 })
const layerViewport = computed(() => {
    const absPos = layerPosition;
    const { width = 0, height = 0 } = stage.value?.viewport || {}
    return { ...absPos, height: height.value, width: width.value }
})

const handleMouseMove = (event) => {
    if (!!configLayer.draggable) return
    const newPos = relativePointTo(layer.value, currentStage.value)

    selectionPos.x2 = newPos.x
    selectionPos.y2 = newPos.y

    const { x1, y1, x2, y2 } = selectionPos
    selectionRectConfig.x = Math.min(x1, x2)
    selectionRectConfig.y = Math.min(y1, y2)
    selectionRectConfig.width = Math.abs(x2 - x1)
    selectionRectConfig.height = Math.abs(y2 - y1)
}
const handleMouseDown = (event) => {
    const button = event.evt.button
    if (!!configLayer.draggable || button !== 0) return

    const newPos = relativePointTo(layer.value, currentStage.value)

    selectionRectConfig.width =  0
    selectionRectConfig.height = 0
    selectionPos.x1 = selectionPos.x2 = selectionRectConfig.x = newPos.x
    selectionPos.y1 = selectionPos.y2 = selectionRectConfig.y = newPos.y
    selectionRectConfig.visible = true
}
const handleMouseUp = (event) => {
    const button = event.evt.button
    if (!!configLayer.draggable || button !== 0) return
    
    // const selectedRect = { ...selectionRectConfig, x: layerPosition.x + selectionRectConfig.x, y: layerPosition.y + selectionRectConfig.y }
    const selectedRect = { ...selectionRectConfig }
    const intersections = gridCover.value.getIntersections?.(selectedRect)
    const intersectionsId = chain(intersections?.map((attrs) => attrs?.id)).filter(Boolean).xor(gridsConfig.activeItems).uniq().value()
    // console.info(selectedRect, layerPosition, {...selectionRectConfig})
    gridsConfig.activeItems = intersectionsId// intersections?.map((attrs) => attrs?.id)
    nextTick(() => selectionRectConfig.visible = false)
}

const handleDragMove = (e) => {
    const { viewport: viewportSize } = stage.value
    const target = e.target
    const { width: vw, height: vh } = viewportSize
    const bounds = layer.value.getNode().getClientRect({ relativeTo: currentStage.value })
    const absPos = layer.value.getNode().getAbsolutePosition();
    const offsetWidth = bounds.width - vw.value
    const offsetHeight = bounds.height - vh.value
    const isBiggerThanViewport = true
    if (isBiggerThanViewport) {
        if (bounds.x > 0) target.x(0)
        if (bounds.y > 0) target.y(0)
        if (bounds.x < offsetWidth * -1) target.x(offsetWidth * -1)
        if (bounds.y < offsetHeight * -1) target.y(offsetHeight * -1)
    }
    layerPosition.x = target.x()
    layerPosition.y = target.y()
}

const gridConfig = reactive({
    width: 960, height: 560, cellHeight: 80, cellWidth: 80, thickness: 1, color: '#000',
})

const image = new Image()
image.src = backgroupImage
image.onload = () => {
    configBackground.image = image
    gridConfig.width = image.naturalWidth
    gridConfig.height = image.naturalHeight
    gridConfig.inited = true
}

const handleContextMenu = (e) => {
    console.info(e)
}

</script>

<template>
    <div>
    <h1>Page2</h1>
    <button @click="configLayer.draggable = !configLayer.draggable">enable draggable, current: {{configLayer.draggable}}</button>
    <Stage ref="stage" @right-click="handleContextMenu">
        <v-layer ref="layer" 
            :config='configLayer'
            @dragmove='handleDragMove'
            @dragend="handleDragMove"
            @mousedown="handleMouseDown" 
            @mouseup='handleMouseUp' 
            @mousemove='handleMouseMove'>
            <v-image :config="configBackground"></v-image>
            <GridCover 
                v-if="!!gridConfig.inited" 
                ref="gridCover" 
                :active-items="activeItems"
                :tag-items="tagItems"
                :viewport="layerViewport"
                :width="gridConfig.width" 
                :height="gridConfig.height"></GridCover>
            <!-- <v-group>
                <v-line v-for="row in rows" :config="row" :key="row.__id"></v-line>
                <v-line v-for="cell in cells" :config="cell" :key="cell.__id"></v-line>
            </v-group> -->
            <!-- <v-group>
                <v-rect v-for="(item, index) in configRects" :key="`rect-${index}`" :config="item"></v-rect>
            </v-group> -->
            <v-rect :config="selectionRectConfig"></v-rect>
        </v-layer>
    </Stage>
</div>
</template>