<script setup>
    import { ref, defineAsyncComponent  } from 'vue'
    const Page1 = defineAsyncComponent (() => import(/* webpackChunkName: "tabs-page1" */ './Page1/index.vue'))
    const Page2 = defineAsyncComponent (() => import(/* webpackChunkName: "tabs-page2" */ './Page2/index.vue'))
    const Page3 = defineAsyncComponent (() => import(/* webpackChunkName: "tabs-page3" */ './Page3/index.vue'))

    const activeKey = ref('3')

</script>

<template>
<div>
    <a-tabs v-model:activeKey="activeKey" centered  :tabBarGutter="100">
      <a-tab-pane key="1" tab="Tab 1" style="height: 200px"><Page1/></a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render><Page2/></a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3"><Page3 /></a-tab-pane>
    </a-tabs>
</div>
</template>

<style scoped>
.page {
    height: 100vh;
}
.ant-tabs {
    height: 100%;
}

:deep(.ant-tabs-content-holder) {
    height: 100vh;
    overflow-y: scroll;
}
</style>