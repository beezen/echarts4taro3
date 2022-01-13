<template>
  <view>
    折线图
    <navigator class="item" url="/pages/ecchart/line-basic"
      ><button>基础折线图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/line-smooth"
      ><button>平滑折线图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/line-area"
      ><button>基础面积图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/line-stack"
      ><button>堆叠折线图</button></navigator
    >
    柱状图
    <navigator class="item" url="/pages/ecchart/bar-basic"
      ><button>基础柱状图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/bar-waterfall"
      ><button>瀑布图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/bar-negative"
      ><button>正负条形图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/bar-stack"
      ><button>堆叠柱状图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/mix-line-bar"
      ><button>折柱混合</button></navigator
    >
    饼图
    <navigator class="item" url="/pages/ecchart/pie-basic"
      ><button>基础饼图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/pie-doughnut"
      ><button>环形图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/pie-roseType"
      ><button>南丁格尔玫瑰图</button></navigator
    >
    <navigator class="item" url="/pages/ecchart/pie-nest"
      ><button>嵌套环形图</button></navigator
    >
    K线图
    <navigator class="item" url="/pages/ecchart/candlestick-basic"
      ><button>基础K线图</button></navigator
    >
    散点图
    <navigator class="item" url="/pages/ecchart/scatter-basic"
      ><button>基础散点图</button></navigator
    >
    雷达图
    <navigator class="item" url="/pages/ecchart/radar-basic"
      ><button>基础雷达图</button></navigator
    >
  </view>
</template>

<script>
import "./index.less";

export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
