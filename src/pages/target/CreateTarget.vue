<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import useAuthUser from "../../composables/UseAuthUser.js";
import useSupabase from "../../composables/UseSupabase.js";

// Use necessary composables
const router = useRouter();
const { supabase } = useSupabase();
const { user } = useAuthUser();

// keep up with form data
const form = ref({
    calories: "",
});

const handleSubmit = async () => {
    try {
        // console.log(user.id)
        console.log(form.value.calories)

        const { error } = await supabase
            .from('targets')
            .insert({ user_id: user.value.id, calories: form.value.calories })
        router.push({
            name: "Home",
        });
    } catch (error) {
        alert(error.message);
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit()">
        <h1>Create a new target</h1>
        <!-- TODO: Enforce a minimum value: currently, you can also send negative numbers -->
        <label>Calories <input v-model="form.calories" type="number" /></label>
        <button>Create a new target</button>
    </form>
</template>