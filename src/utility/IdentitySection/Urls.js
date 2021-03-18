class Urls {

    static BaseUrl = 'https://localhost:44388/api/';
    static Authenticate= "user/authenticate";
    static Logout= "user/Logout";
    static GetMessage="user/GetMessage"
    static RefreshJwtToken= "User/RefreshToken";
    static Login= "user/SignUp"
    static ValidateTokenEncryption= "User/VerifyToken";
    static VerifyEmail= "/User/EmailVerified";
    static VerifyPhone= "/User/PhoneVerified";
    static SendVerificationEmail="User/SendVerificationEmail";
    static SendVerificationSms="/User/SendVerificationPhoneCode";
    static VerifyEmailCode="/User/VerifyEmail";
    static VerifySmsCode="/User/VerifyPhone";
    static UserProfilePhoto="/User/UploadUserPhoto";
    
    static GetTravelPrefrences="/TravelPrefrence/GetTravelPrefrences";
    //https://localhost:44388/api/SubTravelPrefrence/GetSubTravelPrefrence?id=1

    static GetSubtravelPrefrencesById="/SubTravelPrefrence/GetSubTravelPrefrence?id=";
    
    static AddTravelPrefrences="/TravelPrefrence/AddTravelPrefrence";
    static UpdateAddTravelPrefrences="/TravelPrefrence/EditTravelPrefrence";
    static AddSubTravelPrefrences="/SubTravelPrefrence/AddSubTravelPrefrence";
    static UpdateSubTravelPrefrences="/SubTravelPrefrence/UpdateSubTravelPrefrence";





  
  }
  
  export default Urls