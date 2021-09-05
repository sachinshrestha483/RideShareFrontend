import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";
import HttpResponseObject from "@/utility/objects/HttpResponseObject";



const PublishRide=async( ride)=>{

    await axios
    .post(Urls.AddRide, ride)
    .then(function(response) {
      console.log(response);
      console.log("data");
    })
    .catch(function(error) {
      objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try{
        httpResponseObject.errorMessage = error.response.data.message;

      }
      catch{
        httpResponseObject.errorMessage = null;

      }
      // error.response is where we got oir response
    });

  httpResponseObject.haveError = !objSubmitted;
  httpResponseObject.responseObject;

  return httpResponseObject;    

}



export  { PublishRide};
