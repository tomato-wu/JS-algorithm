/**
 * @description 判断是否为素数
 * @param {*} num 
 * @returns boolean
 */
function isPrime(num) {
    if(num === 2 || num === 3) {
        return true
    } 
    if(num % 2 === 0) {
        return false
    }
    let divisor = 3
    // 一个数若可以进行因数分解，那么分解时得到的两个数一定是一个小于等于sqrt(n)，一个大于等于sqrt(n)
    let limit = Math.sqrt(num)
    // 
    while(limit >= divisor) {
        if(num % divisor === 0) {
            return false
        } 
        divisor += 2
    }
    return false
}

console.log(isPrime(23));