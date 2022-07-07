/**
 * @description 贪心算法求汽油问题
 * @param {*} num 加一次油能跑的距离
 * @param {*} arr 距离
 * @returns 
 */

function greedy(num, arr) {
    if(num <= 0 || arr.length === 0 || !arr) {
        return 'No Solution'
    }
    let distance = num;
    let count = 0;
    for(let dis of arr) {
        if(dis > num) {
            return 'No Solution'
        }
        if(dis > distance) {
            count += 1
            distance = num - dis
        } else {
            distance -= dis
        }
    }
    return count
}

console.log(greedy(7, [1,2,3,4,5,1,6,6]));