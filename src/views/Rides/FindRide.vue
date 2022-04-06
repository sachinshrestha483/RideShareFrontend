<template>
  <div class="flex flex-col">
    <div class="h-screen bg-white w-screen absolute" v-show="showMap">
      <!-- <h2>Map Should Be Shown Here</h2> -->

      <div class="p-8">
        <ChooseInitialAndFinalPositionMap
          :getSearchedFinalPosition="getSearchedFinalPosition"
          :getSearchedInitialPosition="getSearchedInitialPosition"
          :setSearchedInitialPosition="setSearchedInitialPosition"
          :setSearchedFinalPosition="setSearchedFinalPosition"
          :setInitialPositioInForm="initialposFun"
          :setFinalPositioInForm="finalposFun"
          :getDrawInitialPositionMarkerFun="getDrawInitialPositionMarkerFun"
          :getDrawFinalPositionMarkerFun="getDrawFinalPositionMarkerFun"
          :getSetInitialPositionInMapValue="getSetInitialPositionInMapValue"
          :getSetFinalPositionInMapValue="getSetFinalPositionInMapValue"
          :toogleShowMap="toogleShowMap"
        />
      </div>
    </div>
    <div v-show="!showMap">
      <FindRideSearchForm
        :setQueryResponse="setQueryResponse"
        :setSearchedInitialPosition="setSearchedInitialPosition"
        :setSearchedFinalPosition="setSearchedFinalPosition"
        :setInitialPositioInForm="setInitialPositioInForm"
        :setFinalPositioInForm="setFinalPositioInForm"
        :drawinitialposMarkerFun="drawinitialposMarkerFun"
        :drawfinalposMarkerFun="drawfinalposMarkerFun"
        :initialposmapfun="initialposmapfun"
        :finalposmapfun="finalposmapfun"
        :toogleShowMap="toogleShowMap"
      />
    </div>

    <div v-show="!showMap">
      {{ searchedInitialPosition }}
      {{ searchedFinalPosition }}
    </div>
    <!-- Response -  {{queryResponse}} -->
    <div v-if="!showMap">
      <div v-if="queryResponse != null">
        <!-- Response -  {{queryResponse}}  -->
        <div v-for="rideDto in queryResponse.responseObject" :key="rideDto">
          <!-- {{rideDto.rideId}} -->

          <RideDetails
            :rideId="rideDto.rideId"
            :overLappingPath="rideDto.overLappingPath"
            :searchedinitialPosition="searchedInitialPosition"
            :searchedFinalPosition="searchedFinalPosition"
            class="mb-4"
            :distanceFromInitialPosition="rideDto.distanceFromInitialPosition"
            :distanceFromFinalPosition="rideDto.distanceFromFinalPosition"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";
import { FindRide } from "@/composables/RideFunctions";
import { FindRideDto } from "@/utility/Dtos/FindRideDto";
import GeoCordinatesFunction from "@/composables/GeoCordinatesFunctions";
import Store from "@/store/index";
import FindRideSearchForm from "@/components/Rides/FindRide/FindRideSearchForm";
import RideDetails from "@/components/Rides/Ride/RideDetails.vue";
import ChooseInitialAndFinalPositionMap from "@/components/Rides/FindRide/ChooseInitialandFinalPositionMap.vue";

export default {
  components: {
    FindRideSearchForm,
    RideDetails,
    ChooseInitialAndFinalPositionMap,
  },
  setup() {
    const queryResponse = ref(null);
    const searchedInitialPosition = ref(null);
    const searchedFinalPosition = ref(null);

    const initialposFun = ref(null);
    const finalposFun = ref(null);
    const drawinitialposMarkerFun = ref(null);
    const drawfinalposMarkerFun = ref(null);
    const initialposmapfun = ref(null);
    const finalposmapfun = ref(null);

    const showMap = ref(false);

    const toogleShowMap = () => {
      showMap.value = !showMap.value;

      // drawinitialposMarkerFun.value(true);
      // drawfinalposMarkerFun.value(true)
      
    };

    const getSetInitialPositionInMapValue = (fun) => {
      initialposmapfun.value = fun;
    };

    const getSetFinalPositionInMapValue = (fun) => {
      finalposmapfun.value = fun;
    };

    const getDrawInitialPositionMarkerFun = (fun) => {
      drawinitialposMarkerFun.value = fun;
    };

    const getDrawFinalPositionMarkerFun = (fun) => {
      drawfinalposMarkerFun.value = fun;
    };

    const setInitialPositioInForm = (fun) => {
      initialposFun.value = fun;
    };

    const setFinalPositioInForm = (fun) => {
      finalposFun.value = fun;
    };

    const setSearchedInitialPosition = (val) => {
      searchedInitialPosition.value = val;
    };
    const setSearchedFinalPosition = (val) => {
      searchedFinalPosition.value = val;
    };

    const getSearchedInitialPosition = () => {
      return searchedInitialPosition.value;
    };

    const getSearchedFinalPosition = (val) => {
      return searchedFinalPosition.value;
    };

    const setQueryResponse = (val) => {
      queryResponse.value = val;
    };

    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "january",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return {
      setQueryResponse,
      queryResponse,
      days,
      months,
      setSearchedInitialPosition,
      setSearchedFinalPosition,
      searchedInitialPosition,
      searchedFinalPosition,
      getSearchedInitialPosition,
      getSearchedFinalPosition,
      setInitialPositioInForm,
      setFinalPositioInForm,
      initialposFun,
      finalposFun,
      getDrawInitialPositionMarkerFun,
      getDrawFinalPositionMarkerFun,
      drawinitialposMarkerFun,
      drawfinalposMarkerFun,
      getSetInitialPositionInMapValue,
      getSetFinalPositionInMapValue,
      initialposmapfun,
      finalposmapfun,
      showMap,
      toogleShowMap,
    };
  },
};
</script>

<style>
</style>