<script>
import PolarArea from '../components/charts/PolarArea.vue';

export default {
	components: {
		PolarArea,
	},
	data () {
		return {
			days: 7
		};
	}
};
</script>

<template lang="pug">
.container-fluid.h-100
  .card 
    .card-body
      .card-title 
        h2 Stats of the last {{ this.days }} days
      .card-text
        .row 
          .col
            <PolarArea :apiUrl="'https://nutrition-calculation-app.onrender.com/api/v1/nutrition/summary?days='" :days="this.days" />
          .col
            p.mt-5.pb-4 The values shown in the chart are measured in percentages according to your chosen target. To change the the time displayed in the Graph you can change the number in the input field below
            form(@submit.prevent="")
              .form-floating
                input#statsRange.form-control(name="statsRange" placeholder="Stats time range" type="number" v-model="days")
                label(for="statsRange") Stats time range
</template>
