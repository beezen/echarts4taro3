let currentEchartsModule; // 当前 echarts 模块

/** 获取 echarts 模块 */
export function getEcharts() {
  if (!currentEchartsModule)
    return console.error("未找到 echarts 模块，请优先使用 loadEcharts 方法加载");
  return currentEchartsModule;
}

/**
 * 加载 echarts 模块
 * @param echartsModule echarts 模块
 */
export function loadEcharts(echartsModule) {
  if (!echartsModule) return console.error("loadEcharts 未加载到 echarts 模块");
  currentEchartsModule = echartsModule;
}
