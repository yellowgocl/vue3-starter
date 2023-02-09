<script setup>
import { ref, watch, reactive } from 'vue'
import backgroupImage from '@/assets/demo1.jpg'

const stage = ref()
const layer = ref()
console.info(Konva)
const isMouseDown = ref(false)

const configLayer = reactive({
    draggable: false,
})
const configBackground = reactive({
    draggable: false,
})
const image = new Image()
image.src = backgroupImage
image.onload = () => {
    configBackground.image = image
}

watch(() => stage?.value, (n, o) => {
    console.info(n.getStage().container())
})
const configKonva = ref({
    width: window.innerWidth,
    height: window.innerHeight,
})
const configCircle = ref({
    x: 100,
    y: 100,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
})
const configRects = ref([{
    x: 100,
    y: 100,
    width: 70,
    height: 70,
    fill: "red",
    stroke: "black",
    name: 'rect',
    strokeWidth: 4
}, {
    x: 170,
    y: 100,
    width: 70,
    height: 70,
    fill: "red",
    stroke: "black",
    name: 'rect',
    strokeWidth: 4
},])
const selectionPos = reactive({
    x1: 0, y1: 0, x2: 0, y2: 0
})
const selectionRectConfig = reactive({
    x: 0, y: 0, width: 0, height: 0, fill: 'blue', opacity: '.5', visible: false,
})
const handleMouseMove = (event) => {
    const pos = stage.value.getNode().getPointerPosition()
    selectionPos.x2 = pos.x
    selectionPos.y2 = pos.y

    const { x1, y1, x2, y2 } = selectionPos
    selectionRectConfig.x = Math.min(x1, x2)
    selectionRectConfig.y = Math.min(y1, y2)
    selectionRectConfig.width = Math.abs(x2 - x1)
    selectionRectConfig.height = Math.abs(y2 - y1)
}
const handleMouseDown = (event) => {
    const pos = stage.value.getNode().getPointerPosition()
    selectionRectConfig.width =  0
    selectionRectConfig.height = 0
    selectionPos.x1 = selectionPos.x2 = selectionRectConfig.x = pos.x
    selectionPos.y1 = selectionPos.y2 = selectionRectConfig.y = pos.y
    selectionRectConfig.visible = true
}
const handleMouseUp = (event) => {
    setTimeout(() => selectionRectConfig.visible = false, 100)
}
</script>

<template>
    <h1>Page2</h1>
    <button @click="configLayer.draggable = !configLayer.draggable">enable draggable, current: {{configLayer.draggable}}</button>
    <v-stage :config="configKonva" ref="stage">
        <v-layer ref="layer" :config='configLayer' @mousedown="handleMouseDown" @mouseup='handleMouseUp' @mousemove='handleMouseMove'>
            <v-circle :config="configCircle"></v-circle>
            <v-image :config="configBackground"></v-image>
            <v-group>
                <v-rect v-for="(item, index) in configRects" :key="`rect-${index}`" :config="item"></v-rect>
            </v-group>
            <v-rect :config="selectionRectConfig"></v-rect>
        </v-layer>
    </v-stage>
</template>