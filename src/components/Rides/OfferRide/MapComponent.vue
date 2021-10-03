<template>
{{props}}
  <div id="mapid" ref="map"></div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: [
    "getInitialPositionMarkerFun",
    "initialPosition",
    "finalPosition",
    "getFinalPositionMarkerFun",
    "intermediatePoints",
    "getIntermediatePositionsMarkerFun",
    "getCreateRouteFun",
    "calculateRouteFun",
  ],

  setup(props) {
    const map = ref(null);
    var prevInitalPositionPointer = null;
    var prevFinalPositionPointer = null;
    var previousIntermediatePointer = [];
    var previousRoute = null;
    var selectedGeojson = [];

    var mymap;

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

    const setInitialPosMarker = (lat, lon) => {
      if (prevInitalPositionPointer != null) {
        mymap.removeLayer(prevInitalPositionPointer);
      }
      var markerOptions = {
        title: "Initial Position marker",
        clickable: true,
        draggable: true,
      };
      console.log("Add Marker");
      var marker = L.marker([lat, lon], markerOptions);

      prevInitalPositionPointer = marker;

      marker.on("moveend", function (e) {
        console.log("marker drag event");
        console.log(e.target._latlng);
        // console.log("new Lat lng:"+e.latlng)
        var obj = e.target._latlng;

        props.initialPosition.lat = obj.lat;
        props.initialPosition.lon = obj.lng;
        // if (routeFun.value != null) {
        //   routeFun.value();
        // }
        props.calculateRouteFun();
      });

      marker.addTo(mymap);
    };
    const setFinalPosMarker = (lat, lon) => {
      if (prevFinalPositionPointer != null) {
        mymap.removeLayer(prevFinalPositionPointer);
      }

      var markerOptions = {
        title: "Final Position Marker",
        clickable: true,
        draggable: true,
      };
      console.log("Add Marker");
      var marker = L.marker([lat, lon], markerOptions);
      prevFinalPositionPointer = marker;

      marker.on("moveend", function (e) {
        console.log("marker drag event");
        console.log(e.target._latlng);

        var obj = e.target._latlng;

        props.finalPosition.lat = obj.lat;
        props.finalPosition.lon = obj.lng;
        // if (routeFun.value != null) {
        //   routeFun.value();
        // }
        // console.log("new Lat lng:"+e.latlng)
        props.calculateRouteFun();

      });

      marker.addTo(mymap);
    };

    const SetIntermediatePosMarker = () => {
      if (previousIntermediatePointer.length != 0) {
        previousIntermediatePointer.forEach((item) => {
          console.log("clearing array");
          mymap.removeLayer(item);
        });
        previousIntermediatePointer = [];
      }
      props.intermediatePoints.forEach((e, index) => {
        console.log("-----------drawing------------");
        var markerOptions = {
          title: "sdsd",
          clickable: true,
          draggable: true,
        };
        let marker = L.marker([e.lat, e.lon], markerOptions);
        previousIntermediatePointer.push(marker);
        console.log("Adding Marker");
        marker.on("moveend", function (e) {
          console.log("marker drag event");
          console.log(e.target._latlng);
          // console.log("new Lat lng:"+e.latlng)
          var obj = e.target._latlng;
          props.intermediatePoints[index].lat = obj.lat;
          props.intermediatePoints[index].lon = obj.lng;
          // if (routeFun.value != null) {
          //   routeFun.value();
          // }
        props.calculateRouteFun();

        });
        marker.addTo(mymap);
      });
    };

    const CreateRoute = (p, pathNum = 0) => {
      let possiblePaths = p;
      console.log("Creating Routes");
      console.log(p);
      console.log("Creating Routes");
      if (previousRoute != null) {
        mymap.removeLayer(previousRoute);
      }
      console.log("Path here ");
      console.log(p);
      let r = possiblePaths[pathNum].geoJson;
      selectedGeojson = possiblePaths[pathNum].geoJson;
      console.log("SelectedGeoJson");
      console.log(selectedGeojson);
      var polyline = L.polyline(r, { color: "red" }).addTo(mymap);
      previousRoute = polyline;
      mymap.fitBounds(polyline.getBounds());
    };

    props.getCreateRouteFun(CreateRoute);
    props.getInitialPositionMarkerFun(setInitialPosMarker);
    props.getFinalPositionMarkerFun(setFinalPosMarker);
    props.getIntermediatePositionsMarkerFun(SetIntermediatePosMarker);
    //props.getRouteFun();

    return {
      map,
      setInitialPosMarker,
      setFinalPosMarker,
      SetIntermediatePosMarker,
      CreateRoute,
    };
  },
};
</script>

<style scoped>
#mapid {
  height: 100vh;
   width: 1200px;
}
</style>