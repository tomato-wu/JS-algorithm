/**
 * @description 斐波那契，使用递归，计算量大但简单
 * @param {*} num 
 * @returns 
 */
function Fibonacci(num) {
    if(num <= 1) {
        return num
    }
    return Fibonacci(num - 2) + Fibonacci(num - 1)
}

/**
 * @description 改进版本，时间复杂度为n
 * @param {*} num 
 * @returns 
 */
function Fibonacci2(num) {
    if(num <= 1) {
        return num
    }
    let priv = 0
    let next = 1
    let index = 1
    let temp
    while(index < num) {
        index += 1
        temp = next
        next = next + priv
        priv = temp
    }
    return next
}

console.log(Fibonacci2(100));
console.log(Fibonacci(40));
