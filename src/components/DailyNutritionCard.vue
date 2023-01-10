<script>
import PolarArea from '../components/charts/PolarArea.vue';
import DailyNutrition from '../components/charts/DailyNutrition.vue';
import IngredientTable from '../components/IngredientTable.vue';
import axios from 'axios';

export default {
  components: {
    DailyNutrition,
    PolarArea,
    IngredientTable,
  },
  data () {
    return {
      mealName: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        const token = 'miTQ1NwbocCI?A2uyop1?VN=l3wh?kebR6WuepYJCOFfzWqGImXfiO/Ksed5pAxQBP8km8qU!6RmhehCPlF5D7TZm?R8w4bH8JpQXxrgABVDfAHyC9yBp3M2zxCQN13-oSf-fJhqjY-X9HlyMyq6y3Rm486eOx5VGWt!upDx-Y3CorzLs747otpnGEcfOQozNoSzJqlC!PZGypR22j/2DD1jzuCml!eHjfkX=sT8lQYqabuOnAJ/fhI6HKdo1p0X'
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
              form(@submit.prevent="submitForm")
                .form-floating
                  input#mealName.form-control(name="mealName" placeholder="Meal's name")
                  label(for="mealName") Meal's name
                  .d-grid.gap-2.d-md-flex.justify-content-md-end.mt-2
                    button.btn.btn-success.me-md-2(type="submit") Save
</template>
