import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from "@/views/Dashboard.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
  ,
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
  ,
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
