<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { register } = useAuthUser();

// Form reactive ref to keep up with the form data
const form = ref({
  name: "",
  email: "",
  password: "",
});

// function to hand the form submit
const handleSubmit = async () => {

  this.$validator


  try {
    // use the register method from the AuthUser composable
    await register(form.value);

    // and redirect to a EmailConfirmation page the will instruct
    // the user to confirm they're email address
    router.push({
      name: "EmailConfirmation",
      query: { email: form.value.email },
    });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<template>
  <!-- <form @submit.prevent="handleSubmit">
    <h1>Register</h1>
    <label>Name <input v-model="form.name" type="text" /></label>
    <label>Email <input v-model="form.email" type="email" /></label>
    <label>Password <input v-model="form.password" type="password" /></label>
    <button>Register</button>
  </form> -->

  <h1>Register <small>(for new users)</small></h1>
  <div class="left"></div>
  <form class="right" @submit.prevent="handleSubmit">
    <div style="width: 75%">
      <div class="form-group">
        <label for="emailInput">Email Address</label>
        <input v-model="form.email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"
          placeholder="Enter Email Address...">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>
      <br>


      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input v-validate="'required'" ref="password" v-model="form.password" type="password" class="form-control"
          id="passwordInput" placeholder="Enter Password...">
      </div>


      <div class="form-group">
        <label for="confirmPasswordInput">Confirm Password</label>
        <input v-validate="'required|confirmed:$password'" ref="password" type="password" class="form-control"
          id="confirmPasswordInput" placeholder="Enter Password Again...">
      </div>
      <br>
      <div>
        <button type="submit" class="btn btn-success" style="width: 100%">Register</button>
        <br><br>
        <router-link to="/Login"><button type="button" class="btn btn-outline-success" style="width: 100%">Already a user? Log in
            instead.</button></router-link>
      </div>
    </div>
  </form>

</template>
