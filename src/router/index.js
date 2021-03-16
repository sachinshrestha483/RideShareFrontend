import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from "@/views/Dashboard.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import Store from "../store/index"
import MemberVerification from "@/views/MemberVerification.vue"


const requireAuth =(to,from,next)=>{
  let user= Store.state.user;



  console.log("Current User in Auth Guard is:"+user)
  if(user==null){
    next({name:'Home'})// check if user there 
  
  }
   
  next() 
  
  }
  



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter:requireAuth

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
  },
  {
    path: '/MemberVerification',
    name: 'MemberVerification',
    component: MemberVerification
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
