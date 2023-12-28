<script setup>
import { useSlots } from 'vue'
import { NGradientText, NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NSpace } from 'naive-ui'

const hasHeaderSlot = !!useSlots().header
const hasFooterSlot = !!useSlots().footer
</script>

<template>
  <NSpace vertical size="large">
    <NLayout>
      <NLayoutHeader v-if="hasHeaderSlot">
        <slot name="header">
          <NGradientText type="info">
            Remote RC Club
          </NGradientText>
        </slot>
      </NLayoutHeader>
      <NLayoutContent>
        <slot />
      </NLayoutContent>
      <NLayoutFooter v-if="hasFooterSlot">
        <slot name="footer" />
      </NLayoutFooter>
    </NLayout>
  </NSpace>
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
