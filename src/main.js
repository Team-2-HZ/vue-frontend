import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import our custom CSS
// import '../src/scss/styles.scss'
// import 'bootstrap-icons/font/bootstrap-icons.css'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// import './assets/index.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
