<script setup>
import NutritionProgress from '../components/NutritionProgress.vue';
import PolarArea from '../components/charts/PolarArea.vue';
import IngredientTable from '../components/IngredientTable.vue';

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

const absoluteData = ref([]);
const absoluteDataLoaded = ref(null);

const getData = async () => {
  try {
    const { data: targets, error } = await supabase.from('targets').select("*").eq("id", id).eq("user_id", user.value.id);
    // TODO: Implement some sort of security measure that prevents users from using the targets of other users.
    if (error) throw error;
    data.value = targets;
    dataLoaded.value = true;
  }
  catch (error) {
    console.warn(error.message)
  }
};


async function getAbsoluteData() {
  try {
    console.log('fetching absolute nutrition');
    const response = await fetch('https://nutrition-calculation-app.onrender.com/api/v1/nutrition/summary/absolute?days=1', {
      headers: {
        'Authorization': 'Bearer miTQ1NwbocCI?A2uyop1?VN=l3wh?kebR6WuepYJCOFfzWqGImXfiO/Ksed5pAxQBP8km8qU!6RmhehCPlF5D7TZm?R8w4bH8JpQXxrgABVDfAHyC9yBp3M2zxCQN13-oSf-fJhqjY-X9HlyMyq6y3Rm486eOx5VGWt!upDx-Y3CorzLs747otpnGEcfOQozNoSzJqlC!PZGypR22j/2DD1jzuCml!eHjfkX=sT8lQYqabuOnAJ/fhI6HKdo1p0X'
      }
    });

    absoluteData.value = await response.json();
    absoluteDataLoaded.value = true;

    console.log(absoluteData);
    return absoluteData;
  } catch {
    console.warn("FUCK")
  }
}


getData();
console.log(data);
console.log(data.value);

setInterval(function () {
  getAbsoluteData()
}, 5000);

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
            <NutritionProgress :currentValue=absoluteData.ENERC_KCAL :targetValue=target.energy label="Energy" unit="kcal" />
            <NutritionProgress :currentValue=absoluteData.PROTEIN :targetValue=target.protein label="Protein" unit="gram" />
            <NutritionProgress :currentValue=absoluteData.CARBS :targetValue=target.carbs label="Carbs" unit="gram" />
            <NutritionProgress :currentValue=absoluteData.FAT-absoluteData.SATURATED_FAT :targetValue=target.unsatFats label="Unsat. Fats" unit="gram" />
          </div>
          <hr class="mt-4">
          <!--Save meal-->
          <form @submit.prevent="submitForm" class="mt-4">
            <div class="form-floating"><input class="form-control" id="mealName" name="mealName"
                placeholder="Meal's name" v-model="mealName"/><label for="mealName">Meal's name</label>
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
			const token = 'miTQ1NwbocCI?A2uyop1?VN=l3wh?kebR6WuepYJCOFfzWqGImXfiO/Ksed5pAxQBP8km8qU!6RmhehCPlF5D7TZm?R8w4bH8JpQXxrgABVDfAHyC9yBp3M2zxCQN13-oSf-fJhqjY-X9HlyMyq6y3Rm486eOx5VGWt!upDx-Y3CorzLs747otpnGEcfOQozNoSzJqlC!PZGypR22j/2DD1jzuCml!eHjfkX=sT8lQYqabuOnAJ/fhI6HKdo1p0X';
			console.log(this.mealName);
			await fetch('https://nutrition-calculation-app.onrender.com/api/v1/meals', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'data': {
						'name': this.mealName,
					}
				})
			});
		}
	}
};
</script>
