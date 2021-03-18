<template>
  <p class="primaryHeading pageMargin1 text-center my-2">Member Verification</p>

  <div class="flex flex-col text-center pageMargin2">
    <button
      v-on:click="sentVerificationMail"
      :class="
        $store.state.user.isEmailVerified == true
          ? 'w-full secondaryText text-2xl  focus:outline-none text-white mb-2 md:text-left font-normal bg-blue-400 rounded-full py-3 px-6' +
            disabled
          : 'w-full secondaryText text-2xl hover:bg-blue-500 focus:outline-none text-white mb-2 md:text-left font-normal bg-blue-400 rounded-full py-3 px-6'
      "
    >
      <div class="text-center">
        {{
          $store.state.user.isEmailVerified == true
            ? "Email Verified"
            : "Verify Your Email"
        }}
      </div>
    </button>

    <button
      v-on:click="sentVerificationSms"
      :class="
        $store.state.user.isPhoneNumberVerified == true
          ? 'w-full secondaryText text-2xl     focus:outline-none text-white mb-2 md:text-left font-normal bg-blue-400 rounded-full py-3 px-6' +
            disabled
          : 'w-full secondaryText text-2xl   hover:bg-blue-500  focus:outline-none text-white mb-2 md:text-left font-normal bg-blue-400 rounded-full py-3 px-6'
      "
    >
      <div class="text-center">
        {{
          $store.state.user.isPhoneNumberVerified == true
            ? "Phone Number Verified"
            : "Verify Phone Number"
        }}
      </div>
    </button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Identity from "@/composables/Identity";
import { ref } from 'vue';
export default {
  setup() {
    const router = useRouter();
    const { SendVerificationMail, SendVerificationSMS } = Identity();
    const error = ref("");
    var sentVerificationMail = async () => {
      let res = await SendVerificationMail();

      console.log(res);
      if (res == true) {
        router.push({ name: "VerifyEmail" });
      } else {
        error.value = "Error in Sending Mail";
      }
    };

    var sentVerificationSms = async () => {
      let res = await SendVerificationSMS();
      console.log(res);

      if (res == true) {
        router.push({ name: "VerifyPhone" });
      } else {
        error.value = "Error in Sending SMS";
      }
    };

    return { sentVerificationMail, sentVerificationSms, error };
  },
};
</script>

<style>
</style>