<template>
  <div class="pageMargin2">
    <p class="md:text-4xl text-center text-gray-700 text-3xl font-bold">
      Register
    </p>

    <p class="text-center text-red-500 mt-8 font-medium">{{ formError }}</p>

    <div class="md:mt-8">
      <form @submit.prevent="submitForm">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="inputBox"
        />
        <input
          type="text"
          v-model="firstName"
          required
          placeholder="First Name"
          class="inputBox"
        />

        <input
          type="text"
          v-model="lastName"
          required
          placeholder="Last Name"
          class="inputBox"
        />

        <input
          type="tel"
          v-model="phone"
          required
          placeholder="Phone"
          class="inputBox"
        />

        <input
          type="password"
          v-model="password"
          required
          placeholder="Password"
          class="inputBox"
        />

        <input
          type="password"
          v-model="conformPassword"
          required
          placeholder="Confirm Password"
          class="inputBox"
        />

        <div class="text-center">
          <button class="primaryButton" v-if="!regestering" type="submit">
            Register
          </button>
          <button class="primaryDisabledButton" v-else disabled type="submit">
            Registering
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Register from "@/composables/Register";
import { useRouter } from "vue-router";

export default {
  setup() {

    const router= new useRouter();
    const { register } = Register;
    const email = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const password = ref("");
    const conformPassword = ref("");
    const phone = ref("");
    const formError = ref("");
    const regestering = ref(false);

    phone.value = phone.value.trim();
    firstName.value = firstName.value.trim();
    lastName.value = lastName.value.trim();

    const submitForm = async () => {
      formError.value = "";

      if (password.value.trim() == "") {
        formError.value = "Password Cannot Be Empty";
        return;
      }

      if (password.value != conformPassword.value) {
        formError.value = "Password and Conform Password are Not Same";
        return;
      }
      regestering.value = true;
      const res = await register(
        firstName.value,
        lastName.value,
        email.value,
        phone.value,
        password.value
      );
      regestering.value = false;
      console.log("res");
      console.log(res);

      if (res.haveError == false) {
        console.log("User added Sucessfully ");
              router.push({name:"Login"});
      } else {
        if(res.errorMessage!=null){
        formError.value = res.errorMessage;

        }
        else{
        formError.value ="Error in Registering User";

        }

        console.log("User Not  added ");
      }
      console.log("submit form");
    };

    return {
      email,
      firstName,
      lastName,
      password,
      conformPassword,
      formError,
      submitForm,
      regestering,
      phone,
    };
  },
};
</script>

<style>
</style>