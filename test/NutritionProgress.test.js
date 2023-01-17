import { mount } from "@vue/test-utils";
import { test, expect } from "vitest"
import NutritionProgress from "../src/components/NutritionProgress.vue"

test('ariaValue() calculates currentValue / targetValue * 80', () => {
    const wrapper = mount(NutritionProgress, {
        propsData: {
            currentValue: 50,
            targetValue: 100,
        },
    })

    expect(wrapper.vm.ariaValue).toBe(40);
})
