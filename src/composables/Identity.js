import Urls from "@/utility/IdentitySection/Urls";
import axios from "axios";
import Store from "../store/index";

const Identity = () => {



  const EmailVerified = async () => {
    let res = null;
    await axios
      .get(Urls.VerifyEmail)
      .then(function(response) {
        console.log(response);
        res = response;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        console.log("Returning res");
        console.log(res);
      });

    return res;
  };

  const PhoneVerified = async () => {
    let res = null;
    await axios
      .get(Urls.VerifyPhone)
      .then(function(response) {
        console.log(response);
        res = response;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return res;
  };

  const SendVerificationMail = async () => {
    let res = false;

    await axios
      .get(Urls.SendVerificationEmail)
      .then(function(response) {
        res = true;

        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });

    return res;
  };

  const VerifyEmailCode = async (code) => {
    let res = false;
    await axios
      .post(Urls.VerifyEmailCode, {
        code: code,
      })
      .then(function(response) {
        console.log(response);
        Store.state.user.isEmailVerified = true;
        res = true;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  const VerifySMSCode = async (code) => {
    console.log("----------Verify Sms---------");
    console.log(code);
    let res = false;
    await axios
      .post(Urls.VerifySmsCode, {
        code: code,
      })
      .then(function(response) {
        res = true;
        Store.state.user.isPhoneNumberVerified = true;

        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  const SendVerificationSMS = async () => {
    let res = false;
    await axios
      .get(Urls.SendVerificationSms)
      .then(function(response) {
        res = true;

        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
    return res;
  };

   const UpdateProfilePicture=async (file)=>{
const userPhotoObject={
  userPhoto:file
}
const formData = new FormData();
formData.append('userPhoto', file, file.name);




await axios.post(Urls.UserProfilePhoto,formData)
.then(function (response) {
  console.log(response);
  console.log("----------Photo Uploaded-----------")
})
.catch(function (error) {
  console.log(error);
});



   }







  return {
    EmailVerified,
    PhoneVerified,
    SendVerificationMail,
    SendVerificationSMS,
    VerifyEmailCode,
    VerifySMSCode,
    UpdateProfilePicture
  };
};

export default Identity;
