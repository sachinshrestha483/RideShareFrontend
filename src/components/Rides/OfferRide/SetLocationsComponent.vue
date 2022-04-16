<template>
  <div class="w-96 overflow-y-auto p-2" style="height: 100vh">
    <div class="flex flex-col">
      {{initialPosition}}
      {{finalPosition}}
      {{intermediatePositions}}


      <label class="secondaryText">Initial Position</label>
      <vue-bootstrap-typeahead
        class="mb-0"
        ref="initialPSearchBox"
        v-on:keyup="InitialPchange"
        :data="filteredNames"
        @hit="SelectInitialPosition($event)"
      />
      <span class="pt-0 text-sm text-red-500  mt-0 font-medium">{{formErrors.initialPosition}}</span>

      <br />
      <label class="secondaryText">Intermediate Position</label>

      <vue-bootstrap-typeahead
        ref="IntermediateSearchBox"
        v-on:keyup="intermediateChange(index)"
        :data="filteredNames"
        placeholder="Add Intermediate"
        @hit="setIntermediatePosition(intermediatePoints.length, $event)"
      />
      <span class="pt-0 text-sm text-red-500  mt-0 font-medium">{{formErrors.intermediatePositions}}</span>

      <div v-for="(item, index) in intermediatePoints" :key="item">
        <div
          class="
            grid grid-cols-12
            gap-1
            p-4
            mb-2
            font-semibold
            text-gray-600
            bg-gray-200
            rounded-md
            items-center
          "
        >
          <div class="col-span-10 truncate">{{ item.name }}</div>
          <div class="text-right">
            <svg
              v-on:click="removeIntermeditePoint(index)"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-right"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <br />

      <!-- <input class="inputBox w-96" /> -->
      <label class="secondaryText">Final Position</label>
      <vue-bootstrap-typeahead
        v-on:keyup="FinalPchange"
        :data="filteredNames"
        ref="finalPSearchBox"
        @hit="SelectFinalPosition($event)"
      />
      <span class="pt-0 text-sm text-red-500  mt-0   mb-4 font-medium">{{formErrors.finalPosition}}</span>

      <label class="secondaryText" v-if="isEditView == false"
        >Select Vehicle</label
      >

      <select
        v-if="isEditView == false"
        v-model="selectedVehicleId"
        required
        class="
        mb-0
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

      <span class="pt-0 text-sm text-red-500  mt-2 font-medium mb-2 ">{{formErrors.selectedVehicleId }}</span>


      <label class="secondaryText" v-if="isEditView == false"
        >Number of Passengers</label
      >

      <input
        type="number"
        required
        class="inputBox mb-0"
        v-if="isEditView == false"
        v-model="numberOfPassengers"
      />

      <span class="pt-0 text-sm text-red-500  mt-2 font-medium mb-1 ">{{formErrors.numberOfPassengers}}</span>

      <br />
      <label class="secondaryText" v-if="isEditView == false"
        >Ride Date Time</label
      >
      <input
        v-if="isEditView == false"
        type="datetime-local"
        class="inputBox mb-0"
        v-model="rideDateTime"
      />

      <span class="pt-0 text-sm text-red-500  mt-2 font-medium mb-4 ">{{formErrors.rideDateTime}}</span>


      <label class="secondaryText" v-if="isEditView == false">Price</label>

      <input
        type="number"
        class="inputBox mb-1"
        v-if="isEditView == false"
        v-model="price"
      />

      <span class="pt-0 text-sm text-red-500  mt-2 font-medium mb-4 ">{{formErrors.price}}</span>


      <label class="secondaryText" v-if="isEditView == false">Notes</label>

      <textarea
        type="text"
        class="inputBox mb-8"
        v-if="isEditView == false"
        v-model="note"
      />
      <span class="pt-0 text-sm text-red-500  mt-2 font-medium mb-4 ">{{formErrors.note}}</span>

    </div>

    <div class="container" v-if="resultRoutes.length > 0">
      <h4 class="text-center secondaryText pt-4">Routes</h4>

      <div
        class="text-gray-500 my-4 font-semibold"
        v-for="(item, index) in resultRoutes"
        :key="item"
      >
        <div
          v-on:click="
            {
              createRouteFun(resultRoutes, index);
              selectedRouteIndex = index;
            }
          "
          :class="
            selectedRouteIndex == index
              ? ' text-center bg-gray-200 p-4 rounded-md border-2 border-blue-500 '
              : 'text-center bg-gray-200 p-4 rounded-md  '
          "
        >
          <h4>Path {{ index + 1 }}</h4>
          <!-- <p>via -{{item.via}}</p> -->
          <div class="">
            <div>
              <h4>Via</h4>
            </div>
            <div class="row">
              <div class="col-md-12" v-for="item1 in item.via" :key="item1">
                {{ item1 }}
              </div>
            </div>
            <p>Distance - {{ Math.round(item.distance / 1000) }} km</p>
          </div>
        </div>

        <!--  {{item}} -->
      </div>
    </div>

    <div class="flex flex-row justify-center mb-4 mt-2">
      <button class="primaryButton" v-on:click="calcuteRoute">
        Search Route
      </button>
    </div>

    <div class="text-center text-gray-500" v-if="selectedRouteIndex != null">
      <h4 class="text-center secondaryText pt-4">Route Summary</h4>

      <div>
        <p>Ride Date Time: {{ rideDateTime }}</p>
        <p>
          Route Distance : {{ resultRoutes[selectedRouteIndex].distance }} km
        </p>
        <p>Route Start Position :{{ initialPosition }}</p>
        <p>Route End Position :{{ finalPosition }}</p>
        <p>Route Intermediate Posotion :{{ intermediatePositions }}</p>
        <p>Selected Route Index : {{ selectedRouteIndex }}</p>

        <div
          class="flex flex-row justify-center mb-4 mt-2"
          v-if="isEditView == false"
        >
          <button class="primaryButton" v-on:click="publishRoute">
            Publish Ride
          </button>
        </div>
        <div class="flex flex-row justify-center mb-4 mt-2" v-else>
          <button class="primaryButton" v-on:click="EditRoute">
            Edit Ride
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";
import { useStore } from "vuex";
import VehicleFunctions from "@/composables/VehicleFunctions";
import { computed, ref } from "vue";
import { Ride } from "@/Models/Ride";
import Swal from "sweetalert2";
import { successAlert, errorAlert } from "@/composables/Notifications.js";
import {
  PublishRide,
  EditRide,
  AdvanceEditRide,
} from "@/composables/RideFunctions";
import Store from "@/store/index";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
import { useRoute, useRouter } from "vue-router";
import Debouncing from "@/utility/Debouncing.js";

export default {
  components: {
    VueBootstrapTypeahead,
  },
  props: [
    "initialPosition",
    "intermediatePoints",
    "finalPosition",
    "initialPositionMarkerFun",
    "finalPositionMarkerFun",
    "intermediatePositionMarkerFun",
    "getCalculateRouteFun",
    "createRouteFun",
    "isEditView",
    "EditViewSavedRideId",
    "getSetIntermediatePosFun",
    "getSetInitialPositionLatLon",
    "getSetFinalPositionLatLon",
    "getSetIntermediatePositionLatLon"
  ],

  setup(props) {
    const router = useRouter();
    const debouncer = new Debouncing();

    const initialPSearchBox = ref(null);
    const finalPSearchBox = ref(null);
    const IntermediateSearchBox = ref(null);
    const mainresult = ref([]);
    const filteredNames = ref([]);
    const resultRoutes = ref([]);
    const userVehicles = ref([]);
    const selectedVehicleId = ref(null);
    const numberOfPassengers = ref(0);
    const price = ref(null);
    const note = ref(null);

    const { getNames } = OpenStreetMapFunctions();

    const selectedRouteIndex = ref(null);
    const initialPosition = ref({ name: null, lat: null, lon: null });
    const finalPosition = ref({ name: null, lat: null, lon: null });
    const intermediatePositions = ref([]);

    const rideDateTime = ref(null);

    const formErrors = ref({
      initialPosition: null,
      intermediatePositions: null,
      finalPosition: null,
      selectedVehicleId: null,
      price: null,
      numberOfPassengers: null,
      rideDateTime: null,
      note: null,
    });

    const clearFormErors = () => {
      const keys = Object.keys(formErrors.value);
      keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key] = null;
      });
    };

    const setInitalPosLatLon=(lat,lon)=>{
      initialPosition.value.lat= lat;
      initialPosition.value.lon= lon;
    }

    
    const setFinalPosLatLon=(lat,lon)=>{
      finalPosition.value.lat= lat;
      finalPosition.value.lon= lon;
    }

  const setIntermediatePositionsLatLon=(val)=>{

   if(val.index<intermediatePositions.value.length)
    {
      intermediatePositions.value[val.index].lat= val.lat;
      intermediatePositions.value[val.index].lon= val.lon;
    }
  }


    props.getSetInitialPositionLatLon(setInitalPosLatLon);
    props.getSetFinalPositionLatLon(setFinalPosLatLon)
    props.getSetIntermediatePositionLatLon(setIntermediatePositionsLatLon);
  








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
      debouncer.setdebouncingFunction(getPlaceNames, [
        initialPSearchBox.value.inputValue,
      ]);
      // getPlaceNames(initialPSearchBox.value.inputValue);
    };

    const FinalPchange = () => {
      console.log("-------Change it------");
      console.log(finalPSearchBox.value.inputValue);
      console.log(finalPSearchBox.value.inputValue);
      debouncer.setdebouncingFunction(getPlaceNames, [
        finalPSearchBox.value.inputValue,
      ]);
      //  getPlaceNames(finalPSearchBox.value.inputValue);
    };

    const intermediateChange = (index) => {
      console.log(typeof props.intermediatePoints);
      console.log("--- Here is----");
      console.log("index:");
      console.log(index);
      console.log(IntermediateSearchBox.value.inputValue);
      console.log("--- Here is----");
      debouncer.setdebouncingFunction(getPlaceNames, [
        IntermediateSearchBox.value.inputValue,
      ]);
      //      getPlaceNames(IntermediateSearchBox.value.inputValue);
    };

    const SelectInitialPosition = (val) => {
      console.log(val);
      console.log(props);
      props.initialPosition.name = val;
      var nameObject = mainresult.value.find((e) => e.display_name == val);
      console.log(nameObject);
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");

      console.log("the Type of Latitude is :" + typeof nameObject.lat);
      console.log("the Type of Longitude is :" + typeof nameObject.lon);
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");
      console.log("----------------------------");

      props.initialPosition.lat = nameObject.lat;
      props.initialPosition.lon = nameObject.lon;
      // props.setInitialPosMarker(
      //   props.initialPosition.lat,
      //   props.initialPosition.lon
      // );
      console.log("-------Creating The Marker--------");
      console.log("-------Creating The Marker--------");
      console.log(props.initialPositionMarkerFun);
      console.log("-------Creating The Marker--------");
      console.log("-------Creating The Marker--------");

      props.initialPositionMarkerFun(nameObject.lat, nameObject.lon);

      initialPosition.value.name = val;
      initialPosition.value.lat = nameObject.lat;
      initialPosition.value.lon = nameObject.lon;
    };

    const SelectFinalPosition = (val) => {
      console.log(val);
      props.finalPosition.name = val;
      var nameObject = mainresult.value.find((e) => e.display_name == val);
      console.log(nameObject);

      props.finalPosition.lat = nameObject.lat;
      props.finalPosition.lon = nameObject.lon;
      props.finalPositionMarkerFun(
        props.finalPosition.lat,
        props.finalPosition.lon
      );

      finalPosition.value.name = val;
      finalPosition.value.lat = nameObject.lat;
      finalPosition.value.lon = nameObject.lon;
    };

    const setIntermediatePositionValue = async (name, lat, lon) => {
      props.intermediatePoints.push({
        name: name,
        lat: lat,
        lon: lon,
      });
      console.log(props.intermediatePoints);

      props.intermediatePositionMarkerFun();
      // props.SetIntermediatePosMarker();

      intermediatePositions.value.push({
        name: name,
        lat: lat,
        lon: lon,
      });
      // intermediatePositions.value.push({
      //   name: name,
      //   lat: nameObject.lat,
      //   lon: nameObject.lon,
      // });

      await calcuteRoute();
    };

    try {
      props.getSetIntermediatePosFun(setIntermediatePositionValue);
    } catch (e) {}
    const setIntermediatePosition = async (index, val) => {
      console.log("Index" + index);
      console.log("Val" + val);
      console.log(props.intermediatePoints);
      var nameObject = mainresult.value.find((e) => e.display_name == val);
      console.log(nameObject);
      // props.intermediatePoints[index].lat = nameObject.lat;
      // props.intermediatePoints[index].lon = nameObject.lon;
      props.intermediatePoints.push({
        name: val,
        lat: nameObject.lat,
        lon: nameObject.lon,
      });
      console.log(props.intermediatePoints);

      props.intermediatePositionMarkerFun();
      // props.SetIntermediatePosMarker();
      intermediatePositions.value.push({
        name: val,
        lat: nameObject.lat,
        lon: nameObject.lon,
      });

      await calcuteRoute();
    };

    const removeIntermeditePoint = async (index) => {
      props.intermediatePoints.splice(index, 1);
      intermediatePositions.value.splice(index, 1);
      props.intermediatePositionMarkerFun();

      await calcuteRoute();
    };

    const calcuteRoute = async () => {
      // https://routing.openstreetmap.de/routed-bike/route/v1/driving/75.8682,22.720362;77.401989,23.258486;74.91779,23.480592?overview=false&alternatives=true&steps=true
      let res = null;

      if (props.intermediatePoints.length != 0) {
        let intermediatePointsLatLonString = "";
        props.intermediatePoints.forEach((item) => {
          intermediatePointsLatLonString =
            intermediatePointsLatLonString + item.lon + "," + item.lat + ";";
        });
        console.log("----intermediate string---");
        console.log(intermediatePointsLatLonString);
        res = await fetch(
          "https://routing.openstreetmap.de/routed-bike/route/v1/driving/" +
            props.initialPosition.lon +
            "," +
            props.initialPosition.lat +
            ";" +
            intermediatePointsLatLonString +
            props.finalPosition.lon +
            "," +
            props.finalPosition.lat +
            "?overview=false&alternatives=true&steps=true&geometries=geojson"
        );
      } else {
        res = await fetch(
          "https://routing.openstreetmap.de/routed-bike/route/v1/driving/" +
            props.initialPosition.lon +
            "," +
            props.initialPosition.lat +
            ";" +
            props.intermediatePoints +
            props.finalPosition.lon +
            "," +
            props.finalPosition.lat +
            "?overview=false&alternatives=true&steps=true&geometries=geojson"
        );
      }

      const obj = await res.json();

      let routes = obj.routes;
      console.log(routes);
      // for each route we have different path

      let paths = [];
      // {
      //     name:""
      //     duration:""
      //     distance;""
      //     via:[]
      //     latlongArr:[]
      // }

      routes.forEach((element) => {
        var pathObject = {
          name: "",
          duration: "",
          distance: "",
          via: [],
          latLongArr: [],
          intermediatePlaceNames: [],
          geoJson: [],
        };

        console.log("------Legs------");
        console.log(element.legs);
        console.log("-----Legs-------");
        console.log("----path----");
        var latLongArray = [];
        var geoJsonArray = [];

        element.legs.forEach((item2) => {
          console.log(item2);
          pathObject.via = [...pathObject.via, item2.summary];

          //         console.log(item2.steps);

          var intermediatepath = item2.steps;
          //    console.log("Intermediate Path");
          //  console.log(intermediatepath);
          //console.log("Intermediate Path");

          intermediatepath.forEach((item3) => {
            // console.log(item3.maneuver.location);
            latLongArray = [...latLongArray, item3.maneuver.location];
            geoJsonArray = [...geoJsonArray, ...item3.geometry.coordinates];

            if (item3.name != "") {
              pathObject.intermediatePlaceNames = [
                ...pathObject.intermediatePlaceNames,
                item3.name,
              ];
            }
            //console.log(latLongArray);
          });
        });

        console.log("----Lat Long Array---");
        console.log(latLongArray);

        console.log("Lat Long Array Elements");

        // latLongArray.forEach((item,index)=>{
        //     console.log(item,index);
        // })

        pathObject.latLongArr = latLongArray;
        pathObject.distance = element.distance;
        pathObject.duration = element.duration;
        pathObject.geoJson = geoJsonArray;

        console.log(pathObject);
        // changes
        // let r = possiblePaths[pathNum].geoJson.map((e) => e.reverse());

        pathObject.geoJson = pathObject.geoJson.map((e) => e.reverse());
        // changes

        paths.push(pathObject);
      });

      console.log(paths);

      console.log(paths);
      resultRoutes.value = paths;
      //   lRoutes = paths;

      props.createRouteFun(paths);
    };

    props.getCalculateRouteFun(calcuteRoute);

    const publishRoute = async () => {
      let user = Store.state.user;
      const { GetUtcDateTime } = UtilityFunctions();

      if (user == null) {
        console.log("User Is Null  Cant Save The Ride");
        return;
      }

      console.log("Publish Route");
      console.log(selectedRouteIndex.value);
      console.log(resultRoutes.value[selectedRouteIndex.value]);

      const rideObject = new Ride();
      rideObject.UserId = parseInt(user.id);
      rideObject.RidePath =
        resultRoutes.value[selectedRouteIndex.value].geoJson;
      rideObject.StartPosition = initialPosition.value;
      rideObject.EndPosition = finalPosition.value;
      rideObject.IntermediatePositions = intermediatePositions.value;
      rideObject.RideDistance =
        resultRoutes.value[selectedRouteIndex.value].distance;
      rideObject.RideDatetime = GetUtcDateTime(new Date(rideDateTime.value));
      rideObject.VehicleId = parseInt(selectedVehicleId.value);
      rideObject.NumberofPassenger = parseInt(numberOfPassengers.value);
      rideObject.Price = parseInt(price.value);
      rideObject.Note = note.value;
      let routeViaString =
        resultRoutes.value[selectedRouteIndex.value].via.join();
      rideObject.RideVia = routeViaString;
      console.log("Resoult Routes");
      console.log("Resoult Routes");
      console.log("Resoult Routes");

      console.log(resultRoutes.value[selectedRouteIndex.value]);
      console.log(resultRoutes.value[selectedRouteIndex.value].via);
      console.log(resultRoutes.value[selectedRouteIndex.value].via.join());

      // rideObject.RouteVia=
      clearFormErors()

      if (
        initialPosition.value.name == null ||
        initialPosition.value.name.toString().trim() == ""
      ) {
        formErrors.value.initialPosition =
          "Initial Position Name Cannot Be Null";
        return;
      }

      if (
        initialPosition.value.lat == null ||
        initialPosition.value.lat.toString().trim() == "" ||
        initialPosition.value.lon == null ||
        initialPosition.value.lon.toString().trim() == ""
      ) {
        formErrors.value.initialPosition = "Initial Position Not Valid";
        return;
      }

      if (
        finalPosition.value.lat == null ||
        finalPosition.value.lat.toString().trim() == "" ||
        finalPosition.value.lon == null ||
        finalPosition.value.lon.toString().trim() == ""
      ) {
        formErrors.value.finalPosition = "Final Position Not Valid";
        return;
      }

      if (
        finalPosition.value.name == null ||
        finalPosition.value.name.toString().trim() == ""
      ) {
        formErrors.value.finalPosition = "Final Position Name Cannot Be Null";
        return;
      }

      if (selectedVehicleId.value == null || selectedVehicleId.value == 0) {
        formErrors.value.selectedVehicleId = "Select Vehicle";
        return;
      }

      if (numberOfPassengers.value == null || numberOfPassengers.value == 0|| numberOfPassengers.value < 0) {
        formErrors.value.numberOfPassengers =
          "Number of Passengers Cannot Be 0 or Less than 0";
        return;
      }

      if (rideDateTime.value == null || rideDateTime.value == 0) {
        formErrors.value.rideDateTime = "Ride Date Time Cannot Be Null";
        return;
      }

      if (price.value == null || price.value == 0|| price.value < 0) {
        formErrors.value.price = "Price Can 0 Null or Negative";
        return;
      }

      console.log("-----Ride Object-------");
      console.log("-----Ride Object-------");
      console.log("-----Ride Object-------");
      console.log("-----Ride Object-------");

      let response = await PublishRide(rideObject);

      if (!response.haveError) {
        Swal.fire(" Ride Sucessfully Submitted", "success");
        router.push({ name: "YourRide" });
      } else {
        //   router.push({ name: "Home" });
        //    alert("Error in Submitting Form");
        Swal.fire({
          title: "Error in Submitting The Form!",
          text: "Please Try Again Later",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }

      //    console.log(response);
    };

    const EditRoute = async () => {
      let user = Store.state.user;

      if (user == null) {
        console.log("User Is Null  Cant Save The Ride");
        return;
      }

      console.log("Publish Route");
      console.log(selectedRouteIndex.value);
      console.log(resultRoutes.value[selectedRouteIndex.value]);

      const rideObject = new Ride();
      rideObject.Id = props.EditViewSavedRideId;
      rideObject.RidePath =
        resultRoutes.value[selectedRouteIndex.value].geoJson;
      rideObject.StartPosition = initialPosition.value;
      rideObject.EndPosition = finalPosition.value;
      rideObject.IntermediatePositions = intermediatePositions.value;
      rideObject.RideDistance =
        resultRoutes.value[selectedRouteIndex.value].distance;
      let routeViaString =
        resultRoutes.value[selectedRouteIndex.value].via.join();
      rideObject.RideVia = routeViaString;
      console.log("Resoult Routes");
      console.log("Resoult Routes");
      console.log("Resoult Routes");

      console.log(resultRoutes.value[selectedRouteIndex.value]);
      console.log(resultRoutes.value[selectedRouteIndex.value].via);
      console.log(resultRoutes.value[selectedRouteIndex.value].via.join());

      // rideObject.RouteVia=

      console.log("-----Ride Object-------");
      console.log("-----Ride Object-------");
      console.log("-----Ride Object-------");
      console.log("-----Ride Object-------");





      if (
        initialPosition.value.name == null ||
        initialPosition.value.name.toString().trim() == ""
      ) {
        formErrors.value.initialPosition =
          "Initial Position Name Cannot Be Null";
        return;
      }

      if (
        initialPosition.value.lat == null ||
        initialPosition.value.lat.toString().trim() == "" ||
        initialPosition.value.lon == null ||
        initialPosition.value.lon.toString().trim() == ""
      ) {
        formErrors.value.initialPosition = "Initial Position Not Valid";
        return;
      }

      if (
        finalPosition.value.lat == null ||
        finalPosition.value.lat.toString().trim() == "" ||
        finalPosition.value.lon == null ||
        finalPosition.value.lon.toString().trim() == ""
      ) {
        formErrors.value.finalPosition = "Final Position Not Valid";
        return;
      }

      if (
        finalPosition.value.name == null ||
        finalPosition.value.name.toString().trim() == ""
      ) {
        formErrors.value.finalPosition = "Final Position Name Cannot Be Null";
        return;
      }


rideObject.IntermediatePositions.forEach((item)=>{
  item.lat=item.lat.toString();
  item.lon=item.lon.toString();
})


      let response = await AdvanceEditRide(rideObject);
      console.log(response);

      if (!response.haveError) {
        successAlert("Sucessfully Udated ");
      } else {
        errorAlert("Error While Submitting the  Form");
      }
      //
      //router.go();
      //   console.log(response);
    };

    return {
      initialPSearchBox,
      finalPSearchBox,
      InitialPchange,
      FinalPchange,
      mainresult,
      filteredNames,
      SelectInitialPosition,
      SelectFinalPosition,
      IntermediateSearchBox,
      intermediateChange,
      setIntermediatePosition,
      removeIntermeditePoint,
      calcuteRoute,
      resultRoutes,
      selectedRouteIndex,
      initialPosition,
      intermediatePositions,
      finalPosition,
      publishRoute,
      rideDateTime,
      userVehicles,
      selectedVehicleId,
      numberOfPassengers,
      price,
      note,
      EditRoute,
      formErrors
    };
  },
};
</script>

<style>
.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}

.vbt-autcomplete-list {
  padding-top: 0px;
  position: absolute;
  max-height: 350px;
  overflow-y: auto;
  z-index: 999;
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
