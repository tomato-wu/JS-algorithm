const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattenedArray = nestedArray.reduce(
  (accumulator, currentValue) => accumulator.concat(currentValue),
  []
);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]

// 使用reduce方法拍平数组
function FlatReduce(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? FlatReduce(cur) : cur);
  }, []);
}
