<script setup>
import DailyNutritionCardVue from '../components/DailyNutritionCard.vue';
import NutritionProgress from '../components/NutritionProgress.vue'
</script>

<template>
  <main>
    <DailyNutritionCardVue />
    <div style="margin-left: 79%; font-size: large;">Target</div>
    <NutritionProgress :currentValue="1090" :targetValue="500" label="Energy" unit="kcal"/>
    <NutritionProgress :currentValue="190" :targetValue="500" label="Protein" unit="gram"/>
    <NutritionProgress :currentValue="490" :targetValue="500" label="Carbs" unit="gram"/>
    <NutritionProgress :currentValue="100" :targetValue="500" label="Unsat. Fats" unit="gram"/>
  </main>
</template>
