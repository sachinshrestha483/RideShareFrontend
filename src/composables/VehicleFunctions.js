import Urls from "@/utility/IdentitySection/Urls";
import axios from "axios";
import Store from "../store/index";
import HttpResponseObject from "@/utility/objects/HttpResponseObject";

const VehicleFunctions = () => {

  const AddVehicle = async (obj) => {
    const formData = new FormData();
    const httpResponseObject = new HttpResponseObject();

    if (obj.file != null) {
      formData.append("VehiclePhoto", obj.file, obj.file.name);

    }

    formData.append("CompanyName", obj.vehicleCompanyName);
    formData.append("ModelName", obj.vehicleModelName);
    formData.append("LicensePlateNumber", obj.vehicleLicensePlateNumber);
    formData.append("DateOfRegistration", obj.vehicleDateOfRegisteration);
    formData.append("Color", obj.vehicleColor);
    formData.append("VehicleTypeId", obj.selectedVehicleTypeId);

    await axios
      .post(Urls.AddVehicle, formData)
      .then(function (response) {
        httpResponseObject.haveError= false;

        console.log(response);
      })
      .catch(function (error) {
        httpResponseObject.haveError= true;
        console.log(error);
      });
      return httpResponseObject
  };


  const UpdateVehicle = async (obj) => {

    const formData = new FormData();

    const httpResponseObject = new HttpResponseObject();



    formData.append("Id", obj.id);

    if (obj.file != null) {
      formData.append("VehiclePhoto", obj.file, obj.file.name);

    }

    formData.append("CompanyName", obj.vehicleCompanyName);
    formData.append("ModelName", obj.vehicleModelName);
    formData.append("LicensePlateNumber", obj.vehicleLicensePlateNumber);
    formData.append("DateOfRegistration", obj.vehicleDateOfRegisteration);
    formData.append("Color", obj.vehicleColor);
    formData.append("VehicleTypeId", obj.selectedVehicleTypeId);

    await axios
      .post(Urls.UpdateVehicle, formData)
      .then(function (response) {
        httpResponseObject.haveError= false;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        httpResponseObject.haveError= true;
      });

      return httpResponseObject;
  };


  const GetUserVehicles = async () => {

    let res = null;
    // Optionally the request above could also be done as
    await axios.get(Urls.UserVehicles)
      .then(function (response) {
        res = response.data;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    return res;

  }



  const GetUserVehicleById = async (id) => {

    let res = null;
    await axios.get(Urls.UserVehicleById + id)
      .then(function (response) {
        // handle success
        console.log(response);
        res = response.data;
        console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    return res;
  }

const getVehicleById=async ()=>{
  let res = null;
  await axios.get(Urls.UserVehicleById + id)
    .then(function (response) {
      // handle success
      console.log(response);
      res = response.data;
      console.log(res);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  return res;


}







  return { AddVehicle, UpdateVehicle, GetUserVehicles, GetUserVehicleById };
};

export default VehicleFunctions;
