// 支付宝小程序兼容
if (process.env.TARO_ENV === "alipay") {
  Object.defineProperty(Object.prototype, "wx", {
    enumerable: false,
    value: my
  });
}
