<script setup>
import { ref } from 'vue';
import useAuthUser from '../../composables/UseAuthUser.js';
import useSupabase from '../../composables/UseSupabase.js';

// Use necessary composables
const { supabase } = useSupabase();
const { user } = useAuthUser();

const data = ref([]);
const dataLoaded = ref(null);

const getData = async () => {
	try {
		const { data: targets, error } = await supabase.from('targets').select('*').eq('user_id', user.value.id);
		if (error) throw error;
		data.value = targets;
		dataLoaded.value = true;
	}
	catch (error) {
		console.warn(error.message);
	}
};

getData();
console.log(data);
console.log(data.value);

</script>

<template>
    <div class="container-1-3">
        <div class="left">
            <h1>Nutrition Targets</h1>
            <p>Here you can find all the nutrition targets you have created, which you can use when weighing your meal.
            </p>
            <router-link :to="{ name: 'CreateTarget' }"><button type="button" class="btn btn-success">Create new
                    target</button></router-link>
        </div>

        <!-- <div class="right card-deck" v-if="dataLoaded">
            <div v-if="data.length === 0">No targets yet...</div>
            <div class="card-deck" v-else>
                <TargetCard v-for="(target, index) in data" :key="index" :id="target.id" :energy="target.energy"
                    :protein="target.protein" :carbs="target.carbs" :unsatFats="target.unsatFats" />
            </div>
        </div> -->

        <table class="table right">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Energy (kcal)</th>
                    <th scope="col">Protein (gram)</th>
                    <th scope="col">Carbs (gram)</th>
                    <th scope="col">Unsat. Fats (gram)</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="target in data"
                    :key="target.id"
                >
                    <th scope="row">{{ target.name }}</th>
                    <td>{{ target.energy }}</td>
                    <td>{{ target.protein }}</td>
                    <td>{{ target.carbs }}</td>
                    <td>{{ target.unsatFats }}</td>
                    <td><router-link :to="{ name: 'Meal', params: { id: target.id } }"><button type="button"
                                class="btn btn-success">Use this
                                target</button></router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>