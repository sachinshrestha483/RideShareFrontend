<template>
  <div class="pageMargin2 my-8">
    <div class="text-center primaryHeading my-2">
      We Have Sent You The SMS Enter The OTP
    </div>
    <div class="text-center text-red-600">{{ error }}</div>
    <input class="inputBox" v-model="code" placeholder="Enter The OTP" />

    <div class="text-center">
      <button class="primaryButton" v-on:click="verifyPhone">Verify</button>
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
    const code = ref("");
    const error = ref("");
    const { VerifySMSCode } = Identity();

    const verifyPhone = async () => {
      error.value = "";

      let res = await VerifySMSCode(code.value);
      if (res) {
        router.push({ name: "MemberVerification" });
      } else {
        error.value = "Wrong Verification Code ";
      }

      console.log(res);
    };

    return { code, verifyPhone, error };
  },
};
</script>

<style>
</style>