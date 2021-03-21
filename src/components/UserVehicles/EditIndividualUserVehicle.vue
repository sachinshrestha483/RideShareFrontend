<template>
<!-- {{userVehicle}} -->
<form @submit.prevent="updateVehicle" >

  <div class="shadow-md p-8 w-full text-lg">
<label class="secondaryText text-lg ">Company Name</label>
<input   v-model="userVehicle.companyName"  class="inputBox" />

<label class="secondaryText text-lg ">Model Name</label>
<input class="inputBox"  v-model="userVehicle.modelName" />

<label class="secondaryText text-lg ">License Plate Number</label>
<input class="inputBox"  v-model="userVehicle.licensePlateNumber" />

<label class="secondaryText text-lg ">Date Of Registration</label>
<input class="inputBox" type="date"  v-model="userVehicle.dateOfRegistration" />



<label class="secondaryText text-lg ">Color</label>
<input class="inputBox"  v-model="userVehicle.color" />

<label class="secondaryText text-lg ">Vehicle Type</label>


          <select
            v-model="userVehicle.vehicleTypeId"
            name="cars"
            required
            class="focus:outline-none my-4 text-gray-500 rounded-lg p-2 border-2 border-gray-200 bg-gray-200 w-full h-12 focus:border-blue-500 font-medium text-gray-500;"
            id="cars"
          >
            <option value="">Select The Vehicle Type</option>
            <option v-for="item in vehicleTypes" :key="item" :value="item.id">
              {{ item.name }}
            </option>
          </select>


<label class="secondaryText text-lg ">Update Photo</label>
<input class="inputBox p-1" v-on:change="handleFileChange"  type="file" multiple    />

<div class="text-center">
<button class="primaryButton " type="submit" >Update Vehicle</button>

</div>



  </div>
</form>
</template>

<script>
import { ref } from 'vue';
import VehicleFunctions from "@/composables/VehicleFunctions"
export default {
props:['userVehicle','vehicleTypes'],

setup(props,context){

const {UpdateVehicle}=VehicleFunctions();

    const selectedVehicleTypeId = ref(0);
const file = ref(null);
    const fileError = ref(null);
    const handleFileChange = (e) => {
      fileError.value = "";
      const selected = e.target.files[0];
      console.log(selected);
      const types = ["image/png", "image/jpeg"];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
      } else {
        file.value = null;
        fileError.value = "Please Selet an Image File (png/jpg)";
      }
    };

    const updateVehicle=async ()=>{
 const obj = {
   id:props.userVehicle.id,
        vehicleCompanyName: props.userVehicle.companyName,
        vehicleModelName: props.userVehicle.modelName,
        vehicleLicensePlateNumber: props.userVehicle.licensePlateNumber,
        vehicleDateOfRegisteration: props.userVehicle.dateOfRegistration,
        vehicleColor: props.userVehicle.color,
        file: file.value,
        selectedVehicleTypeId: props.userVehicle.vehicleTypeId,
      };
console.log(obj);

await UpdateVehicle(obj);
context.emit('ReloadUserVehicle');
    }

return {selectedVehicleTypeId,updateVehicle,handleFileChange}
}


}
</script>

<style>

</style>