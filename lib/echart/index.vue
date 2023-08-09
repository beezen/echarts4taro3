<template>
  <canvas v-if="isWeb" :id="uid" class="echart-canvas" />
  <EcCanvas v-else ref="canvas" :uid="uid" class="echart-canvas" />
</template>

<script setup>
import "../common/polyfill";
import { ref } from "vue-demi";
import { getEcharts } from "../common/index";
import EcCanvas from "../ec-canvas/index";

let echarts = getEcharts(); // 获取 echarts 模块
const isWeb = ref(process.env.TARO_ENV === "h5"); // 平台类型
const uid = ref(`canvas-${Date.now()}-${Math.floor(Math.random() * 10000)}`); // 唯一编号
const canvas = ref(null); // 当前组件实例
let chartInstance = null; // chart 实例

/**
 * 获取 chart 实例
 */
function getChart() {
  if (!chartInstance) {
    return console.error(
      "echart 实例化还未完成，可参考使用说明：https://github.com/beezen/echarts4taro3#基础用法"
    );
  }
  return chartInstance;
}

/** 更新图表数据 */
function setOption(data) {
  if (!chartInstance) {
    return console.error(
      "echart 实例化还未完成，可参考使用说明：https://github.com/beezen/echarts4taro3#基础用法"
    );
  }
  chartInstance.setOption(data);
}

/** 改变图表尺寸 */
function resize(options) {
  if (!chartInstance) {
    return console.error(
      "echart 实例化还未完成，可参考使用说明：https://github.com/beezen/echarts4taro3#基础用法"
    );
  }
  chartInstance.resize({
    width: options.width,
    height: options.height
  });
}

/**
 * 刷新图表
 * 注：节点挂载完成后才能执行
 * @param data 图表数据
 * @param callback 回调函数，返回 echart 实例
 */
function refresh(data, callback) {
  return new Promise((resolve) => {
    if (process.env.TARO_ENV === "h5") {
      // h5 模式
      const canvasDom = document.querySelector(`#${uid.value}`);
      chartInstance = echarts.init(canvasDom);
      chartInstance.setOption(data);
      if (typeof callback === "function") callback(chartInstance);
      resolve(chartInstance);
    } else {
      // 小程序模式
      const canvasInstance = canvas.value;
      canvasInstance.init((canvas, width, height, canvasDpr) => {
        chartInstance = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: canvasDpr
        });
        canvas.setChart(chartInstance);
        chartInstance.setOption(data);
        if (typeof callback === "function") callback(chartInstance);
        resolve(chartInstance);
        return chartInstance;
      });
    }
  });
}

// 对外暴露属性
defineExpose({
  getChart,
  setOption,
  resize,
  refresh
});
</script>

<style>
.echart-canvas {
  width: 100%;
  height: 100%;
}
</style>
