import { createApp } from "vue";
import "./app.less";
import * as echarts from "echarts4taro3/lib/assets/echarts"; // 这里用了内置的，也可以用自定义的 echarts.js
import { loadEcharts } from "echarts4taro3";
loadEcharts(echarts);

const App = createApp({
  onShow(options) {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

export default App;
