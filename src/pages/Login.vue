<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

// keep up with form data
const form = ref({
  email: "",
  password: "",
});

// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async (provider) => {
  try {
    provider
      ? await loginWithSocialProvider(provider)
      : await login(form.value);
    router.push({ name: "AllTargets" });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<template>
  <h1>Login <small>(for existing users)</small></h1>
  <div class="left"></div>
  <form class="right" @submit.prevent="handleLogin()">
    <div style="width: 75%">
      <div class="form-group">
        <label for="emailInput">Email address</label>
        <input v-model="form.email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"
          placeholder="Enter email">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>
      <br>
      <div class="form-group">
        <div class="d-flex justify-content-between">
          <label for="passwordInput">Password</label>
          <router-link to="/ForgotPassword">Forgot Password?</router-link>
        </div>
        <input v-model="form.password" type="password" class="form-control" id="passwordInput" placeholder="Password">
      </div>
      <br>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-success">Login</button>
        <router-link to="/Register"><button type="button" class="btn btn-outline-success">Not a user? Register
            instead.</button></router-link>
      </div>
    </div>
  </form>
  <!-- <form @submit.prevent="handleLogin()">
      <h1>Login</h1>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button>Login</button>
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </form> -->
</template>
