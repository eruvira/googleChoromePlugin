import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import Popup from './components/Popup.vue'
import Home from './views/Home.vue'
import BanList from './views/BanList.vue'
import Support from './views/Support.vue'


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
        }
    ]
})

createApp(Popup)
.use(router)
.mount('#app')