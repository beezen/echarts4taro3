<template>
  <view class="bar-chart">
    <e-chart ref="vueref0" canvas-id="bar-canvas" />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import "./index.less";
import { EChart } from "echarts4taro3";

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
      title: {
        text: "深圳月最低生活费组成（单位:元）",
        subtext: "From ExcelHome",
        sublink: "http://e.weibo.com/1341556070/AjQH99che"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function(params) {
          var tar = params[1];
          return tar.name + "\n" + tar.seriesName + " : " + tar.value;
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        splitLine: { show: false },
        data: ["总费用", "房租", "水电费", "交通费", "伙食费", "日用品数"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "辅助",
          type: "bar",
          stack: "总量",
          itemStyle: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)"
          },
          emphasis: {
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            }
          },
          data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
          name: "生活费",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "inside"
          },
          data: [2900, 1200, 300, 200, 900, 300]
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
