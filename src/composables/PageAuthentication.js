import Store from "@/store/index";
import { useRouter } from "vue-router";


const AuthAndAuthorization = () => {
    
    const user = Store.state.user;
    const navrouter = useRouter();

    const Authorize = ({ userId }) => {
       if ( userId!=null &&   userId != user.id   ) {
          navrouter.push({ name: "Home" });
        }
    }
    const Authenticate = () => {
        if (user == null) {
            navrouter.push({ name: "Home" });
        }

    
    }
    const ReidrectToHome=()=>{
        navrouter.push({ name: "Home" });
     }
    return { Authorize, Authenticate,ReidrectToHome }
}



// let authorize= {userId:null, roleId:null}




export default AuthAndAuthorization