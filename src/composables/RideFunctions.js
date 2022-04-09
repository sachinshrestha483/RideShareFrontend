import axios from "axios";
import Urls from "@/utility/IdentitySection/Urls";
import HttpResponseObject from "@/utility/objects/HttpResponseObject";
import { data } from "autoprefixer";



const getMyRide = async (id) => {
  const httpResponseObject = new HttpResponseObject();
  await axios
    .get(Urls.myRidesRide + "?" + 'id' + "=" + id)
    .then(function (response) {
      console.log(response);
      httpResponseObject.responseObject = response.data;
    })
    .catch(function (error) {
      console.log(error);
      httpResponseObject.errorMessage = "Cant Load Ride";
    })
  console.log(httpResponseObject);
  return httpResponseObject;
}

const getMyRides = async () => {
  const httpResponseObject = new HttpResponseObject();
  // Make a request for a user with a given ID
  await axios
    .get(Urls.myRides)
    .then(function (response) {
      console.log(response);
      httpResponseObject.responseObject = response.data;
    })
    .catch(function (error) {
      console.log(error);
      httpResponseObject.errorMessage = "Cant Load Vehicles";
    })
  console.log(httpResponseObject);
  return httpResponseObject;
}

const getRideShareOfferStatusText=async (id)=>{
  const httpResponseObject = new HttpResponseObject();
  console.log("Finding The Ride inside The Function");
  //ride
  await axios
    .post(Urls.GetRideShareOfferStatusText+"?id="+parseInt(id))
    .then(function (response) {
      console.log(response);
      console.log("data inside  the Ride Functions");
      httpResponseObject.responseObject = response.data;
      console.log(httpResponseObject);
      console.log("Returning the object");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
      // error.response is where we got oir response
    });
  // httpResponseObject.haveError = !objSubmitted;
  //shttpResponseObject.responseObject;
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  return httpResponseObject; 
}


const DeleteRideShareOffer= async(id)=>{
  const httpResponseObject = new HttpResponseObject();
  console.log("Finding The Ride inside The Function");
  //ride
  await axios
    .post(Urls.DeleteRideShareOffer+"?id="+parseInt(id))
    .then(function (response) {
      console.log(response);
      console.log("data inside  the Ride Functions");
      httpResponseObject.responseObject = response.data;
      console.log(httpResponseObject);
      console.log("Returning the object");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
      // error.response is where we got oir response
    });
  // httpResponseObject.haveError = !objSubmitted;
  //shttpResponseObject.responseObject;
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  return httpResponseObject;
}


const getRideShareOffer= async(id)=>{
  const httpResponseObject = new HttpResponseObject();
  console.log("Finding The Ride inside The Function");
  //ride
  await axios
    .post(Urls.GetRideShareOffer, {"rideId": parseInt(id) })
    .then(function (response) {
      console.log(response);
      console.log("data inside  the Ride Functions");
      httpResponseObject.responseObject = response.data;
      console.log(httpResponseObject);
      console.log("Returning the object");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
      // error.response is where we got oir response
    });
  // httpResponseObject.haveError = !objSubmitted;
  //shttpResponseObject.responseObject;
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  return httpResponseObject;
}


const FindRide = async (ride) => {
  const httpResponseObject = new HttpResponseObject();
  console.log("Finding The Ride inside The Function");
//  ride
  await axios
    .post(Urls.FindRide, ride)
    .then(function (response) {
      console.log(response);
      console.log("data inside  the Ride Functions");
      httpResponseObject.responseObject = response.data;
      console.log(httpResponseObject);
      console.log("Returning the object");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
      // error.response is where we got oir response
    });
  // httpResponseObject.haveError = !objSubmitted;
  //shttpResponseObject.responseObject;
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  return httpResponseObject;
}



const SaveRideShareOffer = async (rideshareOffer) => {
  const httpResponseObject = new HttpResponseObject();
  console.log("Finding The Ride inside The Function");
  await axios
    .post(Urls.SaveRideShareOffer, rideshareOffer)
    .then(function (response) {
      console.log(response);
      console.log("data inside  the Ride Functions");
      httpResponseObject.responseObject = response.data;
      console.log(httpResponseObject);
      console.log("Returning the object");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
      // error.response is where we got oir response
    });
  // httpResponseObject.haveError = !objSubmitted;
  //shttpResponseObject.responseObject;
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  return httpResponseObject;
}





const EditRide= async(ride)=>{
  const httpResponseObject = new HttpResponseObject();
  await axios
    .post(Urls.EditRide, ride)
    .then(function (response) {
      console.log(response);
      console.log("data");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
    });
  httpResponseObject.haveError = ! httpResponseObject.objSubmitted ;
  httpResponseObject.responseObject;

  return httpResponseObject;
}


const AdvanceEditRide= async(ride)=>{
  const httpResponseObject = new HttpResponseObject();
  await axios
    .post(Urls.EditAdvanceRideInfo, ride)
    .then(function (response) {
      console.log(response);
      console.log("data");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
    });
  httpResponseObject.haveError = ! httpResponseObject.objSubmitted ;
  httpResponseObject.responseObject;

  return httpResponseObject;
}

const PublishRide = async (ride) => {
  const httpResponseObject = new HttpResponseObject();
  await axios
    .post(Urls.AddRide, ride)
    .then(function (response) {
      console.log(response);
      console.log("data");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
    });
  httpResponseObject.haveError = !httpResponseObject.objSubmitted;
  httpResponseObject.responseObject;

  return httpResponseObject;
}

const GetRideOverlappingDetails=async (ride)=>{
  const httpResponseObject = new HttpResponseObject();
  console.log("Finding The Ride inside The Function");
  
  await axios
    .post(Urls.FindRideDetailOverlappingInfo, ride)
    .then(function (response) {
      console.log(response);
      console.log("data inside  the Ride Functions");
      httpResponseObject.responseObject = response.data;
      console.log(httpResponseObject);
      console.log("Returning the object");
    })
    .catch(function (error) {
      httpResponseObject.objSubmitted = false;
      console.log("Error is Here");
      console.log(error.response);
      try {
        httpResponseObject.errorMessage = error.response.data.message;
      }
      catch {
        httpResponseObject.errorMessage = null;
      }
      // error.response is where we got oir response
    });
  // httpResponseObject.haveError = !objSubmitted;
  //shttpResponseObject.responseObject;
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  console.log("returning the response object from the function")
  return httpResponseObject;  
}


export { PublishRide, FindRide, getMyRides, getMyRide,EditRide,AdvanceEditRide,GetRideOverlappingDetails,SaveRideShareOffer,getRideShareOffer,DeleteRideShareOffer,getRideShareOfferStatusText };
