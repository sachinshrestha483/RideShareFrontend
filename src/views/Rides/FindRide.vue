<template>
  <div class="h-screen w-screen">
    <h2>Map Should Be Shown Here</h2>
    <div class="p-8">
      <ChooseInitialAndFinalPositionMap
        :getSearchedFinalPosition="getSearchedFinalPosition"
        :getSearchedInitialPosition="getSearchedInitialPosition"
        :setSearchedInitialPosition="setSearchedInitialPosition"
        :setSearchedFinalPosition="setSearchedFinalPosition"
           :setInitialPositioInForm="setInitialPositioInForm"
    :setFinalPositioInForm="setFinalPositioInForm"
      />
    </div>
  </div>


  <FindRideSearchForm
    :setQueryResponse="setQueryResponse"
    :setSearchedInitialPosition="setSearchedInitialPosition"
    :setSearchedFinalPosition="setSearchedFinalPosition"
    :setInitialPositioInForm="setInitialPositioInForm"
    :setFinalPositioInForm="setFinalPositioInForm"
  />
value from main
{{searchedInitialPosition}}
{{searchedFinalPosition}}
value from main
  <!-- Response -  {{queryResponse}} -->

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
      />
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

const setInitialPositioInForm= ()=>{

}


const setFinalPositioInForm= ()=>{

}


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
      setFinalPositioInForm
    };
  },
};
</script>

<style>
</style>