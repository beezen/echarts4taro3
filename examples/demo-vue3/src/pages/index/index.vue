<template>
  <view class="bar-chart">
    <EChart ref="canvas" />
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { EChart, loadEcharts } from "echarts4taro3";
import "./index.less";
loadEcharts(echarts);
const canvas = ref(null);
const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
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

onMounted(() => {
  const echartComponentInstance = canvas.value; // 组件实例
  Taro.nextTick(() => {
    // 初始化图表
    echartComponentInstance.refresh(options).then((myChart) => {
      /** 异步更新图表数据 */
      setInterval(() => {
        let firstValue = options.series[0].data.shift();
        options.series[0].data.push(firstValue);
        myChart.setOption(options); // myChart 即为 echarts 实例，可使用的实例方法，具体可参考 echarts 官网

        // canvas 转图片地址
        // const canvasUid = echartComponentInstance.uid;
        // if (process.env.TARO_ENV === "weapp") {
        //   Taro.createSelectorQuery()
        //     .select(`.${canvasUid}`)
        //     .fields({
        //       node: true,
        //       size: true
        //     })
        //     .exec((res) => {
        //       if (res[0]) {
        //         const canvasNode = res[0].node;
        //         console.log("图片信息：", canvasNode.toDataURL());
        //       }
        //     });
        // } else if (process.env.TARO_ENV === "h5") {
        //   const src = document.querySelector(`.${canvasUid} canvas`).toDataURL();
        //   console.log("图片信息：", src);
        // }
      }, 2000);
    });
  });
});
</script>
