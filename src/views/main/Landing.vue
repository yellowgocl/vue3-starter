<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })
</script>
<template>
    <common-page slim>
        <div >
            <div relative>
                <article class="absolute top-20 left-8 right-40">
                    <img src="@/assets/images/logo-lg.png" class='w-[120px] block mb-4' alt="login_banner" />
                    <span whitespace-pre-line v-t="'landing.page-1.descript'"></span>
                </article>
                <img src="@/assets/images/landing-bg.png" w-full alt="login_banner" />
            </div>
        </div>
    </common-page>
</template>