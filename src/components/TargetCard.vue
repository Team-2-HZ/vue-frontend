<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
                <!-- <b>ID:</b> {{ id }}
                <br> -->
                <!--calories of target-->
                <b>ENERGY:</b> {{ energy }} kcal
                <br>
                <b>PROTEIN:</b> {{ protein }} gram
                <br>
                <b>CARBS:</b> {{ carbs }} gram
                <br>
                <b>UNSAT. FATS:</b> {{ unsatFats }} gram
            </p>
            <router-link :to="{ name: 'Meal', params: { id: id } }"><button style="margin-right: 10px" type="button"
                    class="btn btn-success">Use this
                    target</button></router-link>
        </div>
    </div>
</template>


<script>
export default {
    name: 'TargetCard',
    props: {
        id: {
            type: Number,
            required: true,
            default: 0
        },

        energy: {
            type: Number,
            required: true,
            default: 0
        },

        protein: {
            type: Number,
            required: true,
            default: 0
        },

        carbs: {
            type: Number,
            required: true,
            default: 0
        },

        unsatFats: {
            type: Number,
            required: true,
            default: 0
        },
    },
    computed: {
        idComp() {
            return this.id;
        },
    }
}
</script>