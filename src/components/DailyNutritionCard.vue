<script>
import PolarArea from '../components/charts/PolarArea.vue';
import DailyNutrition from '../components/charts/DailyNutrition.vue';
import IngredientTable from '../components/IngredientTable.vue';

//const ingredients = [{ type: "Griekse Yoghurt", kcal: 91, fat: 2, sat_fat: 1.7, carbs: 4.7, sugar:4.7, fibers: 0, protein: 6 }, { type: "Cottage Cheese", kcal: 101, fat: 2, sat_fat: 0, carbs: 2.7, sugar:2.7, fibers: 0, protein: 12 }];

// const dailyNutritionMale = {
//   KCAL: 2500,
//   CARBS: 300,
//   SUGAR: 65,
//   FAT: 95,
//   PROTEIN: 55
// }

// async function getDailyNutrition() {
//   const response = await fetch('https://638755cdd9b24b1be3ed676d.mockapi.io/api/v1/nutrition');
//   const data = await response.json();
//   return data[0];
// }

// async function getPercentualData() {
//   // should change depending on users gender
//   const nutritionGoals = dailyNutritionMale
//   const data = [];
//   const dailyIntake = await getDailyNutrition();
//   const dailyIntakeKeys = Object.keys(dailyIntake)
//   for (let i = 0; i < dailyIntakeKeys.length; i++) {
//     let key = dailyIntakeKeys[i];
//     const percentage = (dailyIntake[key] / nutritionGoals[key]) * 100;
//     if (!(percentage > 0)) continue;
//     data.push(percentage);
//   }
//   return data;
// }

// const data = {
//   labels: [
//     'KCAL',
//     'CARBS',
//     'SUGAR',
//     'FAT',
//     'PROTEIN',
//     ],
//   datasets: [
//     {
//       label: 'My Second dataset',
//       backgroundColor: 'rgba(255,99,132,0.2)',
//       pointBackgroundColor: 'rgba(255,99,132,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(255,99,132,1)',
//       data: [28, 48, 39, 96, 100],
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
// };


export default {
  components: {
    DailyNutrition,
    PolarArea,
    IngredientTable
  }
}
</script>

<template lang="pug">
.container-fluid.h-100
  .row.mt-4
    .col(style="height:50vh; overflow:scroll;")
      .card
        .card-body 
          .card-title
            h2 Ingredients
          .card-text
            IngredientTable
  .row.mt-4.mb-4
    .col-sm.w-50
      .card.mh-50
        .card-body
          .card-title
            h2 Meals nutrition
          .card-text
          <PolarArea :apiUrl="'https://638755cdd9b24b1be3ed676d.mockapi.io/api/v1/nutrition'" />
    .col-sm.mh-100.w-50
      .card.h-100
        .card-body 
          .card-text.h-75
            h1 Progess bar stuff
          hr
          .card-text
            .align-middle
              form(action="" method="")
                .form-floating
                  input#mealName.form-control(placeholder="Meal's name")
                  label(for="mealName") Meal's name
                  .d-grid.gap-2.d-md-flex.justify-content-md-end.mt-2
                    button.btn.btn-success.me-md-2(type="submit") Save
</template>
