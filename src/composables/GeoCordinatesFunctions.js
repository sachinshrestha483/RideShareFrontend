import axios from "axios";
import HttpResponseObject from "@/utility/objects/HttpResponseObject";

const GeoCordinatesFunction = () => {

  // longitude,latitude
  const reverseGeoCode = async (lat, lon) => {
    const httpResponseObject = new HttpResponseObject();
    const uninterceptedAxiosInstance = axios.create();
    await uninterceptedAxiosInstance
      .get(
        "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=" + lon + "," + lat + "&token=AAPKb10821df102a46a4b930958d7a6a06593sdla7i0cMWoosp7XXlYflDTAxsZMUq-oKvVOaom9B8CokPvJFd-sE88vOQ2B_rC&f=json"
      )
      .then(function (response) {
        // handle success
        let res = response;
        httpResponseObject.responseObject = response.data;
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
        httpResponseObject.haveError = true;
      });
    return httpResponseObject;
  }
  return { reverseGeoCode };
};

export default GeoCordinatesFunction;
