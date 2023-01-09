<template lang="pug">
template(v-if="ingredients")
  table.table.table-hover
    thead
      tr 
        th(scope="col") Ingredient
        th(scope="col") KCAL
        th(scope="col") Fat
        th(scope="col") Sat. Fats
        th(scope="col") Carbs
        th(scope="col") Sugar
        th(scope="col") Fibers 
        th(scope="col") Protein
    tbody
        tr(v-for="ingredient in ingredients" :key="ingredient.id")
          td(scope="row") {{ingredient.foodName}} 
          td {{ingredient.ENERC_KCAL}}
          td {{ingredient.FAT}}
          td {{ingredient.SATURATED_FAT}}
          td {{ingredient.CARBS}}
          td {{ingredient.SUGAR}}
          td {{ingredient.FIBRE}}
          td {{ingredient.PROTEIN}}
template(v-else)
  p Nothing scanned yet for this meal 
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'

async function getIngredients() {
  const response = await fetch('https://nutrition-calculation-app.onrender.com/api/v1/ingredients', {
    headers: {
        'Authorization': 'Bearer miTQ1NwbocCI?A2uyop1?VN=l3wh?kebR6WuepYJCOFfzWqGImXfiO/Ksed5pAxQBP8km8qU!6RmhehCPlF5D7TZm?R8w4bH8JpQXxrgABVDfAHyC9yBp3M2zxCQN13-oSf-fJhqjY-X9HlyMyq6y3Rm486eOx5VGWt!upDx-Y3CorzLs747otpnGEcfOQozNoSzJqlC!PZGypR22j/2DD1jzuCml!eHjfkX=sT8lQYqabuOnAJ/fhI6HKdo1p0X'
    }
  });
  const data =  await response.json();
  return data;
}

export default {
  components: {},
  setup() {
    const count = ref(0);
    const ingredients = ref([]);
    let intervalId = null;

    const increment = async () => {
      count.value++
      ingredients.value = await getIngredients()
    }

    increment();

    const startInterval = () => {
      intervalId = setInterval(() => {
        increment();
      }, 5000)
    }

    const stopInterval = () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }

    startInterval();

    onBeforeUnmount(stopInterval);

    return {
      count,
      ingredients,
      increment
    }
  }
}

</script>