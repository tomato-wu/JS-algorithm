/**
 * @description 判断数组中是否有两者之和
 */

function sumFind(arr, num) {
    for(let i=0; i<arr.length-1; i++) {
        let temp = arr[i]
        if(arr.slice(i).some(item => temp + item === num)) {
            return true
        }
    }
    return false
}

console.log(sumFind([6,4,4,1,1,7], 9)); 