import Urls from "@/utility/IdentitySection/Urls";
import axios from "axios";
import Store from "../store/index";

const VehicleTypeFunctions = () => {
  const AddVehicleType = async (name) => {
    const vehicleTypeObj = {
      name: name,
      show: true,
    };

    await axios
      .post(Urls.AddVehicleType, vehicleTypeObj)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const UpdateVehicleType = async (id, name, show) => {
    const updateVehicleTypeObject = {
      id: id,
      name: name,
      show: show,
    };

    await axios
      .post(Urls.UpdateVehicleType, updateVehicleTypeObject)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const GetVehicleTypes = async () => {
      let res=[];
    await axios
      .get(Urls.GetVehicleTypes)
      .then(function(response) {
        // handle success
        console.log(response);
        res=response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });

      return res;
  };

  const GetVehicleTypeById = async (id) => {
    let res=null;
    await axios
      .get(Urls.VehicleTypeById+id)
      .then(function(response) {
        // handle success
        console.log(response);
        res=response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });

      return res;
  };

  return { AddVehicleType, UpdateVehicleType, GetVehicleTypes, GetVehicleTypeById };
};

export default VehicleTypeFunctions;
