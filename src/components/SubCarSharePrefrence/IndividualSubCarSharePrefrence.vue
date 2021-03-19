<template>
  <div class="shadow-md p-8 overflow-x-auto hover:bg-gray-200 secondaryText">
    <div class="flex flex-row items-center justify-between">
      <div>{{ subCarSharePrefrenceObject.name }}</div>
      <div class="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          v-on:click="editSubCarSharePrefrence = !editSubCarSharePrefrence"
          fill="currentColor"
          class="bi bi-pencil"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
          />
        </svg>
      </div>
    </div>
  </div>

  <div v-if="editSubCarSharePrefrence" class="p-4 shadow-md">
   <form  @submit.prevent="updateSubCarSharePrefrence">
    <div class="flex flex-col">
      <input
        required
        class="inputBox"
        v-model="subCarSharePrefrenceObject.name"
      />

      <select
        required
        v-model="subCarSharePrefrenceObject.travelPrefrenceId"
        name="cars"
        class="focus:outline-none my-4 text-gray-500 rounded-lg p-2 border-2 border-gray-200 bg-gray-200 w-full h-12 focus:border-blue-500 font-medium text-gray-500;"
        id="cars"
      >
        <option
          v-for="item in carSharePrefrencesList"
          :key="item"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>

<div class="flex flex-row items-center">
<input type="checkbox"   class="mb-2" v-model="subCarSharePrefrenceObject.show" >
<label class="ml-2  py-0 secondaryText text-lg">Show/Hide</label>
</div>


      <button class="primaryButton">Update</button>
    </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
export default {
  props: ["subCarSharePrefrenceObject", "carSharePrefrencesList"],

  setup(props) {
    const { UpdateSubCarSharePrefrences,getIndiSubCarSharePrefrenceById } = CarSharePrefrenceFunctions();

    //const carSharePrefrence = props.carSharePrefrenceObject;
   
    const editSubCarSharePrefrence = ref(false);

    const updateSubCarSharePrefrence = async () => {
      let updatedObject = await UpdateSubCarSharePrefrences(
        props.subCarSharePrefrenceObject.id,
        props.subCarSharePrefrenceObject.name,
        props.subCarSharePrefrenceObject.travelPrefrenceId,
        true
      );




        props.subCarSharePrefrenceObject = getIndiSubCarSharePrefrenceById(props.subCarSharePrefrenceObject.id);
      
    };

    return { editSubCarSharePrefrence ,updateSubCarSharePrefrence};
  },
};
</script>

<style>
</style>