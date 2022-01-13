<template>
  <canvas
    type="2d"
    :class="[uid, 'ec-canvas']"
    :canvas-id="canvasId"
    @touchStart="touchStart"
    @touchMove="touchMove"
    @touchEnd="touchEnd"
  />
</template>

<script>
import Taro from "@tarojs/taro";
import WxCanvas from "./wx-canvas";
import * as echarts from "./echarts";

/** 触摸事件包装 */
function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}

export default {
  name: "EcCanvas",
  data() {
    let uid = `ec-canvas-${Math.floor(Math.random() * 1000000)}`;
    return {
      uid
    };
  },
  props: {
    canvasId: {
      type: String,
      default: ""
    },
    ec: {
      type: Object,
      default: null
    }
  },
  mounted() {
    echarts.registerPreprocessor((option) => {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach((series) => {
            series.progressive = 0;
          });
        } else if (typeof option.series === "object") {
          option.series.progressive = 0;
        }
      }
    });
    if (!this.ec) {
      console.warn(
        '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
          'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
      );
      return;
    }
    // 需等组件挂载后才能初始化
    Taro.nextTick(() => {
      setTimeout(() => {
        if (!this.ec.lazyLoad) {
          this.init();
        }
      }, 500);
    });
  },
  methods: {
    /** 初始化图表 */
    init(callback) {
      this.initByNewWay(callback);
    },
    initByNewWay(callback) {
      const query = wx.createSelectorQuery();
      const { ec, canvasId } = this;
      query
        .select(`.${this.uid}`)
        .fields({
          node: true,
          size: true
        })
        .exec((res) => {
          const canvasNode = res[0].node;
          this.canvasNode = canvasNode;
          const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
          const canvasWidth = res[0].width;
          const canvasHeight = res[0].height;
          const ctx = canvasNode.getContext("2d");
          const canvas = new WxCanvas(ctx, canvasId, true, canvasNode);
          echarts.setCanvasCreator(() => {
            return canvas;
          });
          if (typeof callback === "function") {
            this.chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr);
          } else if (typeof ec.onInit === "function") {
            this.chart = ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr);
          }
        });
    },
    canvasToTempFilePath(opt) {
      const query = Taro.createSelectorQuery();
      query
        .select(`.${this.uid}`)
        .fields({
          node: true,
          size: true
        })
        .exec((res) => {
          const canvasNode = res[0].node;
          opt.canvas = canvasNode;
          Taro.canvasToTempFilePath(opt);
        });
    },
    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch("mousedown", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), "start");
      }
    },
    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), "change");
      }
    },
    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.chart.getZr().handler;
        handler.dispatch("mouseup", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch("click", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), "end");
      }
    }
  }
};
</script>

<style>
.ec-canvas {
  width: 100%;
  height: 100%;
}
</style>
