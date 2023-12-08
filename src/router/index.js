import { createRouter, createWebHistory } from 'vue-router'
import common from './common'
import user from './user'
import event from './event'
const routes = [...common, ...user, ...event]
const router = new createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next();
})

router.afterEach((to, from) => {
    const title = to.meta.title
    if (title) {
        window.document.title = title
    }
})

export default router