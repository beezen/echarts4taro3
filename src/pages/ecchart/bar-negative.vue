<template>
  <view class="bar-chart">
    <e-chart ref="vueref0" canvas-id="bar-canvas" />
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
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ["热度", "正面", "负面"]
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          axisLabel: {
            color: "#666"
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: [
            "汽车之家",
            "今日头条",
            "百度贴吧",
            "一点资讯",
            "微信",
            "微博",
            "知乎"
          ],
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          axisLabel: {
            color: "#666"
          }
        }
      ],
      series: [
        {
          name: "热度",
          type: "bar",
          label: {
            normal: {
              show: true,
              position: "inside"
            }
          },
          data: [300, 270, 340, 344, 300, 320, 310],
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        },
        {
          name: "正面",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true
            }
          },
          data: [120, 102, 141, 174, 190, 250, 220],
          itemStyle: {
            // emphasis: {
            //   color: '#32c5e9'
            // }
          }
        },
        {
          name: "负面",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "left"
            }
          },
          data: [-20, -32, -21, -34, -90, -130, -110],
          itemStyle: {
            // emphasis: {
            //   color: '#67e0e3'
            // }
          }
        }
      ]
    };
    const defaultOption = {
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
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)"
          }
        }
      ]
    };
    Taro.nextTick(() => {
      setTimeout(()=>{
        this.$refs.vueref0.refresh(option);
      }, 500)
    });
  },
  methods: {}
};
</script>
