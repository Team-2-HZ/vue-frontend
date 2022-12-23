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
          td(scope="row") {{ingredient.type}} 
          td {{ingredient.kcal}}
          td {{ingredient.fat}}
          td {{ingredient.sat_fat}}
          td {{ingredient.carbs}}
          td {{ingredient.sugar}}
          td {{ingredient.fibers}}
          td {{ingredient.protein}}
template(v-else)
  p Nothing scanned yet for this meal 
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'

async function getIngredients() {
  const response = await fetch('https://638755cdd9b24b1be3ed676d.mockapi.io/api/v1/ingredients');
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