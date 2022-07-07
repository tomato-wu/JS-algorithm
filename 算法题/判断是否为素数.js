/**
 * @description 判断是否为素数
 * @param {*} num 
 * @returns boolean
 */
function isPrime(num) {
    //  特殊情况具体分析
    if (num === 2 || num === 3) {
        return true
    }
    //   偶数肯定不是素数
    if (num % 2 === 0) {
        return false
    }
    for (let i = 2; i < Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false
        }
    }
    return true

}

console.log(isPrime(23));