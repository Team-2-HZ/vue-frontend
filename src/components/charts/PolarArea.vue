<template>
  <PolarArea     
    :chart-options="options"
    :chart-data="data"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height" />
</template>

<script>
import {
	Chart as ChartJS,
	RadialLinearScale,
	ArcElement,
	Tooltip,
	Legend
} from 'chart.js';
import { PolarArea } from 'vue-chartjs';

const labels = 
[
	'KCAL',
	'CARBS',
	'SUGAR',
	'FIBERS',
	'FAT',
	'SAT. FAT',
	'PROTEIN',
];

// const dailyNutritionMale = {
// 	KCAL: 2500,
// 	CARBS: 300,
// 	SUGAR: 65,
// 	FIBERS: 50,
// 	FAT: 95,
// 	SAT_FATS: 20,
// 	PROTEIN: 55
// };
  
// const dailyNutritionFemale = {
// 	KCAL: 2000,
// 	CARBS: 230,
// 	SUGAR: 49,
// 	FAT: 73,
// 	PROTEIN: 45
// };

async function getDailyNutrition(apiUrl) {
	const response = await fetch(apiUrl, {
		headers: {
			'Authorization': 'Bearer miTQ1NwbocCI?A2uyop1?VN=l3wh?kebR6WuepYJCOFfzWqGImXfiO/Ksed5pAxQBP8km8qU!6RmhehCPlF5D7TZm?R8w4bH8JpQXxrgABVDfAHyC9yBp3M2zxCQN13-oSf-fJhqjY-X9HlyMyq6y3Rm486eOx5VGWt!upDx-Y3CorzLs747otpnGEcfOQozNoSzJqlC!PZGypR22j/2DD1jzuCml!eHjfkX=sT8lQYqabuOnAJ/fhI6HKdo1p0X'
		}
	});
	const data = await response.json();
	return data;
}


async function getPercentualData(days) {
	// should change depending on users gender
	// const nutritionGoals = dailyNutritionMale;
	const data = [];
	const dailyIntake = await getDailyNutrition( this.apiUrl + days);
	if (!dailyIntake) return;
	// const dailyIntakeKeys = Object.keys(dailyIntake);
	for (let i = 0; i < labels.length; i++) {
		let label = labels[i];
		if (label == 'KCAL') label = 'ENERC_KCAL';
		if (label == 'SAT. FAT') label = 'SATURATED_FAT';
		if (label == 'FIBERS') label = 'FIBRE';
		// const percentage = ((dailyIntake[label] / nutritionGoals[label]) * 100);
		// if (!(percentage > 0)) continue;
		data.push(dailyIntake[label]);
	}
	// for (let i = 0; i < dailyIntakeKeys.length; i++) {
	//   let key = dailyIntakeKeys[i];
	//   const percentage = (dailyIntake[key] / nutritionGoals[key]) * 100;
	//   if (!(percentage > 0)) continue;
	//   data.push(percentage);
	// }
	return data;
}

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default {
	name: 'App',
	components: {
		PolarArea
	},
	props: {
		apiUrl: {
			type: String,
			required: true
		},
		chartId: {
			type: String,
			default: 'PolarArea'
		},
		width: {
			type: Number,
			default: 600
		},
		height: {
			type: Number,
			default: 600
		},
		cssClasses: {
			default: '',
			type: String
		},
		styles: {
			type: Object,
			default: () => {}
		},
		plugins: {
			type: Array,
			default: () => []
		},
		days: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			intervalId: null,
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Daily intake',
						backgroundColor: [
							'rgba(255, 99, 132, 0.5)',
							'rgba(210, 105, 30, 0.5)',
							'rgba(255, 206, 86, 0.5)',
							'rgba(0, 128, 0, 0.5)',
							'rgba(54, 162, 235, 0.5)',
							'rgba(204, 204, 204, 0.5)',
							'rgba(153, 102, 255, 0.5)'
						],
						borderColor: 'white',
						pointBackgroundColor: 'rgba(255,99,132,0.75)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgba(255,99,132,1)',
						data: [0, 0, 0, 0, 0]
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scale: {
					r: {
						pointLabels: {
							display: true,
							centerPointLabels: true,
							font: {
								size: 18
							}
						},
						beginAtZero: true,
						angleLines: {
							color: 'red',
						}
					}
				}
			}
		};
	},
	// Making the diagram load the data async
	async mounted () {
		const fetchData = async () => {
			try {
				const data = await getPercentualData.bind(this)(this.days);
				this.data['datasets'][0].data = data;
				// console.log(this.chartData["datasets"][0].data);
				// set the background color based on the data values
				// this.data["datasets"][0].backgroundColor = this.data["datasets"][0].data.map(d => {
				// if (d < 50) {
				//   return 'rgba(209, 0, 0)';
				// } if (d < 80) {
				//   return 'rgba(250, 132, 22)';
				// } if (d < 100) {
				//   return 'rgba(62, 196, 4)';
				// } else {
				//   return 'rgba(209, 0, 0)';
				// }
				// });
				// // Set the border color to a slightly darker color then the backgroundColor
				// this.data["datasets"][0].borderColor = this.data["datasets"][0].data.map(d => {
				// if (d < 50) {
				//   return 'rgba(100, 0, 0)';
				// } if (d < 80) {
				//   return 'rgba(170, 80, 22)';
				// } if (d < 100) {
				//   return 'rgba(62, 120, 4)';
				// } if (d < 115) {
				//   return 'rgba(100, 0, 0)';
				// }
				// });
				this.isLoaded = true;
			} catch (e) {
				console.error(e);
			}
		};

		fetchData();

		this.intervalId = setInterval(async () => {
			fetchData();
		}, 5000);
	},
	beforeUnmount() {
		clearInterval(this.intervalId);
	}
};
</script>