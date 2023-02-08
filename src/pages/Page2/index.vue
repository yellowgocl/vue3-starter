<script setup>
import { ref, watch } from 'vue'
import backgroupImage from '@/assets/demo1.jpg'

const configBackground = ref({
    draggable: true,
})
const image = new Image()
image.src = backgroupImage
image.onload = () => {
    configBackground.value.image = image
}

const stage = ref()
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
</script>

<template>
    <h1>Page2</h1>
    <v-stage :config="configKonva" ref="stage">
        <v-layer>
            <v-circle :config="configCircle"></v-circle>
            <v-image :config="configBackground"></v-image>
        </v-layer>
    </v-stage>
</template>