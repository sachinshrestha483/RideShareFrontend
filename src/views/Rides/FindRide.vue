<template>
  <div class="flex flex-col">
    <div class="h-screen bg-white w-screen absolute" v-if="showMap">
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
          :getInitialLocationFromFun="getInitialLocationFromFun"
          :getfinalLocationFromFun="getfinalLocationFromFun"
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
        :setGetInitialLocationFromFun="setGetInitialLocationFromFun"
        :setGetFinalLocationFromFun="setGetFinalLocationFromFun"
        :setGetNumOfPassengers="setGetNumOfPassengers"
      />
    </div>

    <div v-show="!showMap">
      {{ searchedInitialPosition }}
      <!-- djhfjh-   {{ searchedInitialPosition.name.name.name  }}
     fdf-  {{ searchedFinalPosition.name.name.name }} -->
    </div>
    <!-- Response -  {{queryResponse}} -->
    <div v-if="!showMap">
      <div v-if="queryResponse != null">
        <!-- Response -  {{queryResponse}}  -->
        <div
          v-for="rideDto in queryResponse.responseObject"
          :key="rideDto.rideId"
        >
          <!-- {{rideDto.rideId}} -->
          <router-link
            :to="{
              name: 'FindRides',
              params: {
                id: rideDto.rideId,
                startLocationName: searchedInitialPosition.name,
                startLat: searchedInitialPosition.lat,
                startLon: searchedInitialPosition.lon,
                endLocationName: searchedFinalPosition.name,
                endLat: searchedFinalPosition.lat,
                endLon: searchedFinalPosition.lon,
                numofPassengers: getNumberofPassengersFromFun(),
                price: 500,
              },
            }"
          >
            <RideDetails
              :rideId="rideDto.rideId"
              :overLappingPath="rideDto.overLappingPath"
              :searchedinitialPosition="searchedInitialPosition"
              :searchedFinalPosition="searchedFinalPosition"
              class="mb-4"
              :distanceFromInitialPosition="rideDto.distanceFromInitialPosition"
              :distanceFromFinalPosition="rideDto.distanceFromFinalPosition"
            />
          </router-link>
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
    const getInitialLocationFromFun = ref(null);
    const getfinalLocationFromFun = ref(null);
    const getNumberofPassengersFromFun = ref(null);
    const getPriceFromFun = ref(null);

    const setGetInitialLocationFromFun = (val) => {
      getInitialLocationFromFun.value = val;
    };

    const setGetFinalLocationFromFun = (val) => {
      getfinalLocationFromFun.value = val;
    };

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

    const setGetNumOfPassengers = (val) => {
      getNumberofPassengersFromFun.value = val;
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
      setGetInitialLocationFromFun,
      setGetFinalLocationFromFun,
      getInitialLocationFromFun,
      getfinalLocationFromFun,
      setGetNumOfPassengers,
      getNumberofPassengersFromFun,
    };
  },
};
</script>

<style>
</style>