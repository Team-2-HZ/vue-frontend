<template>
    <div style="display: flex; height: 30px">
        <div style="width: 8%;">
            {{ label }}
        </div>
        <div style="width: 92%">
            <div class="progress" style="height: 25px;">
                <div class="progress-bar" :class="color()" role="progressbar" :style="{ 'width': ariaValue + '%'}"
                    :aria-valuenow="ariaValue" aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>
            <!--TODO: It works, but it's a botchy solution. Especially the way I use pixels and percentages for positioning stuff makes it inflexible for re-use in sitautions other than this spefic one.
    78% - 81.5% is intentional and not a math mistake. I think it has to do with the spacing / kerning of "|" symbol-->
            <div style="height: 0%">
                <div style="position: relative; bottom: 28px; text-align: center;">{{ currentValue }} / {{ targetValue }} {{ unit }}
                    <div style="position: absolute; bottom: -6px; font-weight: bold; font-size: x-large; margin-left: 78%;">|</div>
                    <div style="position: absolute;  bottom: -6px; font-weight: bold; font-size: x-large; margin-left: 81.2%;">|</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NutritionProgress',
    props: {
        currentValue: {
            type: Number,
            required: true,
            default: 0
        },
        targetValue: {
            type: Number,
            required: true,
            default: 100 // TODO: Prevent this from being set to 0. Please never set this to 0.
        },
        label: {
            type: String,
            required: false,
            default: ""
        },
        unit: {
            type: String,
            required: false,
            default: ""
        },
        
    },
    methods: {
        color: function () {
            // TODO: There's probably a better way of doing this.
            let lowerLimit = this.targetValue * 0.98;
            let upperLimit = this.targetValue * 1.02;
            if (this.currentValue < lowerLimit) {
                console.log('NOT ENOUGH')
                return "progress-bar-striped bg-warning"
            } else if (this.currentValue >= lowerLimit && this.currentValue <= upperLimit) {
                console.log('JUST RIGHT')
                return "bg-success"
            } else {
                console.log('TOO MUCH')
                return "progress-bar-striped bg-danger"
            }
        }
    },
    computed: {
        ariaValue() {
            return this.currentValue / this.targetValue * 100 * 0.8;
        },
    }
}
</script>