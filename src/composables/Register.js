import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";
import HttpResponseObject from "@/utility/objects/HttpResponseObject";

const register = async (firstName, lastName, email, phone, password) => {
  let objSubmitted = true;
  const httpResponseObject = new HttpResponseObject();

  const post = {
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email,
    phone: phone,
  };

  await axios
    .post(Urls.Login, post)
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
};

export default { register };
