import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import services, { service }  from './services'

// Start the mocking conditionally.
if (import.meta.env.MODE === 'mock') {
    import('./services/mocks').then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass',
      })
    })
}

import 'vant/lib/index.css';
import './assets/main.css'

const app = createApp(App)
app.provide('service', service)
app.provide('services', services)

app.use(router)

app.mount('#app')
