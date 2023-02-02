<template>
  <canvas v-if="isWeb" :id="uid" class="echart-canvas" />
  <EcCanvas v-else ref="canvas" :uid="uid" class="echart-canvas" />
</template>

<script setup>
import "./polyfill";
import { reactive, ref } from "vue-demi";
import Taro from "@tarojs/taro";
import * as echarts from "../ec-canvas/echarts";
import EcCanvas from "../ec-canvas/index";

const isWeb = ref(process.env.TARO_ENV === "h5"); // 平台类型
const uid = ref(`canvas-${Date.now()}-${Math.floor(Math.random() * 10000)}`); // 唯一编号
const canvas = ref(null); // 当前组件实例
let chartInstance = {}; // chart 实例

/** 获取 chart 实例 */
function getChart() {
  return chartInstance;
}

/** 更新图表数据 */
function setOption(data) {
  chartInstance.setOption(data);
}

/** 改变图表尺寸 */
function resize(options) {
  chartInstance.resize({
    width: options.width,
    height: options.height
  });
}

/**
 * 刷新图表
 * 注：节点挂载后才能执行
 */
function refresh(data) {
  if (process.env.TARO_ENV === "h5") {
    // h5 模式
    const canvasDom = document.querySelector(`#${uid.value}`);
    setTimeout(() => {
      chartInstance = echarts.init(canvasDom);
      chartInstance.setOption(data);
    }, 100);
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
      // 优化图表尺寸未获取到情况
      if (!width || !height) {
        let count = 0;
        const doFn = () => {
          count++;
          Taro.createSelectorQuery()
            .select(`.${uid.value}`)
            .fields({
              node: true,
              size: true
            })
            .exec(res => {
              const canvasWidth = res[0].width;
              const canvasHeight = res[0].height;
              if ((!canvasWidth || !canvasHeight) && count < 20) {
                setTimeout(doFn, 100);
              } else {
                chartInstance.resize({
                  width: canvasWidth,
                  height: canvasHeight
                });
                chartInstance.setOption(data);
              }
            });
        };
        doFn();
      } else {
        chartInstance.setOption(data);
      }
      return chartInstance;
    });
  }
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
