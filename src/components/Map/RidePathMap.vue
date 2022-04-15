<template>
  <div id="mapid" ref="map" class="z-10"></div>
</template>

<script>
import { ref, computed, onMounted, onActivated } from "vue";

export default {
  props: ["startLocation", "endLocation", "path", "intermediatePoints"],
  setup(props) {
    const map = ref(null);
    let mymap = null;

    onMounted(async () => {
      console.log(map);
      console.log("Making The map");
      mymap = L.map(map.value).setView([23.3315, 75.0367], 5);
      const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileLayer = L.tileLayer(tileUrl, { attribution });
      tileLayer.addTo(mymap);
      drawMapMarkers();
      DrawRoute();
    });

    const DrawRoute = () => {
      let r = JSON.parse(props.path);
      var polyline = L.polyline(r, { color: "red" }).addTo(mymap);
      mymap.fitBounds(polyline.getBounds());
    };
    const drawMapMarkers = () => {
      var initialPositionmarkerOptions = {
        title: "Initial Position marker",
        clickable: true,
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
        [props.startLocation.lat, props.startLocation.lon],
        initialPositionmarkerOptions
      );
      initialPositionmarker.addTo(mymap);

      var finalmarkerOptions = {
        title: "Final Position Marker",
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
        [props.endLocation.lat, props.endLocation.lon],
        finalmarkerOptions
      );
      finalPositionmarker.addTo(mymap);

      props.intermediatePoints.forEach((element) => {
        var intermediatemarkerOptions = {
          title: "intermediate point",
          icon: L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        };

        let intermediatepositionmarker = L.marker(
          [element.positionLatitude, element.positionLongitude],
          intermediatemarkerOptions
        );
        intermediatepositionmarker.addTo(mymap);
      });
    };

    return { map };
  },
};
</script>

<style scoped>
#mapid {
  height: 100%;
  width: 100%;
}
</style>