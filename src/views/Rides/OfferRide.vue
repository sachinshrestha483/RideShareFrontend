<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Offer Ride</div>

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
          :isEditView="false"
          :EditViewSavedRideId="0"
        />
      </div>
      <div class="w-full ">
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
  </div>
</template>

<script>
import SetLocationsComponent from "@/components/Rides/OfferRide/SetLocationsComponent";
import MapComponent from "@/components/Rides/OfferRide/MapComponent";
import { ref } from "vue";

export default {
  components: {
    SetLocationsComponent,
    MapComponent,
  },
  setup() {
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