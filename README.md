# echarts for taro3

![npm](https://img.shields.io/npm/v/echarts4taro3?color=42b883)

`echarts4taro3` 是一个可运行在 Taro3 框架上的 Echarts 跨端组件，满足开发者使用一套 **vue** 或 **vue3** 代码，就让图表流畅的展示于 **H5** 和**小程序端**。

目前已支持的平台包含：**H5**、**微信小程序**、**支付宝小程序**和**字节跳动小程序**。

支持开发者导入自定义 echarts 库。

## 目录

- [快速开始](#快速开始)
  - [组件引用](#组件引用)
  - [基础用法](#基础用法)
  - [进阶用法](#进阶用法)
- [组件实例方法](#组件实例方法)
- [组件效果](#组件效果)
- [注意事项](#注意事项)
- [Demo 下载](#demo-下载)
- [参考资料](#参考资料)

## 快速开始

### 组件引用

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

2、拷贝项目 `/lib` 目录下内容到项目中，可命名为 `echarts4taro3`，业务逻辑中这样引用 `import { EChart } from "@components/echarts4taro3/index.js"`。业务项目结构如下：

```bash
## src 目录下
.
├── components
│   └── echarts4taro3 # 图表跨端组件
│       ├── assets
│       ├── common
│       ├── ec-canvas
│       ├── echart
│       └── index.js
└── pages # 使用示例
    ├── ecchart
    └── index
```

### 基础用法

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
    const echartComponentInstance = canvas.value; // 组件实例
    Taro.nextTick(() => {
      // 初始化图表
      echartComponentInstance.refresh(options).then((myChart) => {
        /** 异步更新图表数据 */
        setInterval(() => {
          let firstValue = options.series[0].data.shift();
          options.series[0].data.push(firstValue);
          myChart.setOption(options); // myChart 即为 echarts 实例，可使用的实例方法，具体可参考 echarts 官网
        }, 2000);
      });
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
        // 初始化图表
        this.$refs.canvas.refresh(options).then((myChart) => {
          /** 异步更新图表数据 */
          setInterval(() => {
            let firstValue = options.series[0].data.shift();
            options.series[0].data.push(firstValue);
            myChart.setOption(options);
          }, 2000);
        });
      });
    }
  };
</script>
```

### 进阶用法

#### 通过 `loadEcharts` 方法导入自定义的 echarts 库

```javascript
import * as echarts from "./assets/echarts"; // 根据需求自定义的 echarts 库
import { EChart, loadEcharts } from "echarts4taro3";
loadEcharts(echarts); // 给组件导入自定义的 echarts 库
```

#### 通过 `setOption` 方法动态改变 echarts 数据

```javascript
let myChart;
onMounted(() => {
  const echartComponentInstance = canvas.value;
  Taro.nextTick(() => {
    echartComponentInstance.refresh(options).then((myChartInstance) => {
      myChart = myChartInstance;
    });
  });
});

// ...
// 点击设置图表数据
function handleSetOptions(data) {
  myChart.setOption(data);
}
```

#### 通过 `getOption` 方法获取当前实例的配置信息

```javascript
let myChart;
onMounted(() => {
  const echartComponentInstance = canvas.value;
  Taro.nextTick(() => {
    echartComponentInstance.refresh(options).then((myChartInstance) => {
      myChart = myChartInstance;
    });
  });
});

// ...
// 点击获取图表数据
function handleGetOptions() {
  console.log(myChart.getOption());
}
```

#### 通过 `getChart` 直接获取当前图表实例

```javascript
onMounted(() => {
  const echartComponentInstance = canvas.value;
  Taro.nextTick(() => {
    echartComponentInstance.refresh(options);
  });
});

// ...
// 点击获取图表 echarts 实例
function handleGetEcharts() {
  const echartComponentInstance = canvas.value;
  const myChart = echartComponentInstance.getChart();
  console.log(myChart);
  // 后续可进行相关 echarts 操作
  // myChart.setOption(data);
  // myChart.resize(data);
}
```

## 组件实例方法

> 引入 EChart 组件后，拿到 EChart 组件实例，并调用实例 refresh(options)方法设置图表数据。具体可参考官方 [options 配置项](https://echarts.apache.org/zh/option.html)和[Demo 示例](https://echarts.apache.org/examples/zh/index.html)。

### 示例

```vue3
<template>
  <EChart ref="canvas" />
</template>

<script setup>
// ...

onMounted(() => {
  const echartComponentInstance = canvas.value; // 组件实例
  Taro.nextTick(() => {
      echartComponentInstance.refresh(options); // 初始化图表
  });

  // ...
  setTimeout(()=>{
    echartComponentInstance.setOption(options); // 异步更新图表数据，需要等 refresh 方法实例化完成
  },200)
});
</script>
```

### 方法

| 方法      | 参数                                                                | 描述                                                                                                                      |
| --------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| refresh   | ([options](https://echarts.apache.org/zh/option.html) ,[callback] ) | 创建一个 echarts 实例，返回 echartsInstance                                                                               |
| setOption | ([options](https://echarts.apache.org/zh/option.html) )             | 设置图表实例的配置项以及数据，所有参数和数据的修改都可以通过 setOption 完成，echarts 会合并新的参数和数据，然后刷新图表。 |
| resize    | (resizeOptions)                                                     | 改变图表尺寸，在容器大小发生改变时需要手动调用。                                                                          |
| getChart  | 无                                                                  | 获取图表 echarts 实例，来完成更多自定义效果                                                                               |

【参数解释】

1. `options`: echarts 配置项，可参考官网[options 配置项](https://echarts.apache.org/zh/option.html)

2. `resizeOptions`: 尺寸属性，有下面几个属性：

- `width` 可显式指定实例宽度，单位为像素。
- `height` 可显式指定实例高度，单位为像素。

## 组件效果

<img src="https://img.dongbizhen.com/blog/202302091707.png" width="400" />

## 注意事项

对于网页加载速度或者微信小程序包体积大小有要求的，可以做如下调整：

1、因为 echarts 图表库本身体积相对较大，所以开发者可以根据业务需要在 echarts [官网定制](https://echarts.apache.org/zh/builder.html) `echarts.js`，然后通过 `loadEcharts` 方法动态导入，或者替换 lib/assets 目录中 `echarts.js` 文件也可正常使用。

2、在微信小程序中对于应用体积有严格的限制要求，开发者可以通过[分包](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html)技术对应用进行拆分。

3、组件初始化 `refresh` 方法需要在页面组件节点挂载完成后才能调用。

## Demo 下载

方式一：直接下载 echarts4taro3：[Download ZIP](https://github.com/beezen/echarts4taro3/archive/refs/heads/master.zip)

方式二：Use Git or checkout with SVN using the web URL.

```bash
git clone https://github.com/beezen/echarts4taro3.git
```

在 `examples/` 目录下存在相关功能实现示例：

- [vue2 demo](https://github.com/beezen/echarts4taro3/tree/master/examples/demo-vue2)
- [vue3 demo](https://github.com/beezen/echarts4taro3/tree/master/examples/demo-vue3)

快速运行

```bash
# 在对应的 demo 根目录下执行

$ yarn # 安装依赖

$ yarn dev:weapp # 运行微信小程序
$ yarn dev:h5 # 运行 H5
```

## 参考资料

- [在微信小程序中使用 Apache ECharts](https://github.com/ecomfe/echarts-for-weixin)
- [echarts-taro3-vue](https://taro-ext.jd.com/plugin/view/5f68a040f71392c040202fd7)
- [echarts 官网](https://echarts.apache.org/zh/index.html)
