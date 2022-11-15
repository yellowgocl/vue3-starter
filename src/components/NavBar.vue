<script setup>
import {useRoute, useRouter} from 'vue-router'
import { NavBar } from 'vant';
import { ref, defineAsyncComponent, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const currentPath = ref(window.location.hash)
const currentRoute = useRoute()
const router = useRouter()
const currentView = computed(() => {
  return RouterView[currentPath.value.slice(1) || '/'] || NotFound
})
const isHome = computed(() => currentRoute.name === 'index')

const onClickLeft=(e)=>{
  console.log(currentPath)
  router.back()
}
</script>

<template>
  <div class="navBar">
    <NavBar :safe-area-inset-top="true" :title="currentRoute?.meta?.title"  :left-text="!isHome && '返回'" :left-arrow="!isHome"  @click-left="onClickLeft"/>
  </div>
</template>

<style scoped>

/* .van-icon-arrow-left:before{color:var(--van-button-primary-color);}
.navBar .van-nav-bar{color:var(--van-button-primary-color);}
.van-nav-bar{background-color: var(--van-nav-bar-text-color);}
.van-nav-bar{color:var(--van-button-primary-color);} */
</style>
