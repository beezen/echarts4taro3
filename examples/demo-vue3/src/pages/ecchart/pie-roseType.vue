<template>
  <view class="bar-chart">
    <EChart ref="canvas" canvas-id="pie-canvas" />
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
      top: "bottom"
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "面积模式",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: "rose 1" },
          { value: 38, name: "rose 2" },
          { value: 32, name: "rose 3" },
          { value: 30, name: "rose 4" },
          { value: 28, name: "rose 5" },
          { value: 26, name: "rose 6" },
          { value: 22, name: "rose 7" },
          { value: 18, name: "rose 8" }
        ]
      }
    ]
  };
  Taro.nextTick(() => {
    canvasInstance.refresh(option);
  });
});
</script>
