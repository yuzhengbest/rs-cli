import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import router from './router/index'
import ElementPlus from '@/plugins/ElementPlus'
import ElementPlusIcons from '@/plugins/ElementPlusIcons'
import globalComponents from '@/components/index'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(ElementPlusIcons)
app.use(globalComponents)

app.mount('#app')
