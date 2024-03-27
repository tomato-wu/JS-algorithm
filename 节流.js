// 节流
// 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效


// func是用户传入需要防抖的函数
// wait是等待时间
// const throttle = (func, wait = 500) => {
//   // 创建一个变量 lastTime 来保存上次执行 func 的时间
//   let lastTime = 0
//   // 返回一个新的函数
//   return function (...args) {
//     // 当前时间
//     let now = +new Date()
//     // 将当前时间和上一次执行函数时间对比
//     // 如果差值大于设置的等待时间就执行函数
//     if (now - lastTime > wait) {
//       lastTime = now
//       func.apply(this, args)
//     }
//   }
// }

const throttle = (Fn, wait = 500) => {
  let lastTime = 0
  return function (...args) {
    let now = +new Date()
    if (now - lastTime > wait) {
      lastTime = now
      Fn.apply(this,args)
    }
  }
}

const fn = throttle(() => {
  console.log(3);
}, 3000)

setInterval(fn, 2000)

// 适用场景：

// 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
// 缩放场景：监控浏览器resize
// 动画场景：避免短时间内多次触发动画引起性能问题