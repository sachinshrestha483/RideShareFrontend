<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Ride Route</div>

    <!-- {{   ride.responseObjectintermediatePositions.map((e) => ({
          name: e.positionName,
          lat: e.positionLatitude,
          lon: e.positionLongitude,
        }))}} -->

    <!-- Edit Ride: {{ editedride }}

    Ride Vehicle : {{ rideVehicle }}

    Ride: {{ ride }} -->

    <!-- Ride: {{ ride }} -->

    <div class="flex flex-row justify-center w-full" v-if="ride != null">
      <div class="flex flex-col md:w-6/12 w-10/12">
        <div
          class="
            shadow-md
            p-8
            hover:bg-gray-200
            text-md text-gray-600
            mb-2
            md:text-left
            text-center
            font-bold
            rounded-lg
            shadow-xl
          "
        >
          <div class="text-2xl mb-4 ml-1">
            <div class="flex justify-between">
              <div>
                {{
                  days[
                    new Date(ride.responseObject.dateTimeOfRide).getDay()
                  ].substring(0, 3)
                }},{{ new Date(ride.responseObject.dateTimeOfRide).getDate() }}
                {{
                  months[
                    new Date(ride.responseObject.dateTimeOfRide).getMonth()
                  ].substring(0, 3)
                }},{{
                  new Date(ride.responseObject.dateTimeOfRide).getHours()
                }}:{{
                  new Date(ride.responseObject.dateTimeOfRide).getMinutes()
                }}
              </div>

              <div class="flex justify-end">
                <svg
                  v-on:click="showEditRideForm = !showEditRideForm"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-circle-fill text-md ml-1"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>

            <div class="ml-2 truncate">
              {{ ride.responseObject.startLocationName }}
            </div>
          </div>

          <div
            :class="
              `flex flex-col
              ${ride.responseObject.intermediatePositions.length==0?' h-12	 ':' min-h-40'}
              border-l-4 border-gray-600
              ml-2
              text-left`
            "
          >
            <!-- <div class="h-12 border-l-4 border-gray-600 ml-2"></div> -->
            <div
              v-for="item in ride.responseObject.intermediatePositions"
              :key="item.id"
              class="ml-4 text-left"
            >
              {{ item.positionName }}<br />
            </div>
          </div>

          <div class="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-circle-fill text-md ml-1"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
            <div class="ml-2 truncate">
              {{ ride.responseObject.endLocationName }}
            </div>
          </div>

          <div class="flex flex-row items-center justify-between mt-2">
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>
              {{ ride.responseObject.numberofPassenger }}
            </div>
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {{ ride.responseObject.price }}
            </div>
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="18" cy="5" r="2" />
                <path
                  d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5"
                />
              </svg>
              {{
                ride.responseObject.distanceinMeter > 0 &&
                typeof ride.responseObject.distanceinMeter == "number"
                  ? Math.round(ride.responseObject.distanceinMeter / 1000)
                  : "0"
              }}
              km7
              <!-- {{typeof(ride.responseObject.distanceinMeter)}} -->
            </div>
          </div>

          <div class="mt-2">
            <div class="text-center">
              {{ ride.responseObject.routeVia }}
            </div>
          </div>

          <div
            class="mt-2 text-center flex justify-center items-center"
            v-if="rideVehicle != null"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path
                d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"
              />
            </svg>

            {{ rideVehicle.companyName }} {{ rideVehicle.modelName }} ({{
              rideVehicle.licensePlateNumber
            }}) ({{ rideVehicle.color }})
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-row justify-center w-full"
      v-if="ride != null && showEditRideForm == true"
    >
      <div class="flex flex-col md:w-6/12 w-10/12">
        <div
          class="
            shadow-md
            p-8
            text-md text-gray-600
            mb-2
            md:text-left
            text-center
            font-bold
            rounded-lg
            shadow-xl
          "
        >
          <div class="text-2xl mb-4 ml-1">
            <div class="flex justify-between">
              <div>
                <input
                  type="datetime-local"
                  required
                  class="inputBox"
                  v-model="editedride.RideDateTime"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-circle-fill text-md ml-1"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
            &nbsp;
            <input
              type="text"
              required
              class="inputBox"
              v-model="editedride.startocationName"
            />
          </div>
          <!-- <div class="h-max border-l-4 border-gray-600 ml-2"></div> -->

          <div
            :class="
              `flex flex-col
              ${ride.responseObject.intermediatePositions.length==0?' h-12	 ':' min-h-40'}
              border-l-4 border-gray-600
              ml-2
              text-left`
              "
            
          >
            <div
              v-for="item in ride.responseObject.intermediatePositions"
              :key="item.id"
              class="ml-3"
            >
              <input
                type="text"
                required
                class="inputBox"
                v-model="item.positionName"
              />

              <br />
            </div>
          </div>

          <div class="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-circle-fill text-md ml-1"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
            &nbsp;
            <input
              type="text"
              required
              class="inputBox"
              v-model="editedride.endLocationName"
            />
          </div>

          <div class="flex flex-row items-center justify-between mt-2">
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>
              <input
                type="number"
                required
                class="inputBox"
                v-model="editedride.numberOfPassengers"
              />
            </div>
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <input
                type="number"
                required
                class="inputBox"
                v-model="editedride.price"
              />
            </div>
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="18" cy="5" r="2" />
                <path
                  d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5"
                />
              </svg>
              {{
                ride.responseObject.distanceinMeter > 0 &&
                typeof ride.responseObject.distanceinMeter == "number"
                  ? Math.round(ride.responseObject.distanceinMeter / 1000)
                  : "0"
              }}
              km
              <!-- {{typeof(ride.responseObject.distanceinMeter)}} -->
            </div>
          </div>

          <div class="mt-2">
            <div class="text-center">
              <input
                type="text"
                required
                class="inputBox"
                v-model="editedride.via"
              />
            </div>
          </div>
          <div class="mt-2">
            <div class="text-center">
              <input
                type="text"
                required
                class="inputBox"
                placeholder="Notes"
                v-model="editedride.note"
              />
            </div>
          </div>
          <div
            class="mt-2 text-center flex justify-center items-center"
            v-if="rideVehicle != null"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path
                d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"
              />
            </svg>

            <select
              v-model="editedride.vehicleId"
              required
              class="
                focus:outline-none
                my-4
                text-gray-500
                rounded-lg
                p-2
                border-2 border-gray-200
                bg-gray-200
                w-full
                h-12
                focus:border-blue-500
                font-medium
                text-gray-500;
              "
              id="cars"
            >
              <option value="">Select The Vehicle Type</option>
              <option v-for="item in userVehicles" :key="item" :value="item.id">
                {{ item.companyName }} {{ item.modelName }}
              </option>
            </select>
          </div>

          <div class="flex flex-row justify-center mb-4 mt-2">
            <button class="primaryButton" v-on:click="postEditRide">
              Edit Ride
            </button>
          </div>
        </div>
      </div>
    </div>

    <p>Initial Position -> {{ initialPosition }}</p>
    <p>Final Position -> {{ finalPosition }}</p>
    <p>Intermediate Positions -> {{ intermediatePoints }}</p>
    <div class="flex flex-row justify-between" v-if="ride != null">
      <div v-show="showMapEditBar">
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
        <div class="flex justify-end">
          <svg
            v-on:click="showMapEditBar = !showMapEditBar"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </div>
        <MapComponent
          :initialPosition="initialPosition"
          :finalPosition="finalPosition"
          :intermediatePoints="intermediatePoints"
          :getInitialPositionMarkerFun="getInitialPositionMarkerFun"
          :getFinalPositionMarkerFun="getFinalPositionMarkerFun"
          :getIntermediatePositionsMarkerFun="getIntermediatePositionsMarkerFun"
          :getCreateRouteFun="getCreateRouteFun"
          :calculateRouteFun="calculateRouteFun"
          :drawRouteFun="drawRouteFun"
          :getDrawRouteFun="getDrawRouteFun"
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
import VehicleFunctions from "@/composables/VehicleFunctions";
import { useRoute, useRouter } from "vue-router";
import RideMapComponent from "@/components/Map/RideMapComponent";
import { getMyRide } from "@/composables/RideFunctions.js";
import SetLocationsComponent from "@/components/Rides/OfferRide/SetLocationsComponent";
import MapComponent from "@/components/Rides/OfferRide/MapComponent";
import { EditRide } from "@/composables/RideFunctions";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
import { Ride } from "@/Models/Ride";

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
    const rideVehicle = ref(null);
    const showMapEditBar = ref(false);
    const showEditRideForm = ref(false);
    const userVehicles = ref([]);

    const editedride = {
      id: 0,
      startocationName: "",
      endLocationName: "",
      startocation: "",
      endLocation: "",
      intermediatePosition: [],
      RideDateTime: new Date(),
      numberOfPassengers: 0,
      amountPerPerson: 0,
      rideDistance: 0,
      via: "",
      vehicleId: 0,
      price: 0,
      note: "",
    };

    const postEditRide = async () => {
      const rideObject = new Ride();
      rideObject.Id = editedride.id;
      rideObject.RidePath = null;
      rideObject.StartPosition = {
        Name: editedride.startocationName,
        Lat: "",
        Lon: "",
      };
      rideObject.EndPosition = {
        Name: editedride.endLocationName,
        Lat: "",
        Lon: "",
      };
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log("Intermediate Position:" + editedride.intermediatePosition);
      console.log(editedride.intermediatePosition);
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log(
        "@@@@@@@@@@@@@@@@@@@+++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@"
      );

      rideObject.IntermediatePositions = editedride.intermediatePosition.map(
        (x) => ({ Name: x.positionName, Lat: null, Lon: null })
      );

      const { GetUtcDateTime } = UtilityFunctions();

      rideObject.RideDatetime = GetUtcDateTime(
        new Date(editedride.RideDateTime)
      );
      rideObject.VehicleId = parseInt(editedride.vehicleId);
      rideObject.NumberofPassenger = parseInt(editedride.numberOfPassengers);
      rideObject.Price = parseInt(editedride.price);
      rideObject.Note = editedride.note;
      rideObject.RideVia = editedride.via;
      await EditRide(rideObject);
    };

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

      // intermediatePoints.value =
      //   ride.value.responseObjectintermediatePositions.map((e) => ({
      //     name: e.positionName,
      //     lat: e.positionLatitude,
      //     lon: e.positionLongitude,
      //   }));

      // .map((e) => ({
      //   name: e.positionName,
      //   lat: e.positionLatitude,
      //   lon: e.positionLongitude,
      // }));

      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");

      var intps = [];

      ride.value.responseObject.intermediatePositions.forEach((element) => {
        console.log(element);
        intps.push({
          name: element.positionName,
          lat: element.positionLatitude,
          lon: element.positionLongitude,
        });
         IntermediatePosFun.value(element.positionName, element.positionLatitude,element.positionLongitude);

      });
// intermediatePoints.value= intps;
// intermediatePositionMarkerFun.value();
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");
      console.log("-------------------@@@@@@@@@@@@@@@@@@-------------------");

      // intermediatePoints.value = ride.value.responseObject.map((e) => ({
      //   name: e.positionName,
      //   lat: e.positionLatitude,
      //   lon: e.positionLongitude,
      // }));

      //   intermediatePositionMarkerFun.value();

      //intermediatePoints.value

      //  intermediatePositions.value.push({
      //         name: val,
      //         lat: nameObject.lat,
      //         lon: nameObject.lon,
      //       });

      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log(drawRouteFun);
      console.log(drawRouteFun);
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log(ride.value.responseObject.path);
      console.log(typeof ride.value.responseObject.path);
      var deserializedPath = JSON.parse(ride.value.responseObject.path);
      drawRouteFun.value(deserializedPath);
      const { GetUserVehicleById } = VehicleFunctions();
      rideVehicle.value = await GetUserVehicleById(
        ride.value.responseObject.vehicleId
      );
      console.log("------------------------Ride Vehicle--------------------");
      console.log(rideVehicle.value);
      console.log(rideVehicle.value);
      console.log(rideVehicle.value);
      console.log(rideVehicle.value);
      console.log(rideVehicle.value);
      console.log("------------------------Ride Vehicle--------------------");

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

      editedride.startocationName = ride.value.responseObject.startLocationName;
      editedride.endLocationName = ride.value.responseObject.endLocationName;
      editedride.id = ride.value.responseObject.id;

      editedride.intermediatePosition =
        ride.value.responseObject.intermediatePositions;
      const birthday = new Date(ride.value.responseObject.dateTimeOfRide);
      const formatedString =
        birthday.getFullYear() +
        "-" +
        ("0" + (birthday.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + birthday.getDate()).slice(-2);
      editedride.RideDateTime = GetDateTimeString(
        new Date(ride.value.responseObject.dateTimeOfRide)
      );
      //      alert(ride.value.responseObject.dateTimeOfRide.getFullYear()  +"-"+ride.value.responseObject.dateTimeOfRide.getMonth()+"-"+ride.value.responseObject.dateTimeOfRide.getDate());
      // ride.value.responseObject.dateTimeOfRide.toISOString().getFullYear()  +"-"+ride.value.responseObject.dateTimeOfRide.toISOString().getMonth()+"-"+ride.value.responseObject.dateTimeOfRide.toISOString().getDate()
      editedride.numberOfPassengers =
        ride.value.responseObject.numberofPassenger;
      editedride.via = ride.value.responseObject.routeVia;
      editedride.vehicleId = ride.value.responseObject.vehicleId;
      editedride.price = ride.value.responseObject.price;
      editedride.note = ride.value.responseObject.note;

      // finalPositionMarkerFun.value();
    });

    const initialPosition = ref({ lat: "", lon: "", name: "" });
    const finalPosition = ref({ lat: "", lon: "", name: "" });
    const intermediatePoints = ref([]);
    const selectedGeojson = ref([]);
    const initialPositionMarkerFun = ref(null);
    const finalPositionMarkerFun = ref(null);
    const intermediatePositionMarkerFun = ref(null);
    const drawRouteFun = ref(null);
    
    
    
const IntermediatePosFun= ref(null);





    const calculateRouteFun = ref(null);
    const createRouteFun = ref(null);

    const getSetIntermediatePosFun=(fun)=>{
      IntermediatePosFun.value=fun;
    }




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
      drawRouteFun,
      getDrawRouteFun,
      days,
      months,
      rideVehicle,
      showMapEditBar,
      showEditRideForm,
      editedride,
      userVehicles,
      postEditRide,
      getSetIntermediatePosFun
    };
  },
};
</script>

<style>
</style>