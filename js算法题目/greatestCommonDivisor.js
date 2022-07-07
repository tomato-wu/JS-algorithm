/**
 * @description 求最大公约数
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */

function greatestCommonDivision1(a, b) {
    if(a < 2|| b < 2) {
        return 1
    }
    let divisor = 2, res = 1
    while(a >= divisor && b >= divisor) {
        if(a % divisor === 0 && b % divisor ===0) {
            res = divisor
        }
        divisor += 1
    }
    return res
}

console.log(greatestCommonDivision1(256, 200));

function greatestCommonDivision2(a, b) {
    if(b === 0) {
        return a
    }
    return greatestCommonDivision1(b, a%b)
}

console.log(greatestCommonDivision1(256, 200));
