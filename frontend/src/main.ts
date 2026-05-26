import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router/index.ts'
import './assets/main.css'

const app = createApp(App)

app.use(router)

// Подключаем PrimeVue с тёмной темой Aura
// .app-dark стоит на <html> в index.html — это включает тёмный режим
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})

app.mount('#app')
