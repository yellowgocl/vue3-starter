import { createApp } from 'vue'
import '@/styles/reset.css'
import 'uno.css'
import '@/styles/global.scss'
import 'virtual:svg-icons-register'
import './style.css'
import App from './App.vue'
import setupRouter from '@/router'
import { setupStore } from '@/store'
import setupWorkder from '@/services/mocks'
import { common as commonUtil } from './utils'
const { setupNaiveDiscreteApi, setupGlobalProvider } = commonUtil

import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages,
  allowComposition: true
})

async function setupApp() {
  const app = createApp(App)
  app.use(i18n)
  setupStore(app)
  setupNaiveDiscreteApi()
  setupGlobalProvider(app)
  await setupWorkder()
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
