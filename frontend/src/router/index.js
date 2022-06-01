import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
      {
        path: '/', name: 'Home', component: Home
      },
      {
          path: '/hello', name: 'hello', component: () => import('../views/HelloWorld.vue')
      }
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router