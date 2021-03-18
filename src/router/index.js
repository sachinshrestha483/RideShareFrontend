import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from "@/views/Dashboard.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import Store from "../store/index"
import MemberVerification from "@/views/MemberVerification.vue"
import VerifyEmail from "@/views/Identity/VerifyEmail.vue"
import VerifyPhone from "@/views/Identity/VerifyPhone.vue"
import PublicProfile from "@/views/PublicProfile.vue"
import AddProfilePicture from "@/views/Identity/AddProfilePicture.vue"
import CarSharePrefrence from "@/views/CarSharePrefrence.vue"
import CarSharePrefrenceSettings from "@/views/Admin/CarSharePrefrenceSettings.vue"
import Admin from "@/views/Admin/Admin.vue"


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
    path: '/Dashboard/MemberVerification',
    name: 'MemberVerification',
    component: MemberVerification
  },
  {
    path: '/Dashboard/VerifyEmail',
    name: 'VerifyEmail',
    component: VerifyEmail
  },
  {
    path: '/Dashboard/VerifyPhone',
    name: 'VerifyPhone',
    component: VerifyPhone
  },
  {
    path: '/user/show',
    name: 'PublicProfile',
    component: PublicProfile
  }
  ,
  {
    path: '/dashboard/profile/picture',
    name: 'ProfilePicture',
    component: AddProfilePicture
  }
  ,
  {
    path: '/user/CarSharePrefrence',
    name: 'CarSharePrefrence',
    component: CarSharePrefrence
  },
{
  path: '/Admin/',
    name: 'Admin',
    component: Admin
},

  {
    path: '/Admin/CarSharePrefrenceSettings',
    name: 'CarSharePrefrenceSettings',
    component: CarSharePrefrenceSettings
  }

  
] 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
