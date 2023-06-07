<template>
  <view class="bar-chart">
    <EChart ref="canvas" canvas-id="candlestick-canvas" />
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
    xAxis: {
      data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"]
    },
    yAxis: {},
    series: [
      {
        type: "k",
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42]
        ]
      }
    ]
  };
  Taro.nextTick(() => {
    canvasInstance.refresh(option);
  });
});
</script>
