class Urls {
  static BaseUrl = "https://localhost:44388/api/";
  static Authenticate = "user/authenticate";
  static Logout = "user/Logout";
  static GetMessage = "user/GetMessage";
  static RefreshJwtToken = "User/RefreshToken";
  static Login = "user/SignUp";
  static ValidateTokenEncryption = "User/VerifyToken";
  static VerifyEmail = "/User/EmailVerified";
  static VerifyPhone = "/User/PhoneVerified";
  static SendVerificationEmail = "User/SendVerificationEmail";
  static SendVerificationSms = "/User/SendVerificationPhoneCode";
  static VerifyEmailCode = "/User/VerifyEmail";
  static VerifySmsCode = "/User/VerifyPhone";
  static UserProfilePhoto = "/User/UploadUserPhoto";

  static GetTravelPrefrences = "/TravelPrefrence/GetTravelPrefrences";
  //https://localhost:44388/api/SubTravelPrefrence/GetSubTravelPrefrence?id=1
  static GetTravelPrefrecneById = "/TravelPrefrence/GetTravelPrefrecneById?id=";
  static GetSubtravelPrefrencesById =
    "/SubTravelPrefrence/GetSubTravelPrefrenceById?id=";
  //GetAllSubTravelPrefrence
  static GetAllSubtravelPrefrences =
    "/SubTravelPrefrence/GetAllSubTravelPrefrence";

  static AddTravelPrefrences = "/TravelPrefrence/AddTravelPrefrence";
  static UpdateAddTravelPrefrences = "/TravelPrefrence/EditTravelPrefrence";
  static AddSubTravelPrefrences = "/SubTravelPrefrence/AddSubTravelPrefrence";
  static UpdateSubTravelPrefrences =
    "/SubTravelPrefrence/UpdateSubTravelPrefrence";
  static GetIndiSubTravelPrefrenceById =
    "/SubTravelPrefrence/GetIndiSubTravelPrefrenceById?id=";

  static AddUserTravelPrefrence = "/UserTravelPrefrence/AddUserTravelPrefrence";
  static GetUserTravelPrefrencyByTravelPrefrenceId =
    "/UserTravelPrefrence/GetUserTravelPrefrencyByTravelPrefrenceId?id=";



  static UserVehicles = "/Vehicle/GetUserVehicles";
  static GetVehicleTypes = "/VehicleType/GetAllVehicleType";
  static AddVehicle = "/Vehicle/AddVehicle";
  static UpdateVehicle = "/Vehicle/UpdateVehicle";
  static AddVehicleType = "/VehicleType/AddVehicleType";
  static UpdateVehicleType = "/VehicleType/UpdateVehicleType";
  static UserVehicleById="/Vehicle/GetUserVehiclesById?id=";
  static VehicleTypeById="/VehicleType/GetVehicleTypeById?id="
  static UserTravelPrefrences="/UserTravelPrefrence/GetUserTravelPrefrences"
  static UserPublicProfile="/User/UserPublicProfile?id="
  static AddRide="/Ride/CreateRide";
  static FindRide="/Ride/FindRide";
  static myRides= "/Ride/GetMyRides";
  static myRidesRide= "/Ride/GetMyRide";
  static EditRide="/Ride/EditRide";
 static  EditAdvanceRideInfo= "/Ride/EditAdvanceRideInfo"
 static  FindRideDetailOverlappingInfo= "/Ride/GetOverlappingIndexes"
 static  SaveRideShareOffer= "/RideShareOffer/Create"
}

export default Urls;
