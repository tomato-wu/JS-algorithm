function quickSort(list) {
  //递归终止条件：数组长度为0或1
  if (list.length === 1 || list.length === 0) return list;
  // 取数组中间位置索引以及元素
  let index = Math.floor(list.length / 2);
  let currentItem = list.splice(index, 1);
  // leftList：存储小于中间元素的元素集合
  // rightList：存储大于中间元素的元素集合
  let leftList = [];
  let rightList = [];
  list.forEach(item => {
      if (item <= currentItem) {
          leftList.push(item);
      } else {
          rightList.push(item);
      }
  });
  //打印每一次的流程
  console.log([leftList, currentItem, rightList]);

  return quickSort(leftList).concat(currentItem).concat(quickSort(rightList));
}

let list = [5, 8, 2, 4, 6, 9, 7]
console.log(quickSort(list));
