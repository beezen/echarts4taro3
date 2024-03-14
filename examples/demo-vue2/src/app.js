import Vue from "vue";
import "./app.less";
import * as echarts from "echarts4taro3/lib/assets/echarts";
import { loadEcharts } from "echarts4taro3";
loadEcharts(echarts);

const App = {
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h("block", this.$slots.default);
  }
};

export default App;
