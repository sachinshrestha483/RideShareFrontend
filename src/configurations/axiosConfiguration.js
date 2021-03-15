import Urls from "@/utility/IdentitySection/Urls";
import ValidateJwtToken from "@/utility/IdentitySection/ValidateJwtToken";

import axios from "axios";

axios.defaults.baseURL = Urls.BaseUrl;
const { validate, validateEncryption } = ValidateJwtToken();
axios.interceptors.request.use(
  async function(config) {
    if (
      config.url === Urls.RefreshJwtToken ||
      config.url === Urls.Authenticate||
      config.url===Urls.Login
    ) {
      return config;
    } else {
      console.log("Checking Token Validaity");
      console.log("Step 1");
      await validate();
    }
    console.log("Step 4");

    config.headers.Authorization = "Bearer " + localStorage.getItem("token");

    if (config.url === Urls.Logout) {
      console.log("Adding the refreshtoken  Header");
      config.headers.RefreshToken = localStorage.getItem("refreshToken");
    }

    return config;
  },
  function(error) {
    console.log("-----------It is an Error-----------------");
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    console.log("Error in response");
    console.log(error.response.status);

    if (error.response.status == 401 || error.response.status == 403) {
      console.log("Validate The Encryption of   Jwt token");

      await validateEncryption();
    }
    return Promise.reject(error);
  }
);
