<script setup>
import {useRoute, useRouter} from 'vue-router'
import { NavBar, Sticky } from 'vant';
import { ref, defineAsyncComponent, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const currentPath = ref(window.location.hash)
const currentRoute = useRoute()
const router = useRouter()
//当前页面路由路径
const currentView = computed(() => {
  return RouterView[currentPath.value.slice(1) || '/'] || NotFound
})
//是否有返回按钮
const isHome = computed(() => currentRoute.name === 'index'||currentRoute.name === 'login')
//返回按钮方法
const onClickLeft=(e)=>{
  console.log(currentPath)
  router.back()
}
</script>

<template>
  <div class="navBar">
    <Sticky>
      <NavBar :safe-area-inset-top="true" :title="currentRoute?.meta?.title"  :left-text="!isHome && '返回'" :left-arrow="!isHome"  @click-left="onClickLeft"/>
    </Sticky>
  </div>
</template>

<style scoped>

/* .van-icon-arrow-left:before{color:var(--van-button-primary-color);}
.navBar .van-nav-bar{color:var(--van-button-primary-color);}
.van-nav-bar{background-color: var(--van-nav-bar-text-color);}
.van-nav-bar{color:var(--van-button-primary-color);} */
</style>
