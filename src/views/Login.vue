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
          <button class="primaryButton" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Login from "@/composables/Login";
import { ref } from "vue";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const formError = ref(null);
    const router= new useRouter();
    
    const login = Login;

    const submitForm = async () => {
    const res = await login(email.value, password.value);

if(!res.haveError){
// push to home page
   router.push({name:"Home"});

}
else{
//
formError.value=res.errorMessage;

}

    };

    return {
      email,
      password,
      submitForm,
      formError,
    };
  },
};
</script>

<style>
</style>