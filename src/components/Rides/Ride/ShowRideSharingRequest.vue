<template>
  <div class="pageMargin1">
    <!-- {{savedRideShareOffer}}  -->
    <div class="flex flex-row justify-center items-center gap-4">
      <div class="text-center secondaryText mb-2">
        {{ savedRideShareOffer == null ? "Create" : "Edit" }} Ride Sharing
        Request
      </div>
      <div
        v-if="savedRideShareOffer != null"
        class="
          select-none
          font-medium
          bg-blue-500
          p-2
          text-white
          hover:bg-blue-600
          rounded-lg
          bold
        "
      >
        Status : {{ rideShareOfferStatusText }}
      </div>
    </div>

    <div class="flex flex-row justify-center gap-8">
      <div class="flex flex-col">
        <label
          class="text-md text-gray-600 mb-2 text-center text-center font-bold"
          >Offered inital Location Name</label
        >
        <input
          type="text"
          class="inputBox"
          disabled
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
          disabled
          style="text-align: center"
          v-model="reverseGeocodedFinalPositionName"
        />
        <label
          class="text-md text-gray-600 mb-2 text-center text-center font-bold"
          >Number of Passengers</label
        >
        <div class="flex flex-row items-center px-5">
          <input
            type="number"
            class="inputBox"
            style="text-align: center"
            v-model="numberOfPassengers"
            disabled
          />
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
          disabled
        />
        <label class="text-md text-gray-600 mb-2 text-center font-bold"
          >Notes</label
        >

        <textarea
          type="text"
          class="inputBox"
          style="text-align: center"
          v-model="notes"
          disabled
        />
      </div>
      <div class="flex flex-col w-full p-4" v-if="mapObject != null">
        <RideSharingRequestMap
          v-if="mapObject != null"
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
  getRideShareOfferStatusText,
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
    "overLappingPath",
    "rideSharerequest",
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
    const rideShareOfferStatusText = ref(null);
    var mapObject = ref(null);

    const getSavedRideSharingRequestInfo = async () => {
      savedRideShareOffer.value = props.rideSharerequest;
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
        rideShareOfferStatusText.value = await getRideShareOfferStatusTextFun(
          savedRideShareOffer.value.rideShareOfferStatus
        );
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

      await getSavedRideSharingRequestInfo();

      if (savedRideShareOffer.value != null) {
        mapObject.value = {
          searchedStartLocation: {
            name: reverseGeocodedInitialPositionName.value,
            lat: parseFloat(savedRideShareOffer.value.startLocationLatitude),
            lon: parseFloat(savedRideShareOffer.value.startLocationLongitude),
          },
          searchedEndLocation: {
            name: reverseGeocodedFinalPositionName.value,
            lat: parseFloat(savedRideShareOffer.value.endLocationLatitude),
            lon: parseFloat(savedRideShareOffer.value.endLocationLongitude),
          },

          path: props.ride.path,
          startLocation: {
            name: props.ride.startLocationName,
            lat: props.ride.startLocationLatitude,
            lon: props.ride.startLocationLongitude,
          },
          endLocation: {
            name: props.ride.endLocationName,
            lat: props.ride.endLocationLatitude,
            lon: props.ride.endLocationLongitude,
          },
          overlappingPath: JSON.parse(
            savedRideShareOffer.value.overlappingPath
          ),
        };
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

    const getRideShareOfferStatusTextFun = async (id) => {
      var response = await getRideShareOfferStatusText(id);
      console.log(response);
      if (response.objSubmitted == false) {
        return null;
      } else {
        return response.responseObject.name;
      }
    };

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
        distancefromInitialLocation:
          savedRideShareOffer.value != null
            ? parseFloat(savedRideShareOffer.value.distancefromInitialLocation)
            : parseFloat(props.distanceFromInitialPosition),
        distancefromFinalLocation:
          savedRideShareOffer.value != null
            ? parseFloat(savedRideShareOffer.value.distancefromFinalLocation)
            : parseFloat(props.distanceFromFinalPosition),
        //  notesForOfferCreator: "string",
        // rideShareOfferStatus: 0,
        //createdDateTime: "2022-04-07T15:42:36.842Z",
        //lastUpdated: "2022-04-07T15:42:36.842Z",
        userId: user.id,
      };

      if (savedRideShareOffer.value == null) {
        rideShareOffer.overlappingPath = JSON.stringify(props.overLappingPath);
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
      rideShareOfferStatusText,
    };
  },
};
</script>

<style>
</style>