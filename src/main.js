import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './tailwind.css'
import './main.css'

createApp(App).use(router).mount('#app')