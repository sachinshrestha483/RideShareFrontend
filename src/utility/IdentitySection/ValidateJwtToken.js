import jwt_decode from "jwt-decode";
import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";
import store from "@/store/index"


const ValidateJwtToken = () => {
  const validateEncryption = async () => {
    await axios
      .get(Urls.ValidateTokenEncryption)
      .then(function(response) {
        console.log("Correct Jwt Encryption");
        console.log(response);
      })
      .catch(function(error) {
        console.log("Wrongly Encrypted Jwt");
        console.log(error);
      })
      .then(function() {});
  };

  const validate = async () => {
    var token = localStorage.getItem("token");
    console.log("Token");
    console.log(token);
    try {
      var decoded = jwt_decode(token);
      console.log(decoded);
      console.log("timestamp here");

      let Currentseconds = parseInt(Math.floor(Date.now() / 1000));
     // if (decoded.exp > Currentseconds) {//changin < to >
        console.log("Token expired");
        console.log("Step 2");
        await axios
          .post(Urls.RefreshJwtToken, {
            token: localStorage.getItem("token"),
            refreshToken: localStorage.getItem("refreshToken"),
          })
          .then(function(response) {
            console.log("Refresh Token  Done");
          
            console.log(response);
            store.state.user=response.data;

            localStorage.setItem("token", response.data.token);

            localStorage.setItem("refreshToken", response.data.refreshToken);
          })
          .catch(function(error) {
            console.log(error);
            console.log("Refresh Token Error ");
            console.log("Login the User again");
          });

        console.log("Step 3");
     // } else {
       // console.log("Token Not Expired");
     // }
    } catch {
      console.log("Wrong Jwt token Logout the user");
    }

    console.log("Here is The   Validated Token");
  };

  return { validate, validateEncryption };
};

export default ValidateJwtToken;
