<template>
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
    "getDrawRouteFun",
    "getFreeMarkerFun",
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
      // https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png
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

    const setFreeMarker = () => {
      var markerOptions = {
        title: "Free Position Marker",
        clickable: true,
        draggable: true,
      };
      var marker = L.marker([23.3315, 75.0367], markerOptions);
      marker.on("moveend", function (e) {
        console.log("marker drag event");
        console.log(e.target._latlng);
        var obj = e.target._latlng;
        console.log("Object Lat :" + obj.lat);
        console.log("Object Lon :" + obj.lng);
      });
      marker.addTo(mymap);
    };

    try {
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");

      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");

      console.log(setFreeMarker);

      props.getFreeMarkerFun(setFreeMarker);

      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
      console.log("Setting Free Marker Fun");
    } catch (e) {}

    const setFinalPosMarker = (lat, lon) => {
      if (prevFinalPositionPointer != null) {
        mymap.removeLayer(prevFinalPositionPointer);
      }

      var markerOptions = {
        title: "Final Position Marker",
        clickable: true,
        draggable: true,
        icon: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnschor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
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
        // https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png
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

    const DrawRoute = (path) => {
      if (previousRoute != null) {
        mymap.removeLayer(previousRoute);
      }
      console.log("Path here ");
      console.log(path);
      let r = path;
      var polyline = L.polyline(r, { color: "red" }).addTo(mymap);
      previousRoute = polyline;
      mymap.fitBounds(polyline.getBounds());
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

      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log(r);
      console.log(r);
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");
      console.log("This is Draw Route ");

      selectedGeojson = possiblePaths[pathNum].geoJson;
      console.log("SelectedGeoJson");
      console.log(selectedGeojson);
      var polyline = L.polyline(r, { color: "red" }).addTo(mymap);
      previousRoute = polyline;
      mymap.fitBounds(polyline.getBounds());
    };
    try {
      props.getCreateRouteFun(CreateRoute);
      props.getInitialPositionMarkerFun(setInitialPosMarker);
      props.getFinalPositionMarkerFun(setFinalPosMarker);
      props.getIntermediatePositionsMarkerFun(SetIntermediatePosMarker);
      props.getDrawRouteFun(DrawRoute);
    } catch (e) {
      console.log("dd");
    }

    //setFreeMarker();

    //props.getRouteFun();

    return {
      map,
      setInitialPosMarker,
      setFinalPosMarker,
      SetIntermediatePosMarker,
      CreateRoute,
      DrawRoute,
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