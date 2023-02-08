import { createApp } from 'vue'

import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.css'
import VueKonva from 'vue-konva';

const app = createApp(App)
app.config.errorHandler = (error) => {
    console.error(error)
}
app.use(VueKonva);
app.use(Antd).mount('#app')
