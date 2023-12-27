<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })
</script>
<template>
    <common-page slim>
        <div md:block>
            <img src="@/assets/images/landing-bg.png" w-full alt="login_banner" />
        </div>
    </common-page>
</template>