<template>
  <div class="home">
    <h1>User->{{ $store.state.user }}</h1>
    <img
      class="w-auto h-auto"
      src="
 https://lh6.googleusercontent.com/OGeokB40im4CXJkcG5U40ow_7gZANKGONWfJOhv5eQFy5FeSgCF9NByIHW6DGSi9ZwdyMdZuNUgqkY-bKOvzz4E2_VDDrXGxrFR_hfuvEit5j5dAnq8dfET7YEMM2L2Yu7dU6Mss"
    />

    grgfegffjfuerhguregh
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
// @ is an alias to /src
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { successAlert } from "@/composables/Notifications.js";

export default {
  name: "Home",
  components: {},
  setup() {
    // const {successAlert}= NotificationFunctions();

    onMounted(async () => {
//      successAlert("Here is The Mfsage");
      // successAlert("dsd");
      // success("dfd");

      //  Swal.fire({
      //   title: 'Error!',
      //   text: 'Do you want to continue',
      //   icon: 'error',
      //   // confirmButtonText: 'Cool'
      // })

      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Something went wrong!',
      //   footer: '<a href="">Why do I have this issue?</a>'
      // })
    });
  },
};
</script>
