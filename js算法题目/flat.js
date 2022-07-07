const arr = [1, [2, 3, [4, [[5]]]]]

console.log(arr.flat(4));
console.log(arr.toString().split(',').map(item => Number(item)));
console.log(arr.flat(Infinity));

/**
 * @description 利用递归和数组合并方法concat实现扁平
 * @param {Any} arr 
 * @returns Array<any>
 */
function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}


console.log(flatten(arr));
