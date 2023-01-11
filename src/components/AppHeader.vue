<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { isLoggedIn } = useAuthUser();
</script>
<template>
  <div>
    <ul>
      <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
      <li v-if="isLoggedIn()"><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
    </ul>
    <ul v-if="isLoggedIn()">
      <li><router-link :to="{ name: 'Logout' }">Logout</router-link></li>
    </ul>
    <ul v-else>
      <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
      <li><router-link :to="{ name: 'Register' }">Register</router-link></li>
    </ul>
  </div>
</template>
