/*
    大数相加的意思是超过 JS 存放数据的安全范围（一般指的是数字）的数字进行相加
*/

console.log(Number.MAX_SAFE_INTEGER) //9007199254740991
console.log(Number.MIN_SAFE_INTEGER) //-9007199254740991

// 9007199254740991 + 1234567899999999999

let a = "9007199254740991", b = '1234567899999999999'

function add(a, b) {
    // 位数补全
    const MAX_LEN = Math.max(a.length, b.length)

    // padStart() 方法用于从字符串左侧填充 0
    a = a.padStart(MAX_LEN, 0)
    b = b.padStart(MAX_LEN, 0)

    let flag = 0 // 进位标志
    let str = '', j = MAX_LEN-1

    while(j >= 0) {
        let res = Number(a[j]) + Number(b[j]) + flag
        flag = res >= 10 ? 1 : 0
        res = res % 10
        str = res + str
        j--
    }

    // 处理最高位溢出
    if(flag === 1) {//增加多一位
        str = '1' + str
    }

    return str
}

// 正确结果：1243575099254740990
// 输出答案：1243575099254740990
console.log(add(a, b))