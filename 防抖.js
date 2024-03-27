// 防抖
// 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

// 防抖（debounce）函数是指在一定时间内，事件被触发多次，只执行最后一次。这在处理诸如输入框实时搜索等场景时非常有用，避免了频繁触发事件导致性能问题。



// const debounce = (func, wait = 500) => {
//   var timer = 0;
//   return function (...args) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, wait);
//   };
// };

// const fn = debounce(() => {
//   console.log(3);
// }, 3000);
// setInterval(fn, 2000);




// const debounce = (func, wait) => {
//     // 创建一个 timeout 变量来保存定时器的引用
//   let timeout;
//   // 返回一个新的函数
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// };

const debounce  =  (Fn, wait) => {
  let timer;
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      Fn.apply(this,args)
    },wait)
  }
}

// 使用示例
const handleSearch = event => {
  console.log("search:", event.target.value);
};

const debouncedSearch = debounce(handleSearch, 300);