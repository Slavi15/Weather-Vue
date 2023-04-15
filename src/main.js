import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoLocationPin, WiCelsius, WiRaindrop, WiCloudDown, WiStrongWind, CoChevronLeft, CoChevronRight, WiDaySunny, WiRain, WiCloudy, WiDayCloudy } from "oh-vue-icons/icons";

addIcons(CoLocationPin, WiCelsius, WiRaindrop, WiCloudDown, WiStrongWind, CoChevronLeft, CoChevronRight, WiDaySunny, WiRain, WiCloudy, WiDayCloudy);

import Home from './components/Home.vue';
import Weather from './components/Weather.vue';

import './assets/main.css';

const routes = [
    { path: '/', component: Home },
    { path: '/weather/:location', component: Weather }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

createApp(App).use(router).component('v-icon', OhVueIcon).mount('#app');
