<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import TargetCard from "../../components/TargetCard.vue"

import useAuthUser from "../../composables/UseAuthUser.js";
import useSupabase from "../../composables/UseSupabase.js";

// Use necessary composables
const router = useRouter();
const { supabase } = useSupabase();
const { user } = useAuthUser();

const data = ref([]);
const dataLoaded = ref(null);

const getData = async () => {
    try {
        const { data: targets, error } = await supabase.from('targets').select('*').eq("user_id", user.value.id)
        if (error) throw error;
        data.value = targets;
        dataLoaded.value = true;
    }
    catch (error) {
        console.warn(error.message)
    }
};

getData();
console.log(data);
console.log(data.value);

</script>

<template>
    <div v-if="dataLoaded">
        <div v-if="data.length === 0">No targets yet...</div>
        <div v-else>
            <div v-for="(target, index) in data" :key="index">
                <TargetCard :id="target.id" :calories="target.calories" />
            </div>
        </div>
    </div>
</template>