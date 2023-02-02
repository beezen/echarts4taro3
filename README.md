# echarts for taro3

可运行在 Taro3 上的 Echarts 跨端组件，一套代码可同时运行于 h5 端和小程序端，支持 vue 和 vue3 语法。

由于各个平台小程序兼容问题，目前已支持的有微信小程序，支付宝小程序，字节跳动小程序。

## 目录

- [快速开始](#快速开始)
- [核心 API](#核心-api)
- [组件效果](#组件效果)
- [注意事项](#注意事项)
- [Demo 下载](#demo-下载)
- [参考资料](#参考资料)

## 快速开始

### 引用组件

#### 方式一：npm 安装引用（强烈推荐）

1、下载依赖

```bash
yarn add echarts4taro3 -S
```

2、项目引用

```javascript
import { EChart } from "echarts4taro3";
```

#### 方式二：拷贝引用（注：需要开发者主动兼容 vue 和 vue3）

1、下载组件：[点击下载](https://github.com/beezen/echarts4taro3/archive/refs/heads/master.zip)

2、拷贝项目 /src/components 下 `echarts4taro3` 跨端组件，到业务项目中引用

```bash
## src 目录下
.
├── components
│   └── echarts4taro3 # 图表跨端组件
│       ├── ec-canvas
│       └── echart
└── pages # 使用示例
    ├── ecchart
    └── index
```

### 使用组件

#### vue3 语法，代码示例如下：

```html
<template>
  <view class="bar-chart ">
    <EChart ref="canvas" />
  </view>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import Taro from "@tarojs/taro";
  import { EChart } from "echarts4taro3";
  import "./index.less";

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
    const echartInstance = canvas.value;
    Taro.nextTick(() => {
      echartInstance.refresh(options); // 初始化图表
      /** 异步更新图表数据 */
      setInterval(() => {
        let firstValue = options.series[0].data.shift();
        options.series[0].data.push(firstValue);
        echartInstance.setOption(options);
      }, 2000);
    });
  });
</script>
```

#### vue 语法，代码示例如下：

```html
<template>
  <view class="bar-chart">
    <e-chart ref="canvas" />
  </view>
</template>

<script>
  import Taro from "@tarojs/taro";
  import { EChart } from "echarts4taro3";
  import "./index.less";

  export default {
    name: "Index",
    components: {
      EChart
    },
    data() {
      return {};
    },
    mounted() {
      let options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
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

      Taro.nextTick(() => {
        this.$refs.canvas.refresh(options); // 初始化图表
        /** 异步更新图表数据 */
        setInterval(() => {
          let firstValue = options.series[0].data.shift();
          options.series[0].data.push(firstValue);
          this.$refs.canvas.setOption(options);
        }, 2000);
      });
    }
  };
</script>
```

## 核心 API

> 引入 EChart 组件后，拿到 EChart 组件实例，并调用实例 refresh(options)方法设置图表数据。具体可参考官方 [options 配置项](https://echarts.apache.org/zh/option.html)和[Demo 示例](https://echarts.apache.org/examples/zh/index.html)。

### 基础使用

```javascript
// ...
// echartInstance 为 echart 组件实例

echartInstance.refresh(options); // 初始化图表

echartInstance.setOption(options); // 异步更新图表数据
```

### 方法

| 方法      | 参数                                                 | 描述                                                                                                                                |
| --------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| refresh   | [options](https://echarts.apache.org/zh/option.html) | 创建一个 ECharts 实例，返回 echartsInstance                                                                                         |
| setOption | [options](https://echarts.apache.org/zh/option.html) | 设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过 setOption 完成，ECharts 会合并新的参数和数据，然后刷新图表。 |
| resize    | resizeOptions                                        | 改变图表尺寸，在容器大小发生改变时需要手动调用。                                                                                    |
| getChart  | 无                                                   | 获取图表实例                                                                                                                        |

【参数解释】

1. `options`: echarts 配置项，可参考官网[options 配置项](https://echarts.apache.org/zh/option.html)

2. `resizeOptions`: 尺寸属性，有下面几个属性：

- `width` 可显式指定实例宽度，单位为像素。
- `height` 可显式指定实例高度，单位为像素。

## 组件效果

<img src="https://img.dongbizhen.com/static/echarts_0113.jpeg" width="400" />
<img src="https://img.dongbizhen.com/static/echarts_0113_weapp.jpeg" width="400" />

## 注意事项

对于网页加载速度或者微信小程序包体积大小有要求的，可以做如下调整：

1、因为 echarts 图表库本身体积相对较大，所以开发者可以根据业务需要在 echarts [官网定制](https://echarts.apache.org/zh/builder.html) `echarts.js`，只需替换 ec-canvas 组件目录中 `echarts.js` 文件即可正常使用。

2、在微信小程序中对于应用体积有严格的限制要求，开发者可以通过[分包](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html)技术对应用进行拆分。

## Demo 下载

方式一：直接下载 echarts4taro3：[Download ZIP](https://github.com/beezen/echarts4taro3/archive/refs/heads/master.zip)

方式二：Use Git or checkout with SVN using the web URL.

```bash
git clone https://github.com/beezen/echarts4taro3.git
```

## 参考资料

- [在微信小程序中使用 Apache ECharts](https://github.com/ecomfe/echarts-for-weixin)
- [echarts-taro3-vue](https://taro-ext.jd.com/plugin/view/5f68a040f71392c040202fd7)
- [echarts 官网](https://echarts.apache.org/zh/index.html)
