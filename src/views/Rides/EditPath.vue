<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Edit  Route </div>
    {{ rideObject }}
    {{ formErrors }}
    <p>Initial Position -> {{ initialPosition }}</p>
    <p>Final Position -> {{ finalPosition }}</p>
    <p>Intermediate Positions -> {{ intermediatePoints }}</p>

    <div >
      <div class="w-10/12">
        <div class="flex flex-row gap-4 justify-end items-center">
          <svg
            v-on:click="showMapEditBar = !showMapEditBar"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
          <svg
            v-on:click="freeMarkerFun"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <!-- <div>
            <button v-on:click="freeMarkerFun" class="primaryButton">
              Get Free Marker
            </button>
          </div> -->
        </div>
      </div>
      <div class="flex flex-row justify-center mt-2">
        <div class="flex flex-row justify-center w-8/12" v-if="ride != null">
          <div v-if="showMapEditBar">
            <SetLocationsComponent
              :addMarkerFun="addMarker"
              :initialPosition="initialPosition"
              :intermediatePoints="intermediatePoints"
              :finalPosition="finalPosition"
              :setFinalPosMarker="setFinalPosMarker"
              :setInitialPosMarker="setInitialPosMarker"
              :SetIntermediatePosMarker="SetIntermediatePosMarker"
              :initialPositionMarkerFun="initialPositionMarkerFun"
              :finalPositionMarkerFun="finalPositionMarkerFun"
              :intermediatePositionMarkerFun="intermediatePositionMarkerFun"
              :getCalculateRouteFun="getCalculateRouteFun"
              :createRouteFun="createRouteFun"
              :drawRouteFun="drawRouteFun"
              :getDrawRouteFun="getDrawRouteFun"
              :isEditView="true"
              :EditViewSavedRideId="ride.responseObject.id"
              :getSetIntermediatePosFun="getSetIntermediatePosFun"
            />
          </div>
          <div class="w-full">
            <MapComponent
              :initialPosition="initialPosition"
              :finalPosition="finalPosition"
              :intermediatePoints="intermediatePoints"
              :getInitialPositionMarkerFun="getInitialPositionMarkerFun"
              :getFinalPositionMarkerFun="getFinalPositionMarkerFun"
              :getIntermediatePositionsMarkerFun="
                getIntermediatePositionsMarkerFun
              "
              :getCreateRouteFun="getCreateRouteFun"
              :calculateRouteFun="calculateRouteFun"
              :drawRouteFun="drawRouteFun"
              :getDrawRouteFun="getDrawRouteFun"
              :getFreeMarkerFun="getFreeMarkerFun"
            />
          </div>
        </div>
      </div>
    </div>
 
    <!-- 
    <RideMapComponent
      :zoomedLat="zoomedLat"
      :zoomedLon="zoomedLon"
      :ride="ride"
    >
    </RideMapComponent> -->
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue";
import VehicleFunctions from "@/composables/VehicleFunctions";
import { useRoute, useRouter } from "vue-router";
import {
  getMyRide,
  getAllApprovedRideShareOfferIds,
} from "@/composables/RideFunctions.js";
import SetLocationsComponent from "@/components/Rides/OfferRide/SetLocationsComponent";
import MapComponent from "@/components/Rides/OfferRide/MapComponent";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
export default {
  components: {
    //RideMapComponentMapComponent,
    SetLocationsComponent,
    MapComponent,
  },
  setup(props) {
    console.log("Here is The Ride Info Page ");
    const ride = ref(null);
    const router = useRoute();
    const rideVehicle = ref(null);
    const showMapEditBar = ref(false);
 
    const userVehicles = ref([]);
    const navrouter = useRouter();
    const isRidePathEditable = ref(true);
    const mapObject = ref(null);
  
   
    let rideId = router.params.id;
    console.log("Ride ID" + rideId);
  
    const loadData = async () => {
      let rideObj = await getMyRide(rideId);
      console.log("Here is the Ride Object");
      console.log(rideObj);
      ride.value = rideObj;
    };

    const reloadPage = () => {
      navrouter.go();
    };

    onUpdated(() => {});


    const LoadDataForEditRidePath = () => {

    };

    onMounted(async () => {
      await loadData();
      console.log("On Mounted Data" + " -> ");
      // console.log(ride.value.responseObject.)
      console.log("On Mounted Data" + " -> ");
      initialPosition.value.lat =
        ride.value.responseObject.startLocationLatitude;
      initialPosition.value.name = ride.value.responseObject.startLocationName;
      initialPosition.value.lon =
        ride.value.responseObject.startLocationLongitude;
      finalPosition.value.lat = ride.value.responseObject.endLocationLatitude;
      finalPosition.value.lon = ride.value.responseObject.endLocationLongitude;

      finalPosition.value.name = ride.value.responseObject.endLocationName;


      initialPositionMarkerFun.value(
        initialPosition.value.lat,
        initialPosition.value.lon
      );
      finalPositionMarkerFun.value(
        finalPosition.value.lat,
        finalPosition.value.lon
      );
      var intps = [];

      ride.value.responseObject.intermediatePositions.forEach((element) => {
        console.log(element);
        intps.push({
          name: element.positionName,
          lat: element.positionLatitude,
          lon: element.positionLongitude,
        });
        IntermediatePosFun.value(
          element.positionName,
          element.positionLatitude,
          element.positionLongitude
        );
      });
      console.log(drawRouteFun);
      console.log(drawRouteFun);
      console.log(ride.value.responseObject.path);
      console.log(typeof ride.value.responseObject.path);
      var deserializedPath = JSON.parse(ride.value.responseObject.path);
      drawRouteFun.value(deserializedPath);





      //      isEditPathShowable();
      // if (isRidePathEditable.value) {
      //   LoadDataForEditRidePath();
      // }

      const { GetUserVehicleById } = VehicleFunctions();
      rideVehicle.value = await GetUserVehicleById(
        ride.value.responseObject.vehicleId
      );

      console.log(VehicleFunctions);
      const { GetUserVehicles } = VehicleFunctions();
      console.log("Get User Vehicles");
      console.log(GetUserVehicles);
      GetUserVehicles().then(
        (value) => {
          userVehicles.value = value;
          // fulfillment
        },
        (reason) => {
          // rejection
        }
      );
      console.log(userVehicles.value);

      const { GetDateTimeString } = UtilityFunctions();

     
      const birthday = new Date(ride.value.responseObject.dateTimeOfRide);
      const formatedString =
        birthday.getFullYear() +
        "-" +
        ("0" + (birthday.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + birthday.getDate()).slice(-2);
 

      mapObject.value = {
        path: ride.value.responseObject.path,
        startLocation: {
          name: ride.value.responseObject.startLocationName,
          lat: ride.value.responseObject.startLocationLatitude,
          lon: ride.value.responseObject.startLocationLongitude,
        },
        endLocation: {
          name: ride.value.responseObject.endLocationName,
          lat: ride.value.responseObject.endLocationLatitude,
          lon: ride.value.responseObject.endLocationLongitude,
        },
        intermediatePoints: ride.value.responseObject.intermediatePositions,
      };

    });

    const initialPosition = ref({ lat: "", lon: "", name: "" });
    const finalPosition = ref({ lat: "", lon: "", name: "" });
    const intermediatePoints = ref([]);
    const selectedGeojson = ref([]);
    const initialPositionMarkerFun = ref(null);
    const finalPositionMarkerFun = ref(null);
    const intermediatePositionMarkerFun = ref(null);
    const drawRouteFun = ref(null);
    const freeMarkerFun = ref(null);

    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log(freeMarkerFun.value);
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");
    console.log("Free Marker Fun");

    const IntermediatePosFun = ref(null);

    const calculateRouteFun = ref(null);
    const createRouteFun = ref(null);

    const getSetIntermediatePosFun = (fun) => {
      IntermediatePosFun.value = fun;
    };

    const getFreeMarkerFun = (fun) => {
      freeMarkerFun.value = fun;
      //  freeMarkerFun.value();
    };

    const getDrawRouteFun = (fun) => {
      drawRouteFun.value = fun;
    };

    const getCreateRouteFun = (fun) => {
      createRouteFun.value = fun;
    };

    const getCalculateRouteFun = (fun) => {
      calculateRouteFun.value = fun;
      console.log("Route fun Here ");
      console.log("Route fun Here ");
    };

    const getFinalPositionMarkerFun = (fun) => {
      console.log("------Setting The Function-----");
      finalPositionMarkerFun.value = fun;
      console.log(finalPositionMarkerFun.value);
      console.log("------Setting The Function-----");
    };

    const getInitialPositionMarkerFun = (fun) => {
      console.log("------Setting The Function-----");
      initialPositionMarkerFun.value = fun;
      console.log(initialPositionMarkerFun);

      console.log("------Setting The Function-----");
    };

    const getIntermediatePositionsMarkerFun = (fun) => {
      intermediatePositionMarkerFun.value = fun;
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("Intermediate Position Marker Fun"+ fun);
      console.log(fun)
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ")
};

  
    return {
      ride,
      initialPosition,
      finalPosition,
      intermediatePoints,
      selectedGeojson,
      getInitialPositionMarkerFun,
      initialPositionMarkerFun,
      finalPositionMarkerFun,
      getFinalPositionMarkerFun,
      getIntermediatePositionsMarkerFun,
      intermediatePositionMarkerFun,
      getCalculateRouteFun,
      getCreateRouteFun,
      createRouteFun,
      calculateRouteFun,
      drawRouteFun,
      getDrawRouteFun,
      showMapEditBar,
      getSetIntermediatePosFun,
      getFreeMarkerFun,
      freeMarkerFun,
      isRidePathEditable,
      reloadPage,
    };
  },
};
</script>

<style>
</style>