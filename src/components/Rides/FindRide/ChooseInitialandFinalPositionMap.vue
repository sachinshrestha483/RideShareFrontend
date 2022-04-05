<template>
  <div class="flex flex-row">
    {{ initialPosition }}
    {{ finalPosition }}
    <button v-on:click="drawInitialPositionMarker">
      Draw Initial Position
    </button>
    <button v-on:click="drawFinalPositionMarker">Draw Final Position</button>
  </div>
  <div id="mapid" ref="map"></div>
</template>

<script>
import { ref, computed, onMounted, onActivated } from "vue";

export default {
  props: [
    "getSearchedFinalPosition",
    "getSearchedInitialPosition",
    "setSearchedInitialPosition",
    "setSearchedFinalPosition",
    "ShowHideMapFun",
    "setInitialPositioInForm",
    "setFinalPositioInForm",
  ],

  setup(props) {
    const map = ref(null);
    var mymap;

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

    const drawInitialPositionMarker = () => {
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

      var initialPositionmarker = L.marker(
        [initialPosition.value.lat, initialPosition.value.lon],
        initialPositionmarkerOptions
      );

      initialPositionmarker.on("moveend", function (e) {
        console.log("marker drag event");
        console.log(e.target._latlng);
        var obj = e.target._latlng;
        initialPosition.value.lat = obj.lat;
        initialPosition.value.lon = obj.lng;
        props.setSearchedInitialPosition(initialPosition.value);

        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");

        console.log(props.setInitialPositioInForm);
        props.setInitialPositioInForm(initialPosition.value);

        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
      });
      initialPositionmarker.addTo(mymap);
    };

    const drawFinalPositionMarker = () => {
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
      var finalPositionmarker = L.marker(
        [finalPosition.value.lat, finalPosition.value.lon],
        finalmarkerOptions
      );
      finalPositionmarker.on("moveend", function (e) {
        console.log("marker drag event");
        console.log(e.target._latlng);
        var obj = e.target._latlng;
        finalPosition.value.lat = obj.lat;
        finalPosition.value.lon = obj.lng;
        props.setSearchedFinalPosition(finalPosition.value);
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        props.setFinalPositioInForm(finalPosition.value);
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
        console.log("Calling For Setting Value from the form");
      });

      finalPositionmarker.addTo(mymap);
    };

    onMounted(() => {
      console.log(map);
      console.log("Making The map");
      mymap = L.map(map.value).setView([23.3315, 75.0367], 5);
      const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileLayer = L.tileLayer(tileUrl, { attribution });
      tileLayer.addTo(mymap);
    });
    return {
      map,
      drawInitialPositionMarker,
      drawFinalPositionMarker,
      initialPosition,
      finalPosition,
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