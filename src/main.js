import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import our custom CSS
import '../src/scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(router);

app.mount('#app');