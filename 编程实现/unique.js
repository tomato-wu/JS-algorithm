/*
    数组去重 https://github.com/mqyqingfeng/Blog/issues/27
*/

// 暴力破解法
var unique = function(arr) {
    if(arr.length <= 1) { return arr }
    const res = [arr[0]]
    for(let i=1; i<arr.length; i++) {
        let j
        // 可以使用 indexof，甚至是 res.includes(res[i])来进行改进（兼容性就没有这么好了）
        for(j=0; j<res.length; j++) {
            if(res[j] === arr[i]) {// 当前元素已存在
                break
            }
        }
        j === res.length && res.push(arr[i])
    }
    return res
}


// 哈希表去重
var unique = function(arr) {
    
}

var array = [1, 1, '1', '1'];
console.log(unique(array))