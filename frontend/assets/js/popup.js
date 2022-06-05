import { createApp } from 'vue'
import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {createRouter, createWebHistory} from 'vue-router'
import Popup from './components/Popup.vue'
import Home from './views/Home.vue'
import BanList from './views/BanList.vue'
import Support from './views/Support.vue'
import Scan from './views/Scan.vue'


const router = createRouter({
    history: createWebHistory('popup.html'),
    routes: [
        {
            path: '/', name: 'Home', component: Home 
        },
        {
            path: '/banList', name: 'BanList', component: BanList 
        },
        {
            path: '/support', name: 'Support', component: Support 
        },
        {
            path: '/scan', name: 'Scan', component: Scan
        }
    ]
})

createApp(Popup)
.use(VueAxios, axios)
.use(router)
.mount('#app')