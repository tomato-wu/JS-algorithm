const arr = [1, 2, 3, 3, 1, 1, 6];

// first method
console.log(Array.from(new Set(arr)));

// 利用对象
function distinctWithObj(arr) {
  const map = {};
  const result = [];
  for (let item of arr) {
    if (!(item in map)) {
      map[item] = 1;
      result.push(item);
    }
  }
  return result;
}
console.log(distinctWithObj(arr));

// 利用indexOf
function distinctWithIndexOf(arr) {
    const result = []
    for(let item of arr) {
        if(result.indexOf(item) === -1) {
            result.push(item)
        }
    }
    return result;
}
console.log(distinctWithIndexOf(arr));