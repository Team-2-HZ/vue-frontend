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
    energy: "",
    protein: "",
    carbs: "",
    unsatFats: ""
});

const handleSubmit = async () => {
    try {
        // console.log(user.id)
        const { error } = await supabase
            .from('targets')
            .insert({ user_id: user.value.id, energy: form.value.energy, protein: form.value.protein, carbs: form.value.carbs, unsatFats: form.value.unsatFats })
        router.push({
            name: "AllTargets",
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
        <label>Energy <input v-model="form.energy" type="number" /></label><br>
        <label>Protein <input v-model="form.protein" type="number" /></label><br>
        <label>Carbs <input v-model="form.carbs" type="number" /></label><br>
        <label>Unsat. Fats <input v-model="form.unsatFats" type="number" /></label><br>
        <button>Create a new target</button>
    </form>
</template>