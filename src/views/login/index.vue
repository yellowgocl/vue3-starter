<script setup>
import { useStorage } from '@vueuse/core'
import { auth, storage } from '@/utils'
import { useFetch } from '@/hooks'
import bgImg from '@/assets/images/login_bg.jpg'

// import api from './api'
import { addDynamicRoutes } from '@/router'

const { lStorage } = storage
const { setToken } = auth

const title = '活动平台'// import.meta.env.VITE_TITLE

const router = useRouter()
const { query } = useRoute()
const api = inject('api')
const [login, loginState, loginActions] = useFetch(api['auth/login'])

const loginInfo = ref({
  name: '',
  password: '',
})

function initLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    loginInfo.value.name = localLoginInfo.name || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}

initLoginInfo()

const isRemember = useStorage('isRemember', false)
const loading = ref(false)
async function handleLogin() {
  const { name, password } = loginInfo.value
  if (!name || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    loading.value = true
    $message.loading('正在验证...')
    const res = await login({ name, password: password.toString() })
    $message.success('登录成功')
    setToken(res.data.token)
    if (isRemember.value)
      lStorage.set('loginInfo', { name, password })
    else
      lStorage.remove('loginInfo')

    await addDynamicRoutes()
    if (query.redirect) {
      const path = query.redirect
      Reflect.deleteProperty(query, 'redirect')
      router.push({ path, query })
    }
    else {
      router.push('/')
    }
  }
  catch (error) {
    console.error(error)
    $message.removeMessage()
  }
  loading.value = false
}
</script>

<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div
      style="transform: translateY(25px)"
      class="m-auto max-w-150 min-w-90 f-c-c rounded-3 bg-white bg-opacity-60 p-4 card-shadow"
      dark:bg-dark
    >
      <div hidden w-95 px-5 py-8 md:block>
        <img src="@/assets/images/login_banner2.svg" w-full alt="login_banner">
      </div>

      <div w-80 flex-col px-5 py-8>
        <h5 f-s-c text-5 font-normal color="#6a6a6a">
          <img src="@/assets/images/logo.png" height="40" class="mr-2">
          {{ title }}
        </h5>
        <div mt-8>
          <n-input
            v-model:value="loginInfo.name"
            autofocus
            class="h-12 items-center text-4"
            placeholder="name"
            :maxlength="20"
          >
            <template #prefix>
              <icon-material-symbols:account-circle-outline class="mr-2 text-5 opacity-40" />
            </template>
          </n-input>
        </div>
        <div mt-8>
          <n-input
            v-model:value="loginInfo.password"
            class="h-12 items-center text-base"
            type="password"
            show-password-on="mousedown"
            placeholder="password"
            :maxlength="20"
            @keydown.enter="handleLogin"
          >
            <template #prefix>
              <icon-ri:lock-password-line class="mr-2 text-5 opacity-8" />
            </template>
          </n-input>
        </div>

        <div mt-5>
          <n-checkbox
            :checked="isRemember"
            label="记住我"
            :on-update:checked="(val) => (isRemember = val)"
          />
        </div>

        <div mt-4>
          <n-button
            h-12
            w-full
            rounded-2
            text-base
            type="primary"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </div>
      </div>
    </div>
  </AppPage>
</template>
