<template>
  <!-- {{ rideId }} -->

  <!-- <div id="mapid" ref="map"></div> -->

  <div v-if="ride != null">
    <!-- 
    {{ride.responseObject}}

{{ride.responseObject.dateTimeOfRide}} -->

    <div class="flex flex-row justify-center w-full">
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
     ? ' h-12 &nbsp; '
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
            class="
              mt-2
              text-center
              flex
              justify-center
              items-center
              gap-x-2
              items-center
            "
          >
            <div class="flex flex-row items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  title="Distance From Expected Initial Point"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pin-map-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                  />
                </svg>
              </div>
              <div>{{   GetDistanceinKmfromMeter(distanceFromInitialPosition) }} km</div>
            </div>
            <div class="flex flex-row items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  title="Distance From Expected Initial Point"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pin-map-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                  />
                </svg>
              </div>
              <div>{{ GetDistanceinKmfromMeter(distanceFromFinalPosition) }} km</div>
            </div>
          </div>

          <div
            class="mt-2 text-center flex justify-center items-center"
            v-if="ride.responseObject.vehicle != null"
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

            {{ ride.responseObject.vehicle.companyName }}

            {{ ride.responseObject.vehicle.modelName }} ({{
              ride.responseObject.vehicle.licensePlateNumber
            }}) ({{ ride.responseObject.vehicle.color }})
          </div>

          <div class="mt-4">
            <div id="mapid" ref="map"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onActivated } from "vue";
import { Ride } from "@/Models/Ride";
import VehicleFunctions from "@/composables/VehicleFunctions";
import { useRoute, useRouter } from "vue-router";
import { getMyRide } from "@/composables/RideFunctions.js";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
export default {
  props: [
    "rideId",
    "ShowOverlappingPath",
    "overLappingPath",
    "searchedinitialPosition",
    "searchedFinalPosition",
    "distanceFromInitialPosition",
    "distanceFromFinalPosition",
  ],
  setup(props) {
    const map = ref(null);

    const ride = ref(null);
    const loadData = async () => {
      let rideObj = await getMyRide(props.rideId);
      console.log("Here is the Ride Object");
      console.log(rideObj);
      ride.value = rideObj;
    };

    var mymap;

    const DrawMarkers = () => {
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
        [
          ride.value.responseObject.startLocationLatitude,
          ride.value.responseObject.startLocationLongitude,
        ],
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
        [
          ride.value.responseObject.endLocationLatitude,
          ride.value.responseObject.endLocationLongitude,
        ],
        finalmarkerOptions
      );
      finalPositionmarker.addTo(mymap);

      ride.value.responseObject.intermediatePositions.forEach((element) => {
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

      var searchedInitialMarkerPositionOptions = {
        title: "Searched intial Position Marker",
      };

      var searchedInitialPositionmarker = L.marker(
        [props.searchedinitialPosition.lat, props.searchedinitialPosition.lon],
        searchedInitialMarkerPositionOptions
      );

      searchedInitialPositionmarker.addTo(mymap);

      var searchedFinalMarkerPositionOptions = {
        title: "Searched Final Position Marker",
      };
      var searchedfinalPositionmarker = L.marker(
        [props.searchedFinalPosition.lat, props.searchedFinalPosition.lon],
        searchedFinalMarkerPositionOptions
      );

      searchedfinalPositionmarker.addTo(mymap);
    };

    const DrawRoute = (path, mymap) => {
      let r = path;
      var polyline = L.polyline(r, { color: "red" }).addTo(mymap);
      mymap.fitBounds(polyline.getBounds());
    };

    const DrawOverlappingRoute = (path, mymap) => {
      let r = path;
      if (r.length > 0) {
        var polyline = L.polyline(r, { color: "blue" }).addTo(mymap);
        mymap.fitBounds(polyline.getBounds());
      }
    };

    onMounted(async () => {
      await loadData();
      console.log(map);
      console.log("Making The map");
      mymap = L.map(map.value).setView([23.3315, 75.0367], 5);
      const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileLayer = L.tileLayer(tileUrl, { attribution });
      tileLayer.addTo(mymap);

      DrawRoute(JSON.parse(ride.value.responseObject.path), mymap);

      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");

      console.log(props.overLappingPath);
      console.log(props.overLappingPath);
      console.log(props.overLappingPath);
      console.log(props.overLappingPath);
      DrawOverlappingRoute(props.overLappingPath, mymap);
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      console.log("Overlapping Path");
      DrawMarkers();
    });

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
    const { GetDistanceinKmfromMeter } = UtilityFunctions();

    return { ride, days, months, map, GetDistanceinKmfromMeter };
  },
};
</script>

<style scoped>
#mapid {
  height: 40vh;
  width: 100%;
}
</style>