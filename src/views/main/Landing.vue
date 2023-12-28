<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <common-page slim>
    <div>
      <div relative>
        <article class="absolute left-8 right-40 top-20">
          <img src="@/assets/images/logo-lg.png" class="mb-4 block w-[120px]" alt="login_banner">
          <span v-t="'landing.page-1.descript'" whitespace-pre-line />
        </article>
        <img src="@/assets/images/landing-bg.png" w-full alt="login_banner">
      </div>
    </div>
  </common-page>
</template>
