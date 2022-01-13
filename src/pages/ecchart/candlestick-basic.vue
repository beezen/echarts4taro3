<template>
  <view class="bar-chart">
    <e-chart ref="vueref0" canvas-id="candlestick-canvas" />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import "./index.less";
import { EChart } from "@/components/ec-canvas";

export default {
  name: "Index",
  components: {
    EChart,
  },
  data() {
    return {};
  },
  mounted() {
    const option = {
      xAxis: {
        data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
      },
      yAxis: {},
      series: [
        {
          type: "k",
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42],
          ],
        },
      ],
    };

    Taro.nextTick(() => {
      setTimeout(() => {
        this.$refs.vueref0.refresh(option);
      }, 200);
    });
  },

  methods: {},
};
</script>
