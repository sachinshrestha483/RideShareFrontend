<template>
  <!-- //Modal -->
{{filteredCarsharePrefrecne}}

  <div v-if="showModal">
    <div
      class="w-screen mb-4 overflow-auto p-12 container ml-8 mr-8 text-center rounded fixed bg-gray-100"
    >
      <div class="flex flex-row-reverse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          v-on:click="hideModal"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <div class="text-center primaryHeading">Select Car Share Prefrence</div>

      <!-- {{ subCarSharePrefrences }} -->
      <div class="flex flex-col secondaryText">
        <div
          class="flex flex-row items-center my-4"
          v-for="item in subCarSharePrefrences"
          :key="item"
        >
          <input
            type="radio"
            v-model="selectedSubCarSharePrefrenceId"
            :id="item.id"
            name="SubCarSharePrefrences"
            :value="item.id"
          />
          <label for="male" class="ml-4">{{ item.name }}</label>
        </div>

        <button
          v-on:click="AddTheSubCarSharePrefrence"
          class="primaryButton py-2 text-lg px-4"
        >
          Save
        </button>
      </div>
    </div>
  </div>

  <div class="pageMargin2">
    <p class="primaryHeading text-center mb-8">Car Share Prefrence</p>

    <div class="flex flex-col" v-if="carSharePrefrences != null">
      <div
        class="p-4 text-start font-medium my-2 text-gray-600 hover:bg-gray-200 text-lg"
        v-for="item in carSharePrefrences"
        :key="item"
        v-on:click="showModalFun(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
import { computed, ref } from "vue";
export default {
  setup() {
    const {
      getCarSharePrefrence,
      getSubCarSharePrefrenceById,
      AddUserCareSharePrefrence,
      GetSubTravelPrefrenceofUserofTravelPrefrence,
    } = CarSharePrefrenceFunctions();
    const carSharePrefrences = ref(null);
    const showModal = ref(false);
    const subCarSharePrefrences = ref(null);
    const selectedSubCarSharePrefrenceId = ref(null);

    const load = async () => {
      carSharePrefrences.value = await getCarSharePrefrence();
    };

    const filteredCarsharePrefrecne=computed({
get(){
if(carSharePrefrences.value!=null){
  return carSharePrefrences.value.filter(n=>n.show==true)
}
},
set(){

}
    })



    const loadSubCarSharePrefrences = async (id) => {
      subCarSharePrefrences.value = await getSubCarSharePrefrenceById(id);
      //  selectedSubCarSharePrefrenceId=
      let v = await GetSubTravelPrefrenceofUserofTravelPrefrence(id);
      if (v != null) {
        console.log("--------------------------User Data Heere");
        console.log(v);
        selectedSubCarSharePrefrenceId.value = v;
        console.log("v", v);
      }
    };

    const showModalFun = async (id) => {
      showModal.value = !showModal.value;

      await loadSubCarSharePrefrences(id);
    };

    const hideModal = async () => {
      showModal.value = !showModal.value;
      subCarSharePrefrences.value = [];
      selectedSubCarSharePrefrenceId.value = "";
    };

    const AddTheSubCarSharePrefrence = async () => {
      await AddUserCareSharePrefrence(selectedSubCarSharePrefrenceId.value);
    };

    load();

    return {
      carSharePrefrences,
      showModal,
      subCarSharePrefrences,
      loadSubCarSharePrefrences,
      showModalFun,
      selectedSubCarSharePrefrenceId,
      hideModal,
      AddTheSubCarSharePrefrence,
      filteredCarsharePrefrecne
    };
  },
};
</script>

<style>
</style>