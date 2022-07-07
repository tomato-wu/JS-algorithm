/**
 * 二分搜索模版
 * @param {*} list - 需要二分搜索的列表
 * @param {*} left - 一般从 0开始
 * @param {*} right - 一般是数组的长度
 * @param {*} keyword - 指定关键字进行二分搜素
 */

function binarySearch(list, left, right, keyword) {
  //当left>right时，就没找到，结束
  if (left > right) {
    return -1
  }

  let mid = Math.floor((left + right) / 2);
  let midVal = list[mid];

  if (keyword > midVal) {
    //向右递归
    return binarySearch(list, mid + 1, right, keyword);
  } else if (keyword < midVal) {
    //向左递归
    return binarySearch(list, left, mid - 1, keyword);
  } else {
    return mid;
  }
}