<script>
import PolarArea from '../components/charts/PolarArea.vue';
import DailyNutrition from '../components/charts/DailyNutrition.vue';
import IngredientTable from '../components/IngredientTable.vue';

export default {
  components: {
    DailyNutrition,
    PolarArea,
    IngredientTable,
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
