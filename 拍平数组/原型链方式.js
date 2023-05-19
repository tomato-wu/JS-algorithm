// 重写原型上的方法
Array.prototype.newflat = function (n = 1) {
  let arr = this;
  while (n && this.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
    n--;
  }
  return arr;
};
console.log("重写原型上的方法");
console.log([1, 2, [3, 4, [5, [6, [7]]]]].newflat(5));
