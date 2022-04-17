<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Ride Route</div>
    {{ rideObject }}
    {{ formErrors }}

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
      <ToogelRideAcceptingRequestStatus  :rideId="ride.responseObject.id" />
    </div>

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
                {{ initialDateTimeString }}
                <!-- {{
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
                }} -->
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
            :class="`flex flex-col
              ${
                ride.responseObject.intermediatePositions.length == 0
                  ? ' h-12	 '
                  : ' min-h-40'
              }
              border-l-4 border-gray-600
              ml-2
              text-left`"
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
              km
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
              <div class="flex flex-col gap-0">
                <input
                  type="datetime-local"
                  required
                  class="inputBox mb-0"
                  v-model="editedride.RideDateTime"
                />
                <span class="pt-0 text-sm text-red-500 mt-0 font-medium">{{
                  formErrors.RideDatetime
                }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center mb-0">
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
            <div class="flex flex-col w-full">
              <input
                type="text"
                required
                class="inputBox mb-0"
                v-model="editedride.startocationName"
              />
              <span
                class="pt-0 text-sm text-red-500 mt-0 font-mediumformErrors"
                >{{ formErrors.StartPosition }}</span
              >
            </div>
          </div>

          <!-- <div class="h-max border-l-4 border-gray-600 ml-2"></div> -->

          <div class="flex flex-col w-full">
            <span
              class="
                pt-0
                text-sm text-red-500
                mt-0
                text-center
                w-full
                font-medium
              "
            >
              {{ formErrors.IntermediatePositions }}</span
            >
          </div>

          <div
            :class="`flex flex-col
              ${
                ride.responseObject.intermediatePositions.length == 0
                  ? ' h-12	 '
                  : ' min-h-40'
              }
              border-l-4 border-gray-600
              ml-2
              text-left`"
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

          <div class="flex flex-row items-center mb-0">
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
            <div class="flex flex-col w-full">
              <input
                type="text"
                required
                class="inputBox mb-0"
                v-model="editedride.endLocationName"
              />
              <span class="pt-0 text-sm text-red-500 mt-0 font-medium">{{
                formErrors.EndPosition
              }}</span>
            </div>
          </div>

          <div class="flex flex-row items-center justify-between mt-2">
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mt-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>

              <div class="flex flex-col">
                <input
                  type="number"
                  required
                  class="inputBox mb-0"
                  v-model="editedride.numberOfPassengers"
                />
                <span class="pt-0 text-sm text-red-500 mt-0 mb-0 font-medium">{{
                  formErrors.NumberofPassenger
                }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center mb-0 pb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mt-2"
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

              <div class="flex flex-col">
                <input
                  type="number"
                  required
                  class="inputBox mb-0"
                  v-model="editedride.price"
                />
                <span class="pt-0 text-sm text-red-500 mt-0 mb-0 font-medium">{{
                  formErrors.Price
                }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center mt-4">
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
            <div class="text-center flex flex-col">
              <input
                type="text"
                required
                class="inputBox mb-0"
                v-model="editedride.via"
              />
              <span class="pt-0 text-sm text-red-500 mt-0 text-left font-medium"
                >{{ formErrors.RideVia }}
              </span>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-center flex flex-col">
              <input
                type="text"
                required
                class="inputBox mb-0"
                placeholder="Notes"
                v-model="editedride.note"
              />
              <span
                class="pt-0 text-sm text-red-500 mt-0 text-left font-medium"
                >{{ formErrors.Note }}</span
              >
            </div>
          </div>
          <div
            class="mt-2 text-center flex justify-center mb-0 items-center"
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
                mb-0
              "
              id="cars"
            >
              <option value="">Select The Vehicle Type</option>
              <option v-for="item in userVehicles" :key="item" :value="item.id">
                {{ item.companyName }} {{ item.modelName }}
              </option>
            </select>
          </div>
          <span class="pt-0 text-sm text-red-500 mt-0 ml-9 font-medium">{{
            formErrors.VehicleId
          }}</span>

          <div class="flex flex-row justify-center mb-4 mt-2">
            <button class="primaryButton" v-on:click="postEditRide">
              Edit Ride
            </button>
          </div>
        </div>
      </div>
    </div>
    <CotravellerList
      v-if="ride != null"
      :RideId="ride.responseObject.id"
      :key="cotravellerListKey"
      :reloadRideShareOfferForRide="
        () => {
          reloadPage();
          RideShareOfferForRideKey = RideShareOfferForRideKey + 1;
        }
      "
    />

    <div class="flex flex-row justify-center">
      <button
        v-on:click="showRideShareOffers = !showRideShareOffers"
        type="button"
        class="
          w-8/12
          text-white
          bg-blue-500
          hover:bg-blue-400
          focus:ring-4 focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          mr-2
          mb-2
          dark:bg-blue-600 dark:hover:bg-blue-700
          focus:outline-none
          dark:focus:ring-blue-800
        "
      >
        Toggle Offers
      </button>
    </div>

    <div class="h-96 overflow-auto" v-if="showRideShareOffers">
      <RideShareOfferForRide
        v-if="ride != null"
        :rideId="ride.responseObject.id"
        :key="RideShareOfferForRideKey"
        :reloadCotravelList="
          () => {
            reloadPage();

            cotravellerListKey = cotravellerListKey + 1;
          }
        "
      />
    </div>

    <p>Initial Position -> {{ initialPosition }}</p>
    <p>Final Position -> {{ finalPosition }}</p>
    <p>Intermediate Positions -> {{ intermediatePoints }}</p>

    <div v-if="ride != null">
      <div class="flex flex-row-reverse pageMargin1 mb-0 pb-0 mb-1">
        <router-link
          v-if="isRidePathEditable"
          :to="{
            name: 'EditPath',
            params: {
              id: ride.responseObject.id,
            },
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </router-link>
      </div>
      <div class="flex flex-row pageMargin1 mt-0 pt-0">
        <div class="w-full h-96 w-8/12" v-if="mapObject != null">
          <RidePathMap
            class="w-64 h-64"
            :startLocation="mapObject.startLocation"
            :endLocation="mapObject.endLocation"
            :path="mapObject.path"
            :intermediatePoints="mapObject.intermediatePoints"
          />
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
import RideMapComponent from "@/components/Map/RideMapComponent";
import {
  getMyRide,
  getAllApprovedRideShareOfferIds,
} from "@/composables/RideFunctions.js";
import SetLocationsComponent from "@/components/Rides/OfferRide/SetLocationsComponent";
import MapComponent from "@/components/Rides/OfferRide/MapComponent";
import { EditRide } from "@/composables/RideFunctions";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
import { Ride } from "@/Models/Ride";
import { successAlert, errorAlert } from "@/composables/Notifications.js";
import CotravellerList from "@/components/Rides/Ride/CotravellerList";
import RideShareOfferForRide from "@/components/Rides/RideShare/RideShareOffersForRide.vue";
import RidePathMap from "@/components/Map/RidePathMap.vue";
import UtilityData from "@/utility/UtilityData";
import * as moment from "moment";
import ToogelRideAcceptingRequestStatus from "@/components/Rides/Ride/ToogleRideAcceptingRequestStatus";

export default {
  components: {
    //RideMapComponentMapComponent,
    SetLocationsComponent,
    MapComponent,
    CotravellerList,
    RideShareOfferForRide,
    RidePathMap,
    ToogelRideAcceptingRequestStatus,
  },
  setup(props) {
    console.log("Here is The Ride Info Page ");
    const cotravellerListKey = ref(0);
    const RideShareOfferForRideKey = ref(0);
    const ride = ref(null);
    const zoomedLat = ref(null);
    const zoomedLon = ref(null);
    const router = useRoute();
    const rideVehicle = ref(null);
    const showMapEditBar = ref(false);
    const showEditRideForm = ref(false);
    const userVehicles = ref([]);
    const navrouter = useRouter();
    const showRideShareOffers = ref(false);
    const isRidePathEditable = ref(true);
    const mapObject = ref(null);

    const initialDateTimeString = ref(null);

    const formErrors = ref({
      StartPosition: null,
      EndPosition: null,
      IntermediatePositions: null,
      RideDatetime: null,
      VehicleId: null,
      NumberofPassenger: null,
      Price: null,
      Note: null,
      RideVia: null,
    });

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

      // if(
      // rideObject.StartPosition.Name==""
      // ||rideObject.StartPosition.Name==null
      // ||rideObject.EndPosition.Name==""
      // ||rideObject.EndPosition.Name==null
      // ||rideObject.VehicleId ==0
      // ||  rideObject.NumberofPassenger ==0
      // ||  rideObject.Price ==0
      // )
      // {
      //   errorAlert("Validation Error in Form")
      //   return;
      // }

      clearFormErors();

      if (
        rideObject.StartPosition.Name == "" ||
        rideObject.StartPosition.Name == null
      ) {
        formErrors.value.StartPosition = "Initial Position Name Cannot Be Null";
        return;
      }

      if (
        rideObject.EndPosition.Name == "" ||
        rideObject.EndPosition.Name == null
      ) {
        formErrors.value.EndPosition = "End Position Name Cannot Be Null";
        return;
      }
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log(rideObject.VehicleId);
      console.log(rideObject.VehicleId);
      console.log(rideObject.VehicleId);
      console.log(rideObject.VehicleId);
      console.log(rideObject.VehicleId);
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");
      console.log("rideObject.VehicleId");

      if (!Number.isInteger(rideObject.VehicleId)) {
        formErrors.value.VehicleId = "Vehicle  Cannot Be Null";
        return;
      }

      if (rideObject.Price <= 0 || rideObject.Price == null) {
        formErrors.value.Price = "Price Cannot Be Null, Zero Or Negative";
        return;
      }

      if (
        rideObject.NumberofPassenger <= 0 ||
        rideObject.NumberofPassenger == null
      ) {
        formErrors.value.NumberofPassenger =
          "Number of Passengers Cannot Be Null, Zero or  Negative";
        return;
      }

      var response = await EditRide(rideObject);
      if (!response.haveError) {
        successAlert("Updated Sucessfully");
        navrouter.go();
      } else {
        errorAlert("Error While Submitting Form");
      }
    };

    let rideId = router.params.id;

    console.log("Ride ID" + rideId);

    // console.log("latitude:" + router.params.lat);
    // console.log("longitude:" + router.params.lon);
    zoomedLat.value = router.params.zoomlat;
    zoomedLon.value = router.params.zoomlon;

    const clearFormErors = () => {
      const keys = Object.keys(formErrors.value);
      keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key] = null;
      });
    };

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

    const isEditPathShowable = async () => {
      var res = await getAllApprovedRideShareOfferIds(
        ride.value.responseObject.id
      );
      let list = res.responseObject;
      console.log("Length of the List ");
      console.log("Length of the List ");
      console.log("Length of the List ");
      console.log("Length of the List ");
      console.log("Length of the List ");
      console.log(list.length);
      console.log("Length of the List ");
      console.log("Length of the List ");
      console.log("Length of the List ");
      console.log("Length of the List ");
      console.log("Length of the List ");

      // list.isArray() &&
      if (list.length == 0) {
        // alert( "Length of he List"+list.length)
        console.log("Length of the List ");
        console.log("Length of the List ");
        console.log("Length of the List ");
        console.log("Length of the List ");
        console.log("Length of the List ");
        console.log(list.length);
        console.log("Length of the List ");
        console.log("Length of the List ");
        console.log("Length of the List ");
        console.log("Length of the List ");
        console.log("Length of the List ");

        isRidePathEditable.value = true;
      } else {
        isRidePathEditable.value = false;
      }
    };

    onMounted(async () => {
      await loadData();
      initialDateTimeString.value = moment(
        new Date(ride.value.responseObject.dateTimeOfRide)
      ).format("MMMM Do YYYY, h:mm a");
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

      isEditPathShowable();
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
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("Intermediate Position Marker Fun" + fun);
      console.log(fun);
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
      console.log("✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ");
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
      getSetIntermediatePosFun,
      getFreeMarkerFun,
      freeMarkerFun,
      formErrors,
      cotravellerListKey,
      RideShareOfferForRideKey,
      showRideShareOffers,
      isRidePathEditable,
      mapObject,
      isEditPathShowable,
      reloadPage,
      initialDateTimeString,
    };
  },
};
</script>

<style>
</style>