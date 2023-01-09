<script setup>
import { RouterLink, RouterView } from 'vue-router'
// TODO: Uncaught ReferenceError: $ is not defined <anonymous> Sidebar.vue:97
// import Sidebar from '../components/Sidebar.vue' 
</script>

<template>
  <header>
    <!--<Sidebar /> -->
  </header>
  <div>
    <router-view />
  </div>
</template>
