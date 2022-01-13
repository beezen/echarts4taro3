<template>
  <view class="bar-chart">
    <e-chart ref="vueref0" canvas-id="pie-canvas" />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import "./index.less";
import { EChart } from "@/components/ec-canvas";

export default {
  name: "Index",
  components: {
    EChart
  },
  data() {
    return {};
  },
  mounted() {
    const option = {
      tooltip: {
        trigger: "item"
      },
      legend: {
        top: "5%",
        left: "center"
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" }
          ]
        }
      ]
    };
    
    Taro.nextTick(() => {
      
      setTimeout(() => {
        this.$refs.vueref0.refresh(option);
      }, 500);
    });
  },
  
  methods: {}
};
</script>
