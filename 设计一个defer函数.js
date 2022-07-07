// 设计一个defer函数， 实现defer(30).then(res => {
//   //30秒后执行
// })

// 
function defer(ms) {
  return new Promise(res => setTimeout(() => res(), ms))
}

defer(4000).then(() => {
  console.log('哈哈哈');
})