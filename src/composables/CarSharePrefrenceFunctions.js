import Urls from "@/utility/IdentitySection/Urls";
import axios from "axios";
import Store from "../store/index";

const CarSharePrefrence = () => {

const getCarSharePrefrence=async ()=>{
let carSharePrefrences= [];
   await  axios.get(Urls.GetTravelPrefrences)
    .then(function (response) {
      // handle success
      console.log(response);
      carSharePrefrences=response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
return carSharePrefrences;

}


return {getCarSharePrefrence}
}



export default CarSharePrefrence;


