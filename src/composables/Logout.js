import Store from "../store/index"
import { useRouter } from 'vue-router';


const logout=()=>{
Store.state.user=null;
localStorage.removeItem("token");
localStorage.removeItem("refreshToken");


}


export default {logout}