<script setup>

</script>
<template>
    <n-space vertical size="large">
        <n-layout>
            <n-layout-header>
                <n-gradient-text type="info">
                    Remote RC Club
                </n-gradient-text>
            </n-layout-header>
            <n-layout-content content-style="padding: 24px;">
                <router-view></router-view>
            </n-layout-content>
            <n-layout-footer>Chengfu Road</n-layout-footer>
        </n-layout>
    </n-space>
</template>