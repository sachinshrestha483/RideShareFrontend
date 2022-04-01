<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Ride Route</div>
    <p>
      {{ ride }}
    </p>

    <!-- <p>Zoomed Lat: {{ zoomedLat }}</p>

    <p>Zoomed Lon: {{ zoomedLon }}</p>
 -->
   
    <div class="flex flex-row justify-between">
      <div>
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
        />
      </div>
      <div>
        <MapComponent
          :initialPosition="initialPosition"
          :finalPosition="finalPosition"
          :intermediatePoints="intermediatePoints"
          :getInitialPositionMarkerFun="getInitialPositionMarkerFun"
          :getFinalPositionMarkerFun="getFinalPositionMarkerFun"
          :getIntermediatePositionsMarkerFun="getIntermediatePositionsMarkerFun"
          :getCreateRouteFun="getCreateRouteFun"
          :calculateRouteFun="calculateRouteFun"
        />
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
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import RideMapComponent from "@/components/Map/RideMapComponent";
import { getMyRide } from "@/composables/RideFunctions.js";
import SetLocationsComponent from "@/components/Rides/OfferRide/SetLocationsComponent";
import MapComponent from "@/components/Rides/OfferRide/MapComponent";

export default {
  components: {
    //RideMapComponentMapComponent,
    SetLocationsComponent,
    MapComponent,
  },
  setup(props) {
    console.log("Here is The Ride Info Page ");
    const ride = ref(null);
    const zoomedLat = ref(null);
    const zoomedLon = ref(null);
    const router = useRoute();
    let rideId = router.params.id;

    console.log("Ride ID" + rideId);

    console.log("latitude:" + router.params.lat);
    console.log("longitude:" + router.params.lon);
    zoomedLat.value = router.params.zoomlat;
    zoomedLon.value = router.params.zoomlon;

    const loadData = async () => {
      let rideObj = await getMyRide(rideId);
      console.log("Here is the Ride Object");
      console.log(rideObj);
      ride.value = rideObj;
    };

    onMounted(async () => {
     await  loadData();
     if(rideObj.value!=null || rideObj.value!=undefined){
     initialPosition.value.lat= rideObj.value.startLocationLatitude
     finalPosition.value.lat= rideObj.value.endLocationLatitude
     initialPosition.value.name= "ds"

     initialPosition.value.lon= rideObj.value.startLocationLongitude
     finalPosition.value.lon= rideObj.value.endLocationLongitude
     initialPosition.value.name= rideObj.value.startLocationLongitude

     initialPositionMarkerFun.value();
     finalPositionMarkerFun.value();

     }
    });

    const initialPosition = ref({ lat: "", lon: "", name: "" });
    const finalPosition = ref({ lat: "", lon: "", name: "" });
    const intermediatePoints = ref([]);
    const selectedGeojson = ref([]);
    const initialPositionMarkerFun = ref(null);
    const finalPositionMarkerFun = ref(null);
    const intermediatePositionMarkerFun = ref(null);

    const calculateRouteFun = ref(null);
    const createRouteFun = ref(null);

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
    };

    return {
      ride,
      zoomedLat,
      zoomedLon,
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
    };
  },
};
</script>

<style>
</style>