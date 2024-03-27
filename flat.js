const arr = [1, 2, [3, 4, [5, 6]]];

function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = arr.flatMap((item) => item);
  }
  return arr;
}

const flattened = flatten(arr); // [1, 2, 3, 4, 5, 6]