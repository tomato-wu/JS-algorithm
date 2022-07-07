/*
    实现一个 trim 方法
*/

// 使用正则表达式
var trim = function(str) {
    // return str.replace(/^\s+/g, '').replace(/\s+$/g, '')
    return str.replace(/^\s+ | \s$/g, '') // 利用 | 连接 多个正则表达式
}

console.log(trim('   abcdefg   '))