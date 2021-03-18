<template>
  <div class="pageMargin2 my-8">
    <div class="text-center primaryHeading my-2">
      We Have Sent You The Mail Enter The OTP
    </div>
    <div class="text-center text-red-600">{{ error }}</div>

    <input class="inputBox" v-model="code" placeholder="Enter The OTP" />

    <div class="text-center">
      <button class="primaryButton" v-on:click="verifyEmail">Verify</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Identity from "@/composables/Identity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const { VerifyEmailCode } = Identity();
    const error = ref("");

    const code = ref("");

    const verifyEmail = async () => {
      error.value = "";
      let res = await VerifyEmailCode(code.value);
      if (res) {
        
        router.push({ name: "MemberVerification" });
      } else {
        error.value = "Wrong Verification Code";
      }

      console.log("Verify Email");
      console.log(res);
    };

    return { code, verifyEmail, error };
  },
};
</script>

<style>
</style>