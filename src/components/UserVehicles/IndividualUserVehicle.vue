<template>

  <div class="shadow-md p-8 w-full hover:bg-gray-200 secondaryText">
    <div class="flex flex-row-reverse ">
      <div>
        <svg
        v-on:click="editUserVehicle=!editUserVehicle"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-gear"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
          />
          <path
            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
          />
        </svg>
      </div>
    </div>

    <div class="md:flex md:flex-row sm:flex sm:flex-col items-center">
      <div class="flex justify-center">
        <img
          v-if="UserVehicle.photoPath==null"
          class="w-16 h-16"
          src="
             https://lh3.googleusercontent.com/-p7hS9no8Wf0/YFXe1wSFSAI/AAAAAAAAGAA/B9SK041AOU8Iyth6QdmLMsFrJnvKzqfNgCLcBGAsYHQ/image.png
              "
        />
        <img
          v-else
          class="w-16 h-16"
          :src="UserVehicle.vehiclePhotoUrl"
        />
      </div>
      <div class="md:pl-4 text-base">
        <div class="flex flex-row">
          <div class="mr-2">Company Name:</div>

          <div>
            {{ UserVehicle.companyName }}
          </div>
        </div>

        <div class="flex flex-row">
          <div class="mr-2">Model Name:</div>

          <div>
            {{ UserVehicle.modelName }}
          </div>
        </div>

        <div class="flex flex-row">
          <div class="mr-2">License Plate Number:</div>

          <div>
            {{ UserVehicle.licensePlateNumber }}
          </div>
        </div>

        <div class="flex flex-row">
          <div class="mr-2">Date of Registration:</div>

          <div>
            {{ UserVehicle.dateOfRegistration }}
          </div>
        </div>

        <div class="flex flex-row">
          <div class="mr-2">Color:</div>

          <div>
            {{ UserVehicle.color }}
          </div>
        </div>

        <div class="flex flex-row">
          <div class="mr-2">Vehicle Type:</div>

          <div>
            {{ UserVehicle.vehicleType.name }}
          </div>
        </div>

        <!-- {{ item }} -->
      </div>
    </div>
  </div>

  <div class="pt-2" v-if="editUserVehicle">

<EditIndividualUserVehicle @ReloadUserVehicle="ReloadUserVehicleFun"  :vehicleTypes="vehicleTypes" :userVehicle="UserVehicle" />
  </div>
</template>

<script>
import { ref } from 'vue';
import EditIndividualUserVehicle from "@/components/UserVehicles/EditIndividualUserVehicle"
import VehicleFunctions from "@/composables/VehicleFunctions";

export default {
  props: ["UserVehicle","vehicleTypes"],
  components:{
      EditIndividualUserVehicle
  },
setup(props){



const editUserVehicle=ref(false);

const {GetUserVehicleById}=VehicleFunctions();

const ReloadUserVehicleFun=async()=>{

let res= await GetUserVehicleById(props.UserVehicle.id);

props.UserVehicle=res;
console.log(res);
props.UserVehicle.vehiclePhotoUrl=res.vehiclePhotoUrl;
props.UserVehicle.photoPath=res.photoPath;
props.UserVehicle.companyName=res.companyName;
props.UserVehicle.modelName=res.modelName;
props.UserVehicle.licensePlateNumber=res.licensePlateNumber;
props.UserVehicle.dateOfRegistration=res.dateOfRegistration;
props.UserVehicle.color=res.color;
props.UserVehicle.vehicleType.name=res.vehicleType.name;


console.log("Props Updated")

console.log(props.UserVehicle);

}


const a= ref("defer");
return {editUserVehicle,a,ReloadUserVehicleFun};
}
  
};
</script>

<style>
</style>