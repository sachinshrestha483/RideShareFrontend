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
import SubCarSharePrefrenceSettings from "@/views/Admin/SubCarSharePrefrenceSettings.vue"
import VehicleType from "@/views/Admin/VehicleType.vue"
import Vehicle from "@/views/Vehicle"
import EditVehicle from "@/views/EditVehicle"
import UserPublicProfileWithId from "@/views/UserPublicProfileWithId"
import OfferRide from "@/views/Rides/OfferRide"
import PublishRide from "@/views/Rides/PublishRide"
import FindRide from "@/views/Rides/FindRide"
import YourRide from "@/views/Rides/YourRide"
import YourRidesRide from "@/views/Rides/YourRides/Ride"
import YourRidePath from "@/views/Rides/YourRides/RideRoute"
import FindRideInfo from "@/views/Rides/FindRideInfo.vue"
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
  },
  {
    path: '/Admin/SubCarSharePrefrenceSettings',
    name: 'SubCarSharePrefrenceSettings',
    component: SubCarSharePrefrenceSettings
  },
  {
    path: '/Admin/VehicleType',
    name: 'VehicleTypeSettings',
    component: VehicleType
  },
  {
    path: '/user/Vehicle',
    name: 'UserVehicle',
    component: Vehicle
  },
  {
    path: '/user/EditVehicle',
    name: 'UserEditVehicle',
    component: EditVehicle
  }
  ,
  {
    path: '/public/UserProfile/:id',
    name: 'UserPublicProfileWithId',
    component: UserPublicProfileWithId
  },
  {
    path:"/OfferRide",
    name:"OfferRide",
    component:OfferRide
  },
  {
  path:"/PublishRide",
  name:"PublishRide",
  component:PublishRide
  },
  {
  path:"/FindRide",
  name:"FindRide",
  component:FindRide
  },
  {
    path:"/YourRides", 
    name:"YourRide",
    component:YourRide
  },
  {
    path:"/YourRides/Ride/:id",
    name:"YourRidesRide",
    component:YourRidesRide
  },
  {
    path:"/YourRides/RidePath/:id/:zoomlat/:zoomlon",
    name:"YourRidepath",
    props: true,
    component:YourRidePath,
  },
  {
    path:"/FindRides/:id/:startLocationName/:startLat/:startLon/:endLocationName/:endLat/:endLon/:numofPassengers",
    name:"YourRidepath",
    props: true,
    component:FindRideInfo,
  }
] 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
