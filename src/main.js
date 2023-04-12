import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

import Home from './components/Home.vue';
import Weather from './components/Weather.vue';

import './assets/main.css';

const routes = [
    { path: '/', component: Home },
    { path: '/weather', component: Weather }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

createApp(App).use(router).mount('#app');
