export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/ecchart/index",
    "pages/ecchart/line-basic",
    "pages/ecchart/line-smooth",
    "pages/ecchart/line-area",
    "pages/ecchart/line-stack",
    "pages/ecchart/bar-basic",
    "pages/ecchart/bar-negative",
    "pages/ecchart/bar-waterfall",
    "pages/ecchart/bar-stack",
    "pages/ecchart/mix-line-bar",
    "pages/ecchart/pie-basic",
    "pages/ecchart/pie-doughnut",
    "pages/ecchart/pie-roseType",
    "pages/ecchart/pie-nest",
    "pages/ecchart/candlestick-basic",
    "pages/ecchart/scatter-basic",
    "pages/ecchart/radar-basic"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTitleText: "DEMO",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assert/01.png",
        selectedIconPath: "assert/01.png"
      },
      {
        pagePath: "pages/ecchart/index",
        text: "图表列表",
        iconPath: "assert/02.png",
        selectedIconPath: "assert/02.png"
      }
    ]
  }
});
