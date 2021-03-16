import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";
import HttpResponseObject from "@/utility/objects/HttpResponseObject";


import store from "../store/index"


const login = async (email,password) => {

  const httpResponseObject = new HttpResponseObject();

  const post = {
    email: email,
    password: password,
  };
await   axios
    .post(Urls.Authenticate, post)
    .then(function(response) {
      console.log(response);
      console.log("data");

      if (response.status != 200) {
        console.log("Error Occured");
      }
      console.log(response.data);
     store.state.user=response.data;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    })
    .catch(function(error) {
      console.log(error);
  httpResponseObject.haveError = true;
      httpResponseObject.errorMessage ="Email Or Password Not Correct";

    });

    return httpResponseObject
};


export default login;