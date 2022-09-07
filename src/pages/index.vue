<script setup>
    import { ref, defineAsyncComponent, computed } from 'vue'
    import ErrorWrapper from '@/components/ErrorWrapper.vue';
    import { ERROR_TYPES, DIRECTION } from '@/constants/types'

    // import ErrorWrapperExample from './ErrorWrapperExample.vue'
    const Page1 = defineAsyncComponent (() => import(/* webpackChunkName: "tabs-page1" */ './Page1/index.vue'))
    const Page2 = defineAsyncComponent (() => import(/* webpackChunkName: "tabs-page2" */ './Page2/index.vue'))
    const Page3 = defineAsyncComponent (() => import(/* webpackChunkName: "tabs-page3" */ './Page3/index.vue'))

    const errorWrapper = ref()
    const error = ref()
    const activeKey = ref('3')

    const handleOk = () => {
        error.value = null
    }

    const hasError = computed(() => !!error.value)


</script>

<template>
<div class="page">
    <ErrorWrapper v-model:error="error" ref="errorWrapper" :type="ERROR_TYPES.NONE" >
        <a-tabs v-model:activeKey="activeKey" centered  :tabBarGutter="100">
            <a-tab-pane key="1" tab="Tab 1" style="height: 200px"><Page1/></a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render><Page2/></a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3"><Page3 /></a-tab-pane>
        </a-tabs>
        <a-modal v-model:visible="hasError" title="Something went wrong" @ok="handleOk">
            {{error}}
        </a-modal>
    </ErrorWrapper>
</div>
</template>

<style scoped>
.page {
    padding: 12px 24px;
}
.ant-tabs {
    height: 100%;
}

:deep(.ant-tabs-content-holder) {
    height: 100vh;
    overflow-y: scroll;
}
</style>