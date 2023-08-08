<template>
  <canvas
    type="2d"
    :class="[uid, 'ec-canvas']"
    @touchStart="touchStart"
    @touchMove="touchMove"
    @touchEnd="touchEnd"
  />
</template>

<script setup>
import Taro from "@tarojs/taro";
import { onMounted } from "vue-demi";
import { getEcharts } from "../common/index";
import WxCanvas from "./wx-canvas";

let echarts = getEcharts(); // 获取 echarts 模块
const props = defineProps({
  uid: {
    type: String,
    default: ""
  }
});
let chartInstance; // 当前图表实例

onMounted(() => {
  if (process.env.TARO_ENV === "h5") return;
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
});

/**
 * 初始化小程序 canvas 组件，回调相关属性参数给 echarts
 */
function init(callback) {
  const query = Taro.createSelectorQuery();
  const { uid } = props;
  let count = 0;
  const loopAction = () => {
    count++;
    query
      .select(`.${uid}`)
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        if (!res[0]) {
          console.error("未查询到已加载的 canvas 节点；请在 nextTick 中执行 refresh 方法");
          return;
        }
        const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
        const canvasNode = res[0].node;
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;
        if ((!canvasWidth || !canvasHeight) && count <= 50) {
          setTimeout(loopAction, 60);
          return;
        }
        if (count > 50) {
          console.warn("canvas 节点的宽或高为 0，可能无法正常渲染");
        }
        const ctx = canvasNode.getContext("2d");
        const wxCanvas = new WxCanvas(ctx, true, canvasNode);
        echarts.setCanvasCreator(() => {
          return wxCanvas;
        });
        if (typeof callback === "function") {
          chartInstance = callback(wxCanvas, canvasWidth, canvasHeight, canvasDpr);
        }
      });
  };
  Taro.nextTick(() => {
    loopAction();
  });
}

/** 触摸事件包装 */
function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}
// #region 触摸事件
function touchStart(e) {
  if (chartInstance && e.touches.length > 0) {
    var touch = e.touches[0];
    var handler = chartInstance.getZr().handler;
    handler.dispatch("mousedown", {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    });
    handler.dispatch("mousemove", {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    });
    handler.processGesture(wrapTouch(e), "start");
  }
}

function touchMove(e) {
  if (chartInstance && e.touches.length > 0) {
    var touch = e.touches[0];
    var handler = chartInstance.getZr().handler;
    handler.dispatch("mousemove", {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    });
    handler.processGesture(wrapTouch(e), "change");
  }
}
function touchEnd(e) {
  if (chartInstance) {
    const touch = e.changedTouches ? e.changedTouches[0] : {};
    var handler = chartInstance.getZr().handler;
    handler.dispatch("mouseup", {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    });
    handler.dispatch("click", {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    });
    handler.processGesture(wrapTouch(e), "end");
  }
}
// #endregion

// 对外暴露方法
defineExpose({
  init //
});
</script>

<style>
.ec-canvas {
  width: 100%;
  height: 100%;
}
</style>
