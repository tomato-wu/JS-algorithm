// 插入排序
Array.prototype.sortWithInsert = function () {
  const arr = this;
  for(let i = 1; i < arr.length; i++) {
      for(let j = 0; j <= i; j++) {
          if(arr[i] < arr[j]) {
              // 保存a[i]的值
              const temp = arr[i];
              // 后移
              for(let k = j; k < i; i++) {
                  arr[j + 1] = arr[j];
              }
              arr[j] = temp;
          }
      }
  }
  return arr;
}
const arr = [1, 6, 3, 2, 8, 5];

console.log("插入排序",arr.sortWithInsert());