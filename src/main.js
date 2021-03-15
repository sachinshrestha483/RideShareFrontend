import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../public/styles.css';
import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";
import ValidateJwtToken from "@/utility/IdentitySection/ValidateJwtToken";
import axiosConfiguration from "@/configurations/axiosConfiguration"


createApp(App).use(store).use(router,axios).mount('#app')
