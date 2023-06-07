<template>
  <view class="bar-chart">
    <EChart ref="canvas" canvas-id="line-canvas" />
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ]
  };
  Taro.nextTick(() => {
    canvasInstance.refresh(option);
  });
});
</script>
