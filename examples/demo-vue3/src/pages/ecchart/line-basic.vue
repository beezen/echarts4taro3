<template>
  <view class="bar-chart">
    <EChart ref="canvas" canvas-id="line-canvas" />
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import "./line-basic.less";
import { EChart } from "echarts4taro3";
import { onMounted, ref } from "vue-demi";

const canvas = ref(null);
onMounted(() => {
  const canvasInstance = canvas.value;
  const defaultOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar"
      }
    ]
  };

  Taro.nextTick(() => {
    canvasInstance.refresh(defaultOption);
  });
});
</script>
