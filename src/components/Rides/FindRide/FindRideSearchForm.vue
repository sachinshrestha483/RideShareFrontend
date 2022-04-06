<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Find a Ride</div>
    <br />

    <div class="flex flex-row w-full justify-center items-center">
      <div class="flex flex-col md:w-4/12 w-10/12">
        <div class="flex flex-row items-center">
          <div v-on:click="toogleShowMap" class="w-1/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div class="flex flex-row justify-center w-11/12">
            <vue-bootstrap-typeahead
              class="w-full"
              ref="initialPSearchBox"
              v-on:keyup="InitialPchange"
              :data="filteredNames"
              @hit="SelectInitialPosition($event)"
            />
          </div>
        </div>

        <div class="flex flex-row items-center">
          <div v-on:click="toogleShowMap" class="w-1/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div class="flex flex-row justify-center w-11/12">
            <vue-bootstrap-typeahead
              class="w-full"
              v-on:keyup="FinalPchange"
              :data="filteredNames"
              ref="finalPSearchBox"
              @hit="SelectFinalPosition($event)"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <button class="focus:outline-none" v-on:click="swapLocations">
          <img
            src="/updownarrow.svg"
            class="
              shadow-lg
              cursor-pointer
              border-4
              hover:border-blue-500
              rounded-full
            "
            width="65"
            height="65"
          />
        </button>
      </div>
    </div>

    <div class="flex flex-row w-full justify-center">
      <div class="flex flex-col">
        <div class="border-t-4 border-gray-200 mb-4"></div>
        <div class="flex flex-row justify-between">
          <div class="w-10/12">
            <input
              v-model="rideLocalDateTime"
              type="datetime-local"
              class="inputBox mb-8"
            />
          </div>
          <div>
            <div
              class="
                flex flex-row
                items-center
                border-l-4
                px-5
                border-gray-200
                ml-8
              "
            >
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
                class="inputBox mx-2"
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
          </div>
        </div>
        <div class="border-t-4 border-gray-200 w-full"></div>
      </div>
    </div>

    <div class="flex flex-row w-full justify-center">
      <div class="flex flex-col">
        <div class="mb-4"></div>
        <div class="flex flex-row justify-between">
          <div class="w-5/12">
            <input
              type="number"
              class="inputBox mx-2"
              style="text-align: center"
              placeholder="Max Distance From Initial Point "
              v-model="maxdistanceFromInitialPoint"
            />
          </div>

          <div class="w-5/12">
            <input
              type="number"
              class="inputBox mx-2"
              style="text-align: center"
              placeholder="Max Distance From Final Point "
              v-model="maxdistanceFromFinalPoint"
            />
          </div>
        </div>
        <div class="mb-4"></div>

        <div class="border-t-4 border-gray-200 w-full"></div>
      </div>
    </div>

    <div class="flex flex-row justify-center mb-4 mt-4">
      <button class="primaryButton" v-on:click="findRide">Search Ride</button>
    </div>
  </div>

  {{ initialPosition }}
  {{ finalPosition }}
  {{ rideLocalDateTime }}
  {{ numberOfPassengers }}
  <!-- {{reverseGeoCodeobj}} -->
   <!-- {{ findRideResponse }}  -->

  <!-- <div v-if="findRideResponse != null">
    <div v-for="rideDto in findRideResponse.responseObject" :key="rideDto">
      {{ rideDto.rideId }}
    </div>
  </div> -->
</template>

<script>
import { ref, computed } from "vue";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import { FindRide } from "@/composables/RideFunctions";
import { FindRideDto } from "@/utility/Dtos/FindRideDto";
import GeoCordinatesFunction from "@/composables/GeoCordinatesFunctions";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
import Store from "@/store/index";
export default {
  components: {
    VueBootstrapTypeahead,
  },
  props: [
    "setQueryResponse",
    "setSearchedInitialPosition",
    "setSearchedFinalPosition",
    "setInitialPositioInForm",
    "setFinalPositioInForm",
    "drawinitialposMarkerFun",
    "drawfinalposMarkerFun",
    "initialposmapfun",
    "finalposmapfun",
    "toogleShowMap",
  ],
  setup(props) {
    const numberOfPassengers = ref(1);
    const { getNames } = OpenStreetMapFunctions();
    const { reverseGeoCode } = GeoCordinatesFunction();
    const mainresult = ref([]);
    const filteredNames = ref([]);
    const initialPSearchBox = ref(null);
    const finalPSearchBox = ref(null);
    const initialPosition = ref({ name: null, lat: null, lon: null });
    const finalPosition = ref({ name: null, lat: null, lon: null });
    const findRideResponse = ref(null);
    const reverseGeoCodeobj = ref(null);
    const maxdistanceFromInitialPoint = ref(50);
    const maxdistanceFromFinalPoint = ref(50);

    const { GetDateTimeString, GetUtcDateTime } = UtilityFunctions();

    var ddd = reverseGeoCode(23.3315, 75.0367);
    reverseGeoCodeobj.value = ddd;

    const swapLocations = () => {
      let tempInitialPosition = initialPosition.value;
      let tempFinalPosition = finalPosition.value;
      initialPosition.value = tempFinalPosition;
      finalPosition.value = tempInitialPosition;
      initialPSearchBox.value.inputValue = tempFinalPosition.name;
      finalPSearchBox.value.inputValue = tempInitialPosition.name;
    };
    const increaseNumberofPassenger = () => {
      if (numberOfPassengers.value == 6) {
        numberOfPassengers.value == 0;
      } else {
        numberOfPassengers.value++;
      }
    };
    const decreaseNumberofPassenger = () => {
      if (numberOfPassengers.value == 1) {
        numberOfPassengers.value == 1;
      } else {
        numberOfPassengers.value--;
      }
    };
    const getPlaceNames = async (name) => {
      let res = await getNames(name);
      console.log("-------res is here------");
      console.log(res);
      console.log("-------res is here------");
      mainresult.value = res;
      filteredNames.value = res.map((e) => {
        return e.display_name;
      });

      console.log("-----main Result------");
      console.log(mainresult);
      console.log(filteredNames);
      console.log("--------main Result------");
    };
    const InitialPchange = () => {
      console.log("-------Change it------");
      console.log(initialPSearchBox.value.inputValue);
      console.log(initialPSearchBox.value.inputValue);

      getPlaceNames(initialPSearchBox.value.inputValue);
    };
    const FinalPchange = () => {
      console.log("-------Change it------");
      console.log(finalPSearchBox.value.inputValue);
      console.log(finalPSearchBox.value.inputValue);
      getPlaceNames(finalPSearchBox.value.inputValue);
    };
    const SelectInitialPosition = (val) => {
      console.log(val);
      var nameObject = mainresult.value.find((e) => e.display_name == val);
      console.log(nameObject);
      initialPosition.value.name = val;
      initialPosition.value.lat = nameObject.lat;
      initialPosition.value.lon = nameObject.lon;
      props.setSearchedInitialPosition({
        name: val,
        lat: nameObject.lat,
        lon: nameObject.lon,
      });
      props.initialposmapfun({
        name: val,
        lat: nameObject.lat,
        lon: nameObject.lon,
      });

      console.log("Prop Value");
      console.log(props);
      console.log(props.drawinitialposMarkerFun(true));
      //props.drawinitialposMarkerFun.value();
    };
    const SelectFinalPosition = (val) => {
      console.log(val);
      var nameObject = mainresult.value.find((e) => e.display_name == val);
      console.log(nameObject);
      finalPosition.value.name = val;
      finalPosition.value.lat = nameObject.lat;
      finalPosition.value.lon = nameObject.lon;
      props.setSearchedFinalPosition({
        name: val,
        lat: nameObject.lat,
        lon: nameObject.lon,
      });
      props.finalposmapfun({
        name: val,
        lat: nameObject.lat,
        lon: nameObject.lon,
      });
      console.log("Prop Value");
      console.log(props.drawfinalposMarkerFun(true));
      //  props.drawfinalposMarkerFun.value();
    };

    const setInitialPositioInForm = (val) => {
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");

      console.log(val);

      if (val != undefined) {
        if (val.name != null) {
          initialPosition.value.name = val;
        }
        initialPosition.value.lat = val.lat;
        initialPosition.value.lon = val.lon;
        props.setSearchedInitialPosition({
          name: val,
          lat: val.lat,
          lon: val.lon,
        });
      }

      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
    };

    const setFinalPositioInForm = (val) => {
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");

      console.log(val);

      if (val != undefined) {
        if (val.name != null) {
          finalPosition.value.name = val.name;
        }
        finalPosition.value.lat = val.lat;
        finalPosition.value.lon = val.lon;
        props.setSearchedFinalPosition({
          name: val,
          lat: val.lat,
          lon: val.lon,
        });
        props.initialposmapfun({
          name: val,
          lat: val.lat,
          lon: val.lon,
        });
      }

      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
      console.log("Changinh the Value of the form");
    };

    props.setInitialPositioInForm(setInitialPositioInForm);
    props.setFinalPositioInForm(setFinalPositioInForm);

    let rideLocalDateTime = ref(null);

    const findRide = async () => {
      console.log("Findig the Ride");
      console.log("Findig the Ride");
      console.log("Ride");
      let findRideDto = new FindRideDto();
      let user = Store.state.user;
      console.log(user);
      if (user == null) {
        console.log("User is Null");
        return;
      }
      findRideDto.UserId = user.id;
      initialPosition.value.lat = String(initialPosition.value.lat);
      initialPosition.value.lon = String(initialPosition.value.lon);

      findRideDto.StartPosition = initialPosition.value;
      findRideDto.EndPosition = finalPosition.value;
      findRideDto.RideDateTime = GetUtcDateTime(
        new Date(rideLocalDateTime.value)
      );

      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");

      console.log(maxdistanceFromInitialPoint.value);
      console.log(maxdistanceFromFinalPoint.value);

      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");
      console.log("Here is the Value");

      findRideDto.MaxRouteDistanceFromStartingPoint = parseInt(
        maxdistanceFromInitialPoint.value
      );
      findRideDto.maxRouteDistanceFromEndingPoint = parseInt(
        maxdistanceFromFinalPoint.value
      );

      findRideDto.NumberofPassenger = numberOfPassengers.value;
      console.log(findRideDto);
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      let response = await FindRide(findRideDto);
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      findRideResponse.value = response;
      console.log(response);
      console.log("Find Ride response");
      console.log(findRideResponse);
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log(props);
      console.log(props);
      console.log(props);

      console.log(props);
      props.setQueryResponse(findRideResponse.value);
      // props.queryResponse= findRideResponse.value;
      console.log("Value Putted in it");
      console.log(props);
      console.log(props);
      console.log(props);
      console.log(props);
      console.log("Value Putted in it");

      console.log(props.queryResponse);
      console.log(props.queryResponse);
      console.log(props.queryResponse);
      console.log(props.queryResponse);
      console.log(props.queryResponse);
      console.log(props.queryResponse);
      console.log(props.queryResponse);

      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");

      console.log("Find Ride response");
    };

    return {
      decreaseNumberofPassenger,
      increaseNumberofPassenger,
      numberOfPassengers,
      initialPSearchBox,
      finalPSearchBox,
      InitialPchange,
      FinalPchange,
      filteredNames,
      SelectInitialPosition,
      SelectFinalPosition,
      initialPosition,
      finalPosition,
      swapLocations,
      findRide,
      findRideResponse,
      reverseGeoCodeobj,
      rideLocalDateTime,
      maxdistanceFromInitialPoint,
      maxdistanceFromFinalPoint,
    };
  },
};
</script>

<style>
</style>