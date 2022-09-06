import { createApp } from 'vue'

import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.css'
const app = createApp(App)
app.config.errorHandler = (error) => {
    console.error(error)
}
app.use(Antd).mount('#app')
