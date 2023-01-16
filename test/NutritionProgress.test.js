import { mount } from "@vue/test-utils";
import { test, expect } from "vitest"
import NutritionProgress from "../src/components/NutritionProgress.vue"

test('Check if the props currentValue, targetValue and unit are added to the template correctly', () => {
    expect(NutritionProgress).toBeTruthy()

    const wrapper = mount(NutritionProgress, {
        propsData: {
            currentValue: 50,
            targetValue: 100,
            unit: "gram",
        },
    })

    expect(wrapper.text()).toContain("50 / 100 gram");
})