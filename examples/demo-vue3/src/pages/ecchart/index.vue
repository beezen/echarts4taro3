<template>
  <view class="bar-chart">
    <EChart ref="canvas" />
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { EChart } from "echarts4taro3";
import "./index.less";

const canvas = ref(null);
const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
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

onMounted(() => {
  const echartComponentInstance = canvas.value; // 组件实例
  Taro.nextTick(() => {
    setTimeout(() => {
      // 初始化图表
      echartComponentInstance.refresh(options).then((myChart) => {
        /** 异步更新图表数据 */
        setInterval(() => {
          let firstValue = options.series[0].data.shift();
          options.series[0].data.push(firstValue);
          myChart.setOption(options); // myChart 即为 echarts 实例，可使用的实例方法，具体可参考 echarts 官网
        }, 2000);
      });
    },200);
  });
});
</script>
