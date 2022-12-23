export const data = {
  labels: [
    'KCAL',
    'CARBS',
    'SUGAR',
    'FAT',
    'PROTEIN',
    ],
  datasets: [
    {
      label: "Daily intake",
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [0, 0, 0, 0, 0]
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    r: {
      min: 0,
      max: 100,
      beginAtZero: true,
      angleLines: {
        color: "red",
     },
    }
  }
};
