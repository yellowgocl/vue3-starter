<script setup>
import { reactive, computed, watch, watchEffect, onMounted, ref, nextTick } from 'vue'
import Konva from 'konva'
const group = ref()
const props = defineProps({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    itemSize: {
        type: Object,
        validator: (value) => (!value || (value?.width && value?.height)),
        default: (rawProps) => ({ width: 50, height: 50 })
    },
    viewport: { type: Object },
    activeItems: { type: Array },
    tagItems: { type: Array }
})
const config = reactive({})

onMounted(() => {
  nextTick(() => group.value.getNode().cache());
})

const viewportRect = computed(() => {
  // const { width: vw, height: vh } = props.viewport
  // console.info({vh,vw})
  return { ...props.viewport }
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
      const itemWith = (x === col && (width % rw !== 0) ? width % rw : rw)
      const itemHeight = (y === row && (height % rh !== 0) ? height % rh : rh)
      const id = `rect-${x}-${y}`
      const isActived = !!props.activeItems?.find((v) => v === id)
      const isTag = !!props.tagItems?.find((v) => v === id)
      const fill = isTag ? 'blue' : (isActived ? 'green' : 'red')
      const opacity = isTag ? .5 : .3
      result.push({
        id ,
        isActived,
        isTag,
        x: x * itemWith,
        y: y * itemHeight,
        width: itemWith,
        height: rh,
        fill,
        opacity,
        stroke: 'black',
        strokeWidth: 1,
      })
    }
  }
  return result
})
const activeRects = computed(() => {
  const source = rects.value
  const viewportRectConfig = viewportRect.value
  // console.info({viewportRectConfig})
  const result = source?.filter(({x, y, width, height, id}) => {
    const rectBounds = { x: x + viewportRectConfig.x, y: y + viewportRectConfig.y, width, height }
    const visibility = Konva.Util.haveIntersection({ ...viewportRectConfig, x: 0, y:0 }, rectBounds) 
    // console.info({id, rectBounds, visibility, viewportRectConfig})
    return visibility
  })
  // console.info({result, children: group.value?.getNode?.().getChildren?.(), activeItems: props.activeItems})
  return result
})
watch(() => activeRects.value, (n, o) => {
  // group.value.getNode().clearCache()
  nextTick(() => group.value.getNode().cache())
})
// watch(() => activeRects, (n, o) => {
//   console.info({n, o})
//   group.value.getLayer?.().batchDraw?.()
// })
const getIntersections = (rect) => {
  const children = activeRects.value
  const childrenInRect = children.filter((v) => {
    return Konva.Util.haveIntersection(rect, v)
  })
  return childrenInRect
  // const children = group.value.getNode().getChildren()
  // const childrenInRect = children.filter((v) => Konva.Util.haveIntersection(rect, v.getClientRect()))
  // return childrenInRect
}


defineExpose({getIntersections})

</script>
<template>
<v-group ref="group">
  <v-rect v-for="rect in activeRects" v-bind="rect" :key="rect.id" ></v-rect>
</v-group>
<!-- <v-group>
  <v-text v-for="rect in activeRects" :text="`${rect.id}, x:${rect.x}, y:${rect.y}`" v-bind="rect" :stroke="'white'" :opacity="1" :key="`text-${rect.id}`" ></v-text>
</v-group> -->
</template>