<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Edit Path</div>
    {{ rideObject }}
    {{ formErrors }}
    <p>Initial Position -> {{ initialPosition }}</p>
    <p>Final Position -> {{ finalPosition }}</p>
    <p>Intermediate Positions -> {{ intermediatePoints }}</p>

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
          :getFreeMarkerFun="getFreeMarkerFun"
        />
      </div>
    </div>
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
import { successAlert, errorAlert } from "@/composables/Notifications.js";
import CotravellerList from "@/components/Rides/Ride/CotravellerList";

export default {
  components: {
    //RideMapComponentMapComponent,
    SetLocationsComponent,
    MapComponent,
    CotravellerList,
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
    const navrouter = useRouter();

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

      if (rideObject.VehicleId != typeof Number) {
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
        IntermediatePosFun.value(
          element.positionName,
          element.positionLatitude,
          element.positionLongitude
        );
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
    };
  },
};
</script>

<style>
</style>