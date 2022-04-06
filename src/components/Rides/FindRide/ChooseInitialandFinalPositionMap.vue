<template>
  <div class="flex flex-row-reverse">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      v-on:click="toogleShowMap()"
      class="h-5 w-5 mb-1"
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
  {{ initialPosition }}
  {{ finalPosition }}
  <div class="flex flex-row">
    <div class="flex flex-col w-4/12 p-4 pr-8">
      <div class="flex flex-row">
        <button
          type="button"
          class="
            text-white
            bg-blue-700
            hover:bg-blue-800
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
          v-on:click="drawInitialPositionMarker(false)"
        >
          Draw Initial Position
        </button>

        <button
          type="button"
          class="
            text-white
            bg-blue-700
            hover:bg-blue-800
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
          v-on:click="drawFinalPositionMarker(false)"
        >
          Draw Final Position
        </button>

        <!-- <button
          class="primaryButton mb-4"
          v-on:click="drawInitialPositionMarker(false)"
        >
          Draw Initial Position
        </button> -->
        <!-- <button
          class="primaryButton mb-4"
          v-on:click="drawFinalPositionMarker(false)"
        >
          Draw Final Position
        </button> -->
      </div>

      <label class="secondaryText">Initial Position Latitude</label>
      <input
        class="inputBox mb-8"
        v-model="markersForm.initialPositionLatitude"
      />

      <label class="secondaryText">Initial Position Longitude</label>
      <input
        class="inputBox mb-8"
        v-model="markersForm.initialPositionLongitude"
      />

      <label class="secondaryText">Final Position Latitude</label>
      <input
        class="inputBox mb-8"
        v-model="markersForm.finalPositionLatitide"
      />

      <label class="secondaryText">Final Position Longitude</label>
      <input
        class="inputBox mb-8"
        v-model="markersForm.finaPositionLongitude"
      />

      <div class="flex flex-row justify-center mb-4 mt-2">
        <button class="primaryButton w-full" v-on:click="submitForm">
          Set Locations Value
        </button>
      </div>
    </div>
    <div class="flex flex-col"></div>
    <div id="mapid" ref="map" class="w-8/12"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onActivated, onUpdated } from "vue";

export default {
  props: [
    "getSearchedFinalPosition",
    "getSearchedInitialPosition",
    "setSearchedInitialPosition",
    "setSearchedFinalPosition",
    "ShowHideMapFun",
    "setInitialPositioInForm",
    "setFinalPositioInForm",
    "getDrawInitialPositionMarkerFun",
    "getDrawFinalPositionMarkerFun",
    "getSetInitialPositionInMapValue",
    "getSetFinalPositionInMapValue",
    "toogleShowMap",
    "getInitialLocationFromFun",
    "getfinalLocationFromFun",
  ],

  setup(props) {
    const map = ref(null);
    var mymap;
    let initialPositionmarker = null;
    let finalPositionmarker = null;

    const markersForm = ref({
      initialPositionLatitude: "",
      initialPositionLongitude: "",
      finalPositionLatitide: "",
      finaPositionLongitude: "",
    });

    const submitForm = () => {
      initialPosition.value.lat =
        markersForm.value.initialPositionLatitude.toString();

      initialPosition.value.lon =
        markersForm.value.initialPositionLongitude.toString();

      finalPosition.value.lat = String(markersForm.value.finalPositionLatitide);
      finalPosition.value.lon = String(markersForm.value.finaPositionLongitude);
      drawInitialPositionMarker(true);
      drawFinalPositionMarker(true);
    };

    const initialPosition = ref({
      name: null,
      lat: "23.3366925",
      lon: "75.0074264",
    });
    const finalPosition = ref({
      name: null,
      lat: "23.3366925",
      lon: "75.0074264",
    });

    const setInitialPosition = (val) => {
      initialPosition.value.lat = initialPosition.value.lat.toString();
      initialPosition.value = val;
    };
    const setFinalPosition = (val) => {
      initialPosition.value.lon = initialPosition.value.lon.toString();

      finalPosition.value = val;
    };

    props.getSetInitialPositionInMapValue(setInitialPosition);
    props.getSetFinalPositionInMapValue(setFinalPosition);

    const drawInitialPositionMarker = (redraw) => {
      if (initialPositionmarker != null && redraw == false) {
        return;
      }
      if (redraw == true && initialPositionmarker != null) {
        mymap.removeLayer(initialPositionmarker);
      }
      var initialPositionmarkerOptions = {
        title: "Initial Position marker",
        clickable: true,
        draggable: true,
        icon: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      };

      initialPositionmarker = L.marker(
        [initialPosition.value.lat, initialPosition.value.lon],
        initialPositionmarkerOptions
      );

        props.setInitialPositioInForm(initialPosition.value);



      initialPositionmarker.on("moveend", function (e) {
        console.log("marker drag event");
        console.log(e.target._latlng);
        var obj = e.target._latlng;
        initialPosition.value.lat = obj.lat.toString();
        initialPosition.value.lon = obj.lng.toString();
        props.setInitialPositioInForm(initialPosition.value);
      });
      initialPositionmarker.addTo(mymap);
    };

    const drawFinalPositionMarker = (redraw) => {
      if (finalPositionmarker != null && redraw == false) {
        return;
      }
      if (finalPositionmarker != null && redraw == true) {
        mymap.removeLayer(finalPositionmarker);
      }

      var finalmarkerOptions = {
        title: "Final Position Marker",
        draggable: true,
        clickable: true,
        icon: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      };
      finalPositionmarker = L.marker(
        [finalPosition.value.lat, finalPosition.value.lon],
        finalmarkerOptions
      );
        console.log(props.setFinalPositioInForm(finalPosition.value));

      finalPositionmarker.on("moveend", function (e) {
        console.log("marker drag event");
        console.log(e.target._latlng);
        var obj = e.target._latlng;
        finalPosition.value.lat = obj.lat.toString();
        finalPosition.value.lon = obj.lng.toString();
        //        props.setSearchedFinalPosition.value(finalPosition.value);
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log(props.setFinalPositioInForm(finalPosition.value));
        //   props.setFinalPositioInForm(finalPosition.value);
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
      });

      finalPositionmarker.addTo(mymap);
    };

    props.getDrawInitialPositionMarkerFun(drawInitialPositionMarker);
    props.getDrawFinalPositionMarkerFun(drawFinalPositionMarker);

    let tileLayer = null;
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    // onUpdated(() => {
    //   console.log("Redrawing the map");
    //   mymap.removeLayer(tileLayer);
    //   tileLayer = L.tileLayer(tileUrl, { attribution });
    //   tileLayer.addTo(mymap);
    // });

    onMounted(() => {
      console.log(map);
      console.log("Making The map");
      mymap = L.map(map.value).setView([23.3315, 75.0367], 5);

      tileLayer = L.tileLayer(tileUrl, { attribution });
      tileLayer.addTo(mymap);
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");

      console.log(props.getSearchedInitialPosition);
      console.log(props.getSearchedFinalPosition);

      var csd = props.getSearchedInitialPosition();
      var grfd = props.getSearchedFinalPosition();
      console.log(csd);
      console.log(grfd);

      if (
        !(
          csd == null ||
          csd == undefined ||
          csd.lat == undefined ||
          csd.lon == undefined
        )
      ) {
        initialPosition.value.lat = csd.lat;
        initialPosition.value.lon = csd.lon;
        finalPosition.value.lat = grfd.lat;
        finalPosition.value.lon = grfd.lon;
        drawInitialPositionMarker(true);
        drawFinalPositionMarker(true);
      }

      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
      console.log("@@@@@@@@##########@@@@@@@@@@@@###########@@@@@@@");
    });
    return {
      map,
      drawInitialPositionMarker,
      drawFinalPositionMarker,
      initialPosition,
      finalPosition,
      markersForm,
      submitForm,
    };
  },
};
</script>

<style scoped>
#mapid {
  height: 100vh;
  width: 100%;
}
</style>