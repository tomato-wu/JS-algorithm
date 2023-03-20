// 防抖
// 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

const debounce = (func, wait = 500) => {
  var timer = 0;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

const fn = debounce(() => {
  console.log(3);
}, 3000);
setInterval(fn, 2000);
