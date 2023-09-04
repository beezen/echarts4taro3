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
  if (!echartsModule) return console.error("loadEcharts 未加载到 echarts 模块，保持使用内置模块");
  currentEchartsModule = echartsModule;
}
