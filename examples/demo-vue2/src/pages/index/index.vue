<template>
  <view class="bar-chart">
    <e-chart ref="vueref0" />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import * as echarts from "./assets/echarts";
import { EChart, loadEcharts } from "echarts4taro3";
loadEcharts(echarts);
import "./index.less";
export default {
  name: "Index",
  components: {
    EChart
  },
  data() {
    return {};
  },
  mounted() {
    let option = {
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
      setTimeout(() => {
        this.$refs.vueref0.refresh(option); // 初始化图表
        setInterval(() => {
          let firstValue = option.series[0].data.shift();
          option.series[0].data.push(firstValue);
          this.$refs.vueref0.setOption(option); // 异步更新图表数据
        }, 2000);
      }, 200);
    });
  }
};
</script>
