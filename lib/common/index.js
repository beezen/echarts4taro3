import * as echarts from "../assets/echarts";
let currentEchartsModule; // 当前 echarts 模块

/** 获取 echarts 模块 */
export function getEcharts() {
  return currentEchartsModule || echarts;
}

/**
 * 加载 echarts 模块
 * @param echartsModule echarts 模块
 */
export function loadEcharts(echartsModule) {
  currentEchartsModule = echartsModule;
}
