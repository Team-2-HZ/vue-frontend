<template lang="pug">
.card
  .card-body 
    .card-title
      h2 Meal History 
    .card-text 
      p Here you can see all meals you saved before.
      //- template(v-if="true")
      template(v-if="meals.length > 0")
        table.table.table-hover
          thead
            tr 
              th(scope="col") Meal
              th(scope="col") Date
              th(scope="col") KCAL
              th(scope="col") Fat
              th(scope="col") Sat. Fats
              th(scope="col") Carbs
              th(scope="col") Sugar
              th(scope="col") Fibers 
              th(scope="col") Protein
          tbody
              tr(v-for="meal in meals" :key="meal.id")  
                td(scope="row") {{ meal.name }} 
                td {{ new Date(meal.created_at).toLocaleDateString('es-CL') }}
                td {{ meal.nutritions.ENERC_KCAL }}
                td {{ meal.nutritions.FAT }}
                td {{ meal.nutritions.SATURATED_FAT }}
                td {{ meal.nutritions.CARBS }}
                td {{ meal.nutritions.SUGAR }}
                td {{ meal.nutritions.FIBRE }}
                td {{ meal.nutritions.PROTEIN }}
      template(v-else)
        h5 There are no saved meals yet
</template>

<script>
async function getMeals() {
	const response = await fetch('https://nutrition-calculation-app.onrender.com/api/v1/nutrition/meal', {
		headers: {
			'Authorization': 'Bearer miTQ1NwbocCI?A2uyop1?VN=l3wh?kebR6WuepYJCOFfzWqGImXfiO/Ksed5pAxQBP8km8qU!6RmhehCPlF5D7TZm?R8w4bH8JpQXxrgABVDfAHyC9yBp3M2zxCQN13-oSf-fJhqjY-X9HlyMyq6y3Rm486eOx5VGWt!upDx-Y3CorzLs747otpnGEcfOQozNoSzJqlC!PZGypR22j/2DD1jzuCml!eHjfkX=sT8lQYqabuOnAJ/fhI6HKdo1p0X'
		}
	});
	const data =  await response.json();
	console.log(data);
	return data;
}

export default {
	data() {
		return {
			meals: []
		};
	},
	mounted() {
		getMeals()
			.then((data) => (this.meals = data))
			.catch((error) => {
				console.log(error);
			});
	},
};
</script>

