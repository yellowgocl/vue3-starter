<script setup>
import { useSlots } from 'vue';
import { NGradientText, NSpace, NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui'

const hasHeaderSlot = !!useSlots().header
const hasFooterSlot = !!useSlots().footer
</script>
<template>
    <n-space vertical size="large">
        <n-layout>
            <n-layout-header v-if="hasHeaderSlot">
                <slot name="header">
                    <n-gradient-text type="info">
                        Remote RC Club
                    </n-gradient-text>
                </slot>
            </n-layout-header>
            <n-layout-content>
                <slot></slot>
            </n-layout-content>
            <n-layout-footer v-if="hasFooterSlot">
                <slot name="footer">
                </slot>
            </n-layout-footer>
        </n-layout>
    </n-space>
</template>
<style>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>