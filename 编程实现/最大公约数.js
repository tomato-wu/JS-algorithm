/*
    求最大公约数
    1. 辗转相除法
    2. 更相减损法
    3. 普通解法
*/


// 辗转相除法
function greatestCommonDivisor(a, b) {
    if(b == 0) {
        return a
    }
    return greatestCommonDivisor(b, a % b)
}

// 更相减损法
function greatestCommonDivisor2(a, b) {
    if(a > b) {
        a -= b
    } else if(a < b) {
        b -= a
    } else {
        return a
    }
}

// 普通解法