const arr = [1, [2, 3, [4, [[5]]]]]

console.log(arr.flat(1));
console.log(arr.flat(2));
console.log(arr.flat(3));
console.log(arr.flat(4));

// depth<=0时，返回的数组和原数组维数一样（注意只是维数一样，空位情况见第3点）
console.log("depth<=0时，返回的数组和原数组维数一样（注意只是维数一样，空位情况见第3点）");
console.log(arr.flat(0));

console.log([].concat(...arr));

// 自己实现一个flat扁平化数组
function myflat(arr){
  while(arr.some(item=>Array.isArray(item))){
      arr = [].concat(...arr)
  }
  return arr;
}
console.log("我的实现");
console.log(myflat(arr));

// 重写原型上的方法
Array.prototype.newflat = function(n=1){

  let arr = this;
  while(n && this.some(item=>Array.isArray(item))){
    arr = [].concat(...arr);
    n--;
  }
  return arr;
}
console.log("重写原型上的方法");
console.log([1, 2, [3, 4, [5, [6, [7]]]]].newflat(5))


// 使用reduce方法拍平数组
function FlatReduce(arr){
  return arr.reduce((pre,cur) => {
    return pre.concat(Array.isArray(cur)?FlatReduce(cur):cur)
  },[])
}