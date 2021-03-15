import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";

const register = async (id, password) => {

    let formSubmitted=true;

  const post = {
    name: id,
    password: password,
  };

 await  axios
    .post(Urls.Login, post)
    .then(function(response) {
      console.log(response);
      console.log("data");
    })
    .catch(function(error) {
      formSubmitted=false;
      console.log(error);
    });
    return formSubmitted;

};

export default { register };
