<script setup>
import { ref } from 'vue';
import { Tag, Popover, Button } from 'ant-design-vue'
import { times } from 'lodash';

const anchors = times(10, Number)
const isVisibleAnchorsPane = ref(false)
</script>

<template>
    <h1>Page1</h1>
    <Popover v-model="isVisibleAnchorsPane" trigger="click">
        <template #content>
            <div class="anchors">
                <Tag class="tag" v-for="(i, j) in anchors" :key="`anchor-${j}`">{{ i }}</Tag>
            </div>
        </template>
        <Button type="primary" @click="isVisibleAnchorsPane = !isVisibleAnchorsPane">Click me</Button>
    </Popover>
</template>
<style scoped>
.anchors {
    min-width: 200px;
    max-width: 300px;
}
.anchors > .tag {
    margin-bottom: 12px;
}
</style>