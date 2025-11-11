import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { useAuthStore } from './stores/auth'

import 'primeicons/primeicons.css'
import './assets/styles/variables.css'
import './assets/styles/primevue-custom.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue)

// Inicializar autenticación
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
