const arr = [1, [2, 3, [4, [[5]]]]];

console.log(arr.flat(1));
console.log(arr.flat(2));
console.log(arr.flat(3));
console.log(arr.flat(4));

// depth<=0时，返回的数组和原数组维数一样（注意只是维数一样，空位情况见第3点）
console.log(
  "depth<=0时，返回的数组和原数组维数一样（注意只是维数一样，空位情况见第3点）"
);
console.log(arr.flat(0));

console.log([].concat(...arr));

// 自己实现一个flat扁平化数组
function myflat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log("我的实现");
console.log(myflat(arr));

//https://juejin.cn/post/6998879961935249422


function flattenArray(arr) {
  let result = [];

  arr.forEach(item => {
    if (Array.isArray(item)) {
      // 如果元素是数组，则递归拍平
      result = result.concat(flattenArray(item));
    } else {
      // 否则，直接添加到结果数组中
      result.push(item);
    }
  });

  return result;
}