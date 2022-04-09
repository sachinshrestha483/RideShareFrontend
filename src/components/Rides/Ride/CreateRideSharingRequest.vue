<template>
  {{ numOfPassengers }}
  <div class="pageMargin1">
    reverse Geocoded Initial position name
    {{ reverseGeocodedInitialPositionName }} reverse Geocoded Final Positin name
    {{ reverseGeocodedFinalPositionName }}


 <!-- {{savedRideShareOffer}}  -->
    <div class="flex flex-row justify-center items-center gap-4">
      <div class="text-center secondaryText mb-2">
        {{ savedRideShareOffer == null ? "Create" : "Edit" }} Ride Sharing
        Request
      </div>
<div
v-if=" savedRideShareOffer != null"
 class=" select-none	 font-medium	 bg-blue-500 p-2 text-white hover:bg-blue-600 rounded-lg bold">
 Status : {{rideShareOfferStatusText}}
</div>
      <svg
        v-if="savedRideShareOffer != null"
        v-on:click="deleteRideShareOffer"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash-fill text-red-500"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
        />
      </svg>
    </div>

    <div class="flex flex-row justify-center gap-8 ">
      <div class="flex flex-col">
        <label
          class="text-md text-gray-600 mb-2 text-center text-center font-bold"
          >Offered inital Location Name</label
        >
        <input
          type="text"
          class="inputBox"
          style="text-align: center"
          v-model="reverseGeocodedInitialPositionName"
        />

        <label
          class="text-md text-gray-600 mb-2 text-center text-center font-bold"
          >Offered Final Location Name</label
        >
        <input
          type="text"
          class="inputBox"
          style="text-align: center"
          v-model="reverseGeocodedFinalPositionName"
        />

        <div class="flex flex-row items-center px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 text-blue-500 w-14 hover:text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-on:click="increaseNumberofPassenger"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>

          <input
            type="number"
            class="inputBox"
            style="text-align: center"
            v-model="numberOfPassengers"
            disabled
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14 text-blue-500 hover:text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-on:click="decreaseNumberofPassenger"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <label
          class="text-md text-gray-600 mb-2 text-center text-center font-bold"
          >Price</label
        >
        <input
          type="number"
          class="inputBox"
          style="text-align: center"
          v-model="price"
        />
        <label class="text-md text-gray-600 mb-2 text-center font-bold"
          >Notes</label
        >

        <textarea
          type="text"
          class="inputBox"
          style="text-align: center"
          v-model="notes"
        />
        <div class="flex flex-row justify-center">
          <button class="primaryButton" v-on:click="createRideShareOffer">
            {{ savedRideShareOffer == null ? "Create" : "Edit" }} Ride Sharing
            Request
          </button>
        </div>
      </div>
      <div class="flex flex-col w-full p-4" v-if="mapObject!=null">
        <RideSharingRequestMap
         v-if="mapObject!=null"
        :searchedStartLocation="mapObject.searchedStartLocation"
        :searchedEndLocation="mapObject.searchedEndLocation"
        :startLocation="mapObject.startLocation"
        :endLocation="mapObject.endLocation"
        :path="ride.path"
        :overlappingPath="mapObject.overlappingPath"
        :intermediatePoints="ride.intermediatePositions"
        :distanceFromOfferedInitialPoint="distanceFromInitialPosition"
        :distanceFromOfferedFinalPoint="distanceFromFinalPosition"
        :overlappingStartIndex="0"
        :overlappingEndIndex="0"
         />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  SaveRideShareOffer,
  getRideShareOffer,
  DeleteRideShareOffer,
  getRideShareOfferStatusText
} from "@/composables/RideFunctions";
import Store from "@/store/index";
import GeoCordinatesFunction from "@/composables/GeoCordinatesFunctions.js";
import RideSharingRequestMap from "@/components/Rides/Ride/RideSharingRequestMap.vue";

export default {
  props: [
    "avaliableSeats",
    "rideId",
    "startLocationName",
    "startLat",
    "startLon",
    "endLat",
    "endLon",
    "endLocationName",
    "numOfPassengers",
    "reRender",
    "ride",
    "distanceFromInitialPosition",
    "distanceFromFinalPosition",
    "overLappingPath"
  ],

  setup(props) {
    const { reverseGeoCode } = GeoCordinatesFunction();

    const numberOfPassengers = ref(0);
    const notes = ref("");
    const price = ref(0);
    let user = Store.state.user;
    const reverseGeocodedInitialPositionName = ref(" ");
    const reverseGeocodedFinalPositionName = ref(" ");
    var savedRideShareOffer = ref(null);
    const rideShareOfferStatusText= ref(null);
var mapObject= ref(null);


    const getSavedRideSharingRequestInfo = async () => {
      var response = await getRideShareOffer(props.rideId);
      savedRideShareOffer.value = response.responseObject;
      console.log(response);
      console.log("saved Ride Share Offer");
      console.log("saved Ride Share Offer");
      console.log("saved Ride Share Offer");
      console.log(savedRideShareOffer.value);
      console.log("saved Ride Share Offer");
      console.log("saved Ride Share Offer");
      console.log("saved Ride Share Offer");
      console.log("saved Ride Share Offer");
      if (savedRideShareOffer.value != null) {
        numberOfPassengers.value = savedRideShareOffer.value.numberOfPassengers;
        price.value = savedRideShareOffer.value.offeredPrice;
        notes.value = savedRideShareOffer.value.notesForRideCreater;
        reverseGeocodedInitialPositionName.value =
          savedRideShareOffer.value.startLocationName;
        reverseGeocodedFinalPositionName.value =
          savedRideShareOffer.value.endLocationName;
        rideShareOfferStatusText.value= await getRideShareOfferStatusTextFun(savedRideShareOffer.value.rideShareOfferStatus)
      }
    };

    onMounted(async () => {
      numberOfPassengers.value = props.numOfPassengers;

      if (props.startLocationName == "null") {
        let response = await reverseGeoCode(props.startLat, props.startLon);
        if (!response.haveError) {
          reverseGeocodedInitialPositionName.value =
            response.responseObject.address.LongLabel;
        }
      } else {
        console.log(
          "Setting Props Start Location Name:" + props.startLocationName
        );
        reverseGeocodedInitialPositionName.value = props.startLocationName;
        console.log(
          "Value After Setting it :" + reverseGeocodedInitialPositionName.value
        );
      }
      if (props.endLocationName == "null") {
        // console.log(await reverseGeoCode(props.startLat,props.startLon));
        let response = await reverseGeoCode(props.endLat, props.endLon);
        if (!response.haveError) {
          reverseGeocodedFinalPositionName.value =
            response.responseObject.address.LongLabel;
        }
      } else {
        console.log("Setting Props End Location Name:" + props.endLocationName);

        reverseGeocodedFinalPositionName.value = props.endLocationName;
        console.log(
          "Value After Setting it :" + reverseGeocodedFinalPositionName.value
        );
      }

    await   getSavedRideSharingRequestInfo();

if(savedRideShareOffer.value!=null)
{
 mapObject.value= {
      searchedStartLocation:{
        name: reverseGeocodedInitialPositionName.value,
        lat: parseFloat(savedRideShareOffer.value.startLocationLatitude),
        lon:  parseFloat(savedRideShareOffer.value.startLocationLongitude)

      },
      searchedEndLocation:{
        name:reverseGeocodedFinalPositionName.value,
        lat: parseFloat(savedRideShareOffer.value.endLocationLatitude),
        lon: parseFloat(savedRideShareOffer.value.endLocationLongitude)    

      },

      path:props.ride.path,
       startLocation:{name:props.ride.startLocationName,lat:props.ride.startLocationLatitude, lon: props.ride.startLocationLongitude},
       endLocation:{name:props.ride.endLocationName, lat:props.ride.endLocationLatitude, lon:props.ride.endLocationLongitude},
       overlappingPath: JSON.parse(savedRideShareOffer.value.overlappingPath)         

    }

}


  

    });

    const increaseNumberofPassenger = () => {
      if (numberOfPassengers.value == props.avaliableSeats) {
        numberOfPassengers.value = 0;
      } else {
        numberOfPassengers.value++;
      }
    };

    const decreaseNumberofPassenger = () => {
      if (numberOfPassengers.value == 1) {
        numberOfPassengers.value = 1;
      } else {
        numberOfPassengers.value--;
      }
    };

    const deleteRideShareOffer = async () => {
      console.log("Deleting Ride Share Offer");
      var response = await DeleteRideShareOffer(savedRideShareOffer.value.id);
      props.reRender();
    };


  const getRideShareOfferStatusTextFun=async (id)=>{
    var response=await getRideShareOfferStatusText(id);
    console.log(response);
if(response.objSubmitted ==false)
{
  return null
}
else{
  return response.responseObject.name
}

  }


    const createRideShareOffer = async () => {
      const rideShareOffer = {
        rideId: parseInt(props.rideId),
        numberOfPassengers: parseInt(numberOfPassengers.value),
        startLocationName: reverseGeocodedInitialPositionName.value,
        endLocationName: reverseGeocodedFinalPositionName.value,
        startLocationLatitude:
          savedRideShareOffer.value != null
            ? parseFloat(savedRideShareOffer.value.startLocationLatitude)
            : parseFloat(props.startLat),
        startLocationLongitude:
          savedRideShareOffer.value != null
            ? parseFloat(savedRideShareOffer.value.startLocationLongitude)
            : parseFloat(props.startLon),
        endLocationLatitude:
          savedRideShareOffer.value != null
            ? parseFloat(savedRideShareOffer.value.endLocationLatitude)
            : parseFloat(props.endLat),
        endLocationLongitude:
          savedRideShareOffer.value != null
            ? parseFloat(savedRideShareOffer.value.endLocationLongitude)
            : parseFloat(props.endLon),
        offeredPrice: parseInt(price.value),
        notesForRideCreater: notes.value,
       
        //  notesForOfferCreator: "string",
        // rideShareOfferStatus: 0,
        //createdDateTime: "2022-04-07T15:42:36.842Z",
        //lastUpdated: "2022-04-07T15:42:36.842Z",
        userId: user.id,
      };

if(savedRideShareOffer.value==null)
{
  rideShareOffer.overlappingPath=  JSON.stringify(props.overLappingPath)
}

      console.log("rideShareOffer");
      console.log(rideShareOffer);
      await SaveRideShareOffer(rideShareOffer);
      props.reRender();
    };

    return {
      increaseNumberofPassenger,
      decreaseNumberofPassenger,
      numberOfPassengers,
      notes,
      price,
      createRideShareOffer,
      reverseGeocodedInitialPositionName,
      reverseGeocodedFinalPositionName,
      savedRideShareOffer,
      deleteRideShareOffer,
      RideSharingRequestMap,
      mapObject,
      rideShareOfferStatusText
    };
  },
};
</script>

<style>
</style>