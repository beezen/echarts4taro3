<template>
  <canvas v-if="isWeb" :id="uid" class="echart-canvas" />
  <ec-canvas
    v-else
    :ref="uid"
    :canvas-id="canvasId"
    :ec="ec"
    :uid="uid"
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
    let uid = `canvas-${Date.now()}-${Math.floor(Math.random() * 10000)}`; // 唯一标记
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
    /** 改变图表尺寸 */
    resize(options) {
      this.chartInstance.resize({
        width: options.width,
        height: options.height,
      });
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
        this.$refs[this.uid].init((canvas, width, height, canvasDpr) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: canvasDpr,
          });
          canvas.setChart(chart);
          this.chartInstance = chart;
          // 优化图表尺寸未获取到情况
          if (!width || !height) {
            let count = 0;
            const doFn = () => {
              count++;
              wx.createSelectorQuery()
                .select(`.${this.uid}`)
                .fields({
                  node: true,
                  size: true,
                })
                .exec((res) => {
                  const canvasWidth = res[0].width;
                  const canvasHeight = res[0].height;
                  if ((!canvasWidth || !canvasHeight) && count < 20) {
                    setTimeout(doFn, 100);
                  } else {
                    chart.resize({
                      width: canvasWidth,
                      height: canvasHeight,
                    });
                    chart.setOption(data);
                  }
                });
            };
            doFn();
            return chart;
          }
          chart.setOption(data);
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
