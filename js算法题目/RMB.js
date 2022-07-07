/**
 * @description 按照人民币的方式排列
 * @param {*} num 
 * @returns 
 */

function RMB(num) {
    const num_reverse = String(num).split("").reverse()
    const result_reverse = []
    num_reverse.forEach((item, index) => {
        result_reverse.push(item)
        if ((index + 1) % 3 === 0) {
            result_reverse.push(',')
        } 
    })
    return result_reverse.reverse().join("")
}

console.log(RMB(12345675454528));