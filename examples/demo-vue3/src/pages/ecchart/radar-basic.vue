<template>
  <view class="bar-chart">
    <EChart ref="canvas" canvas-id="radar-canvas" />
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import "./index.less";
import { EChart } from "echarts4taro3";
import { onMounted, ref } from "vue-demi";
const canvas = ref(null);
onMounted(() => {
  const canvasInstance = canvas.value;
  const option = {
    legend: {
      data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "销售（Sales）", max: 6500 },
        { name: "管理（Administration）", max: 16000 },
        { name: "信息技术（Information Technology）", max: 30000 },
        { name: "客服（Customer Support）", max: 38000 },
        { name: "研发（Development）", max: 52000 },
        { name: "市场（Marketing）", max: 25000 }
      ]
    },
    series: [
      {
        name: "预算 vs 开销（Budget vs spending）",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "预算分配（Allocated Budget）"
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "实际开销（Actual Spending）"
          }
        ]
      }
    ]
  };

  Taro.nextTick(() => {
    canvasInstance.refresh(option);
  });
});
</script>
