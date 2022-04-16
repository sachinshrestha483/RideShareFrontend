<template>
  <div class="pageMargin1">
    <div class="flex flex-col lg:flex-row lg:items-center">
      <div class="text-center flex flex-row justify-center">
        <img
          class="lg:h-44 lg:w-52"
          src="https://cdn.blablacar.com/kairos/assets/build/images/en_IN-3d28c7a3341d3e4ae25549bad0753714.png"
        />
      </div>

      <div
        class="primaryHeading lg:ml-8 flex flex-row justify-center text-center"
      >
        <div class="flex flex-col">
          <div>
            Don't wear sunglasses, look straight ahead and make sure you're
            alone.
          </div>
          <div class="text-red-600 text-bold">{{ fileError }}</div>
          <div class="text-blue-500 text-lg  text-bold">{{ uploadingStatus }}</div>


          <div class="primaryButton mt-4 text-xl font-normal px-4 py-0">
            <div class="text-center flex flex-col">
              <div>Add Photo</div>
              <div>
                <input
                  type="file"
                  multiple
                  v-on:change="handleChange"
                  class="opacity-0 h-full w-full py-0 my-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Identity from "@/composables/Identity";
import { useRouter } from "vue-router";
import { successAlert, errorAlert } from "@/composables/Notifications.js";

export default {
  setup() {
    const { UpdateProfilePicture } = Identity();

    const router = useRouter();

    const file = ref(null);
    const fileError = ref(null);
    const uploadingStatus= ref(null);

    const isuploading = ref(false);

    const handleChange = (e) => {
      fileError.value = "";

      const selected = e.target.files[0];
      console.log(selected);
      const types = ["image/png", "image/jpeg"];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        handleSubmit();
      } else {
        file.value = null;
        fileError.value = "Please Select an Image File (png/jpg)";
      }
    };

    const handleSubmit = async () => {
      if (file.value) {
        isuploading.value = true;
        uploadingStatus.value= "Uploading Photo";
        let isUploaded = await UpdateProfilePicture(file.value);
        uploadingStatus.value=null;
        // await uploadImage(file.value);
        isuploading.value = false;
        console.log(isUploaded);
        if (isUploaded == false) {
          fileError.value = "Not Able To Upload Image";
          errorAlert("Failed in Uploading Photo");
        } else {

    //  store.state.user.=response.data;
          successAlert("Photo Uploaded Sucessfully ")
          router.go();
          //router.push({ name: "Home" });
        }
        file.value = null;
      }
    };

    return { handleChange, fileError, isuploading,uploadingStatus };
  },
};
</script>

<style>
</style>