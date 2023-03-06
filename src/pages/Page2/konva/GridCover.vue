<script setup>
import { reactive, computed, onMounted, ref, nextTick } from 'vue'
import Konva from 'konva'
const group = ref()
const props = defineProps({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    itemSize: {
        type: Object,
        validator: (value) => (!value || (value?.width && value?.height)),
        default: (rawProps) => ({ width: 50, height: 50 })
    }
})
const config = reactive({

})

onMounted(() => {
  setTimeout(() => group.value.getNode().cache(), 1000);
})

const rectWidth = computed(() => props.itemSize?.width || 50)
const rectHeight = computed(() => props.itemSize?.height || 50)
const numCols = computed(() => Math.ceil(props.width / rectWidth.value))
const numRows = computed(() => Math.ceil(props.height / rectHeight.value))

const rects = computed(() => {
  const width = props.width
  const height = props.height
  const row = numRows.value
  const col = numCols.value
  const rw = rectWidth.value
  const rh = rectHeight.value
  const result = []
  for (let x = 0; x < col; x++) {
    for (let y = 0; y < row; y++) {
      const itemWith = (x === col - 1 && width % rw !== 0) ? width % rw : rw
      const itemHeight = (y === row - 1 && height % rh !== 0) ? height % rh : rh
      result.push({
        id: `rect-${x}-${y}`,
        x: x * itemWith,
        y: y * itemHeight,
        width: itemWith,
        height: rh,
        fill: 'red',
        opacity: .5,
        stroke: 'black',
        strokeWidth: 1,
      })
    }
  }
  return result
})

const getIntersections = (rect) => {
  const children = group.value.getNode().getChildren()
  const childrenInRect = children.filter((v) => Konva.Util.haveIntersection(rect, v.getClientRect()))
  return childrenInRect
}


defineExpose({getIntersections})

</script>
<template>
<v-group ref="group">
  <v-rect v-for="rect in rects" v-bind="rect" :key="rect.id" ></v-rect>
</v-group>
</template>