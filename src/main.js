import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index2.js'
import store from './store/index.js'
import '@/assets/tailwind.css'

createApp(App).use(router).use(store).mount('#app')