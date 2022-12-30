<template>
    <!--id of target-->
    <b>ID:</b> {{ id }}
    <br>
    <!--calories of target-->
    <b>CALORIES:</b>{{ calories }}
    <br><br>
    <router-link :to="{ name: 'Meal', params: { id: id } }">Use this target for meal</router-link>
    <!--NOTE: Right now we passing the id for convenience. 
    This means that we make the call to supabase twice. Not sure if we should.
    Also, in a real app, we should probably enable RLS and implement other security measures
    to make sure users cannot access eachother's targets.-->
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

        calories: {
            type: Number,
            required: true,
            default: 0
        }
    },
    computed: {
        idComp() {
            return this.id;
        },
    }
}
</script>