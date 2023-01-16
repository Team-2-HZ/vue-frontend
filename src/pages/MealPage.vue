<script setup>
import NutritionProgress from '../components/NutritionProgress.vue';
import PolarArea from '../components/charts/PolarArea.vue';
import IngredientTable from '../components/IngredientTable.vue';
import axios from 'axios';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import useAuthUser from '../composables/UseAuthUser.js';
import useSupabase from '../composables/UseSupabase.js';

// Use necessary composables
const route = useRoute();
const id = route.params.id;
const { supabase } = useSupabase();
const { user } = useAuthUser();

const data = ref([]);
const dataLoaded = ref(null);

const getData = async () => {
	try {
		const { data: targets, error } = await supabase.from('targets').select('*').eq('id', id).eq('user_id', user.value.id);
		// TODO: Implement some sort of security measure that prevents users from taking eachother's meals.
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
  <!--TODO: The elements on this page are way too large. 
    Ideally, everything should be visible without scaling-->
  <!--TODO: Split some of these up into components-->
  <div class="container-fluid h-100">
    <!-- INGREDIENTS -->
    <div class="row mt-4">
      <div class="col" style="height:50%; overflow:scroll;">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h2>Ingredients</h2>
            </div>
            <div class="card-text">
              <IngredientTable />
              <div class="align-middle">
                <form @submit.prevent="submitForm">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="row mt-4 mb-4">
      <!-- GRAPH -->
      <div class="col">
        <div class="card h-100" style="padding: 20px;">
          <div class="card-title">
            <h2>Nutrition (% of target)</h2>
          </div>
          <div class="card-text">
            <PolarArea :apiUrl="'https://nutrition-calculation-app.onrender.com/api/v1/nutrition/summary?days='" />
          </div>
        </div>
      </div>

      <!-- PROGRESS BARS -->
      <div class="col">
        <div class="card h-100" style="padding: 20px;">
          <div class="card-title">
            <h2>Progress (current / target)</h2>
          </div>
          <div class="card-text" v-for="(target, index) in data" :key="index">
            <div style="margin-left: 79%; font-size: large;">Target</div>
            <NutritionProgress :currentValue="2000" :targetValue=target.energy label="Energy" unit="kcal" />
            <NutritionProgress :currentValue="200" :targetValue=target.protein label="Protein" unit="gram" />
            <NutritionProgress :currentValue="0" :targetValue=target.carbs label="Carbs" unit="gram" />
            <NutritionProgress :currentValue="0" :targetValue=target.unsatFats label="Unsat. Fats" unit="gram" />
          </div>
          <hr class="mt-4">
          <!--Save meal-->
          <form @submit.prevent="submitForm" class="mt-4">
            <div class="form-floating"><input class="form-control" id="mealName" name="mealName"
                placeholder="Meal's name" /><label for="mealName">Meal's name</label>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2"><button class="btn btn-success me-md-2"
                  type="submit">Save</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	components: {
		PolarArea,
		IngredientTable,
		NutritionProgress
	},
	data() {
		return {
			mealName: '',
		};
	},
	methods: {
		async submitForm() {
			try {
				const token = 'miTQ1NwbocCI?A2uyop1?VN=l3wh?kebR6WuepYJCOFfzWqGImXfiO/Ksed5pAxQBP8km8qU!6RmhehCPlF5D7TZm?R8w4bH8JpQXxrgABVDfAHyC9yBp3M2zxCQN13-oSf-fJhqjY-X9HlyMyq6y3Rm486eOx5VGWt!upDx-Y3CorzLs747otpnGEcfOQozNoSzJqlC!PZGypR22j/2DD1jzuCml!eHjfkX=sT8lQYqabuOnAJ/fhI6HKdo1p0X';
				const response = await axios.post('https://nutrition-calculation-app.onrender.com/api/v1/meals', {
					mealName: this.mealName,
				}, {
					headers: {
						'Authorization': 'Bearer ' + token
					}
				});
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		}
	}
};
</script>