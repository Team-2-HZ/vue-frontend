<script setup>
import useAuthUser from '@/composables/UseAuthUser';
const { user } = useAuthUser();

console.log(user.value.id);
</script>

<template>
  <div v-if="user">
    <div>Hello {{ user.email }}</div>
    <div>Hello {{ user.id }}</div>
  </div>
</template>