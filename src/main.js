import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const eventBus = mitt()

const app = createApp(App)
app.config.globalProperties.$bus = eventBus
app.use(vuetify).mount('#app')