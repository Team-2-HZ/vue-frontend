<script setup>
import DailyNutritionCardVue from '../components/DailyNutritionCard.vue';
import NutritionProgress from '../components/NutritionProgress.vue'

import { ref } from "vue"
import { useRoute } from "vue-router";

import useAuthUser from "../composables/UseAuthUser.js";
import useSupabase from "../composables/UseSupabase.js";

// Use necessary composables
const route = useRoute();
const id = route.params.id;
const { supabase } = useSupabase();
const { user } = useAuthUser();

const data = ref([]);
const dataLoaded = ref(null);

const getData = async () => {
  try {
    const { data: targets, error } = await supabase.from('targets').select("*").eq("id", id).eq("user_id", user.value.id);
    // TODO: Implement some sort of security measure that prevents users from taking eachother's meals.
    if (error) throw error;
    data.value = targets;
    dataLoaded.value = true;
  }
  catch (error) {
    console.warn(error.message)
  }
};

getData();
console.log(data);
console.log(data.value);

</script>

<template>
  <main>
    <DailyNutritionCardVue />
    <!--TODO    <DailyNutritionCardVue />
: v-for directive should be replaced with something more suitable, but I know this at least works.-->
    <div v-for="(target, index) in data" :key="index">

      <div style="margin-left: 79%; font-size: large;">Target</div>
      <NutritionProgress :currentValue="0" :targetValue=target.calories label="Energy" unit="kcal" />
      <NutritionProgress :currentValue="190" :targetValue="500" label="Protein" unit="gram" />
      <NutritionProgress :currentValue="490" :targetValue="500" label="Carbs" unit="gram" />
      <NutritionProgress :currentValue="100" :targetValue="500" label="Unsat. Fats" unit="gram" />
    </div>
  </main>
</template>

<!-- <script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  }
}
</script> -->
