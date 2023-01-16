<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import useAuthUser from '../../composables/UseAuthUser.js';
import useSupabase from '../../composables/UseSupabase.js';

// Use necessary composables
const router = useRouter();
const { supabase } = useSupabase();
const { user } = useAuthUser();

// keep up with form data
const form = ref({
	targetName: '',
	energy: '',
	protein: '',
	carbs: '',
	unsatFats: ''
});

const handleSubmit = async () => {
	try {
		await supabase
			.from('targets')
			.insert({ user_id: user.value.id, name: form.value.targetName, energy: form.value.energy, protein: form.value.protein, carbs: form.value.carbs, unsatFats: form.value.unsatFats });
		router.push({
			name: 'AllTargets',
		});
	} catch (error) {
		alert(error.message);
	}
};
</script>

<template>
    <div class="container-1-3">

        <div class="left">
            <h1>Creating a new target</h1>
            <p>
                On this page, you can create a new nutrition target.
                Nutrition targets can be used when analayzing your ingredients
                to check whether your meal meets the requirements you've set.
            </p>
        </div>
        <form class="right" @submit.prevent="handleSubmit()">
            <!-- TODO: Enforce a minimum value: currently, you can also send negative numbers -->
            <label class="col-sm-2 col-form-label">Target Name</label>
            <input class="col-sm-3" v-model="form.targetName" type="text" />
            <br>


            <label class="col-sm-2 col-form-label">Energy</label>
            <input class="col-sm-3" v-model="form.energy" type="number" /> kcal
            <br>


            <label class="col-sm-2 col-form-label">Protein</label>
            <input class="col-sm-3" v-model="form.protein" type="number" /> gram
            <br>

            <label class="col-sm-2 col-form-label">Carbs</label>
            <input class="col-sm-3" v-model="form.carbs" type="number" /> gram
            <br>

            <label class="col-sm-2 col-form-label">Unsat. Fats</label>
            <input class="col-sm-3" v-model="form.unsatFats" type="number" /> gram
            <br>

            <button class="btn btn-success">Create new target</button>
        </form>
    </div>
</template>