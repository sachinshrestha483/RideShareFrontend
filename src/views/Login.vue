<template>
  <div class="pageMargin2">
    <p class="md:text-4xl text-center text-gray-700 text-3xl font-bold">
      Login
    </p>

    <p class="text-center text-red-500 mt-8 font-medium">{{ formError }}</p>

    <div class="md:mt-8">
      <form @submit.prevent="submitForm">
        <input
          type="email"
          required
          v-model="email"
          placeholder="Email"
          class="inputBox"
        />
        <input
          required
          type="password"
          v-model="password"
          placeholder="Password"
          class="inputBox"
        />

        <div class="text-center">
          <button class="primaryButton" v-if="!isSubmittingForm"  type="submit">Login</button>
          <button class="primaryButton"  disabled  v-else  type="submit">Loging In</button>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Login from "@/composables/Login";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const formError = ref(null);
    const router = new useRouter();
    const isSubmittingForm= ref(false);

    const login = Login;

    const submitForm = async () => {
      isSubmittingForm.value=true;
      const res = await login(email.value, password.value);
      isSubmittingForm.value=false;

      if (!res.haveError) {
        // push to home page
        router.push({ name: "Home" });
      } else {
        //
        formError.value = res.errorMessage;
      }
    };

    return {
      email,
      password,
      submitForm,
      formError,
      isSubmittingForm
    };
  },
};
</script>

<style>
</style>