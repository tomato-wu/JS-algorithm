var array = [1, 2, 1, 1, '1'];


// Array.from去重
function uniques(array){
  return Array.from(new Set(array));   
}

// 简化
function SampleUniques(array){
  return [...new Set(array)]
}
console.log(uniques(array));

// 也可以使用es5中的indexOf方法
function es5Uniques(array){
  let res  = array.filter(function(item,index,array){
    return array.indexOf(item) === index;
  })
  return res;
}

console.log("es5去重");
console.log(es5Uniques(array));