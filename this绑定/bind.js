const obj = {
  name: "11",
  fun() {
    console.log(this.name);
  },
};

Function.prototype._bind = function (ctx, ...args) {
  // 获取函数体
  const _self = this;
  // 用一个新函数包裹，避免立即执行
  const bindFn = (...reset) => {
    return _self.call(ctx, ...args, ...reset);
  };
  return bindFn;
};
const obj2 = { name: "22" };
obj.fun(); // 11
const fn = obj.fun.bind(obj2);
const fn2 = obj.fun._bind(obj2);
fn(); // 22
fn2(); // 22
