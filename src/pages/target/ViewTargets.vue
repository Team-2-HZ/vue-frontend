<script setup>
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();


let { data: targets, error } = await supabase
    .from('targets')
    .select('user_id')
</script>

<template>
    <!--TODO: Replace with some kind of card component-->


</template>
