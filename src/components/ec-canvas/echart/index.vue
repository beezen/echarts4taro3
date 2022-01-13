<template>
  <canvas v-if="isWeb" :id="uid" class="echart-canvas" />
  <ec-canvas
    v-else
    :ref="uid"
    :canvas-id="canvasId"
    :ec="ec"
    class="echart-canvas"
  />
</template>

<script>
import * as echarts from "../ec-canvas/echarts";
import EcCanvas from "../ec-canvas";

export default {
  name: "BaseChart",
  components: { EcCanvas },
  props: {
    canvasId: {
      type: String,
      default: "",
    },
  },
  data() {
    let uid = `canvas-${Math.floor(Math.random() * 1000000)}`; // 唯一标记
    return {
      uid,
      isWeb: process.env.TARO_ENV === "h5",
      chartInstance: {}, // chart 实例
      ec: {
        lazyLoad: true,
      },
    };
  },
  methods: {
    /** 获取 chart 实例 */
    getChart() {
      return this.chartInstance;
    },
    /** 更新图表数据 */
    setOption(data) {
      this.chartInstance.setOption(data);
    },
    /**
     * 刷新图表
     * 注：节点挂载后才能执行
     */
    refresh(data) {
      if (process.env.TARO_ENV === "h5") {
        // h5 模式
        const canvasDom = document.querySelector(`#${this.uid}`);
        setTimeout(() => {
          const chart = echarts.init(canvasDom);
          this.chartInstance = chart;
          chart.setOption(data);
        }, 100);
      } else {
        // 小程序模式
        this.$refs[this.uid]?.init((canvas, width, height, canvasDpr) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: canvasDpr,
          });
          canvas.setChart(chart);
          chart.setOption(data);
          this.chartInstance = chart;
          return chart;
        });
      }
    },
  },
};
</script>

<style>
.echart-canvas {
  width: 100%;
  height: 100%;
}
</style>
