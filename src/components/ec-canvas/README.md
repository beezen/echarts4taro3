# echarts for taro3

基于 Taro 3.x 框架构建的 h5 和微信小程序版本 echarts 跨端组件，及使用示例。

小程序基础库 > 2.9.0

```bash
 Taro CLI 3.3.19 environment info:
    System:
      OS: macOS 11.2.3
      Shell: 5.8 - /bin/zsh
    Binaries:
      Node: 14.16.1 - ~/.nvm/versions/node/v14.16.1/bin/node
      Yarn: 1.22.10 - ~/.nvm/versions/node/v14.16.1/bin/yarn
      npm: 6.14.12 - ~/.nvm/versions/node/v14.16.1/bin/npm
    npmPackages:
      @tarojs/components: 3.3.19 => 3.3.19
      @tarojs/mini-runner: 3.3.19 => 3.3.19
      @tarojs/runtime: 3.3.19 => 3.3.19
      @tarojs/taro: 3.3.19 => 3.3.19
      @tarojs/webpack-runner: 3.3.19 => 3.3.19
      babel-preset-taro: 3.3.19 => 3.3.19
      eslint-config-taro: 3.3.19 => 3.3.19
```

## 项目下载

1、[echarts4taro3](https://github.com/beezen/echarts4taro3)：[Download ZIP](https://github.com/beezen/echarts4taro3/archive/refs/heads/master.zip)

2、Use Git or checkout with SVN using the web URL.

```bash
git clone https://github.com/beezen/echarts4taro3.git
```

## 快速开始

方式一：依赖安装

```bash
yarn add echarts4taro3 -S
```

```javascript
import { EChart } from "echarts4taro3";
```

方式二：可以拷贝项目中 ec-canvas 跨端组件到业务项目中直接使用

```bash
## src 目录下
.
├── components
│   └── ec-canvas # 图表跨端组件
│       ├── ec-canvas
│       └── echart
└── pages # 使用示例
    ├── ecchart
    └── index
```

代码示例如下：

```javascript
<template>
  <view class="bar-chart">
    <e-chart ref="vueref0" canvas-id="bar-canvas" />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { EChart } from "echarts4taro3";
// import { EChart } from "@/components/ec-canvas";
import "./index.less";

export default {
  name: "Index",
  components: {
    EChart,
  },
  data() {
    return {};
  },
  mounted() {
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    Taro.nextTick(() => {
      setTimeout(() => {
        this.$refs.vueref0.refresh(option); // 初始化图表
        setInterval(() => {
          let firstValue = option.series[0].data.shift();
          option.series[0].data.push(firstValue);
          this.$refs.vueref0.setOption(option); // 异步更新图表数据
        }, 2000);
      }, 200);
    });
  },
};
</script>
```

注：因 echarts 本身体积较大，可以根据业务需要在 echarts [官网定制](https://echarts.apache.org/zh/builder.html) `echarts.js`,只需替换 ec-canvas 组件目录中 `echarts.js` 文件即可正常使用。

## 核心 API

> 引入 EChart 组件后，拿到 EChart 组件实例，并调用实例 refresh(option)方法设置图标数据，option 格式参照 echarts [官网](https://echarts.apache.org/examples/zh/index.html)

```javascript
this.$refs.vueref0.refresh(option); // 初始化图表

this.$refs.vueref0.setOption(option); // 异步更新图表数据

this.$refs.vueref0.getChart(); // 获取 echarts 图表实例
```

## 效果图

<img src="https://img.dongbizhen.com/static/echarts_0113.jpeg" width="400" />
<img src="https://img.dongbizhen.com/static/echarts_0113_weapp.jpeg" width="400" />

## 参考资料

- [在微信小程序中使用 Apache ECharts](https://github.com/ecomfe/echarts-for-weixin)
- [echarts-taro3-vue](https://taro-ext.jd.com/plugin/view/5f68a040f71392c040202fd7)
