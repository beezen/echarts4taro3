const path = require("path");
const alias = require("./alias");
const newAlias = {};
Object.keys(alias).forEach((aliasKey) => {
  newAlias[aliasKey] = `${path.resolve(__dirname, "..", alias[aliasKey])}`;
});

const config = {
  projectName: "echarts4taro3",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  alias: newAlias,
  defineConstants: {},
  framework: "vue",
  mini: {
    compile: {
      exclude: [],
    },
    sourceMapType: "source-map",
    postcss: {
      autoprefixer: {
        enable: false,
        config: {
          browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"],
        },
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "global", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
