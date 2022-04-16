<template>
  <div class="w-full flex flex-row-reverse">
    <button
    v-on:click="getCurrentLocation"
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
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-geo-fill"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
        />
      </svg>
    </button>
  </div>
  <div id="mapid" ref="map" class="z-10"></div>
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
    "setInitialPosLatlon",
    "setFinalPosLatlon",
    "setIntermediatePositionsLatlon"
  ],

  setup(props) {
    const map = ref(null);
    var prevInitalPositionPointer = null;
    var prevFinalPositionPointer = null;
    var previousIntermediatePointer = [];
    var previousRoute = null;
    var selectedGeojson = [];
    var currentLocationPointer = null;

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


const getCurrentLocation=()=>{
  try{
if (navigator.geolocation) {
  console.log("Getting The Current Location")
  console.log("Getting The Current Location")
  console.log("Getting The Current Location")
  console.log("Getting The Current Location")
  console.log("Getting The Current Location")

    navigator.geolocation.getCurrentPosition(drawAndZoomOnCurrentLocation);


  console.log("Getting The Current Location")
  console.log("Getting The Current Location")
  console.log("Getting The Current Location")
  console.log("Getting The Current Location")
  console.log("Getting The Current Location")

  }
  }
  catch(e)
  {

  }
  
}

const drawAndZoomOnCurrentLocation= (position)=>{
    if (currentLocationPointer != null) {
        mymap.removeLayer(currentLocationPointer);
      }

      var markerOptions = {
        title: "Initial Position marker",
        icon: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      };
      console.log(position)
             currentLocationPointer = L.marker([position.coords.latitude, position.coords.longitude], markerOptions);
      currentLocationPointer.addTo(mymap);


}




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
        props.setInitialPosLatlon(obj.lat.toString(),obj.lng.toString());
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
        
        props.setFinalPosLatlon(obj.lat.toString(),obj.lng.toString());

        
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


        //  var dd=   {id:index , lat:obj.lat,lon:obj.lng}

         props.setIntermediatePositionsLatlon( {index:index , lat:obj.lat.toString(),lon:obj.lng.toString()})







          
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
      getCurrentLocation
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