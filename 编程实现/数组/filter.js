/*
    数组去重
*/

const nums = [1, 2, 1, 2, 3, 3, 'A', '2', 'a', 'A']

// 借用 ES6 的 Set 结构来实现
var filter = function(nums) {
    return Array.from(new Set(nums))
}

// 借用额外数组空间
var filter = function(nums) {
    let map = new Map(), res = []
    for(let i=0; i<nums.length; i++) {
        if(!map.get(nums[i])) {
            map.set(nums[i], true)
            res.push(nums[i])
        }
    }
    return res
}

// 排序后再去重
var filter = function(nums) {
    const res = []
    let tmp

    nums = nums.sort((a, b) => a - b)
    console.log(nums)
    for(let i=0; i<nums.length; i++) {
        if(i === 0) { res.push(nums[i]); tmp = nums[i] }
        else {
            if(nums[i] === tmp) continue
            else {
                tmp = nums[i]
                res.push(nums[i])
            }
        }
    }
    return res
}


// 针对字母的去重（A 和 a）
var filter = function(nums) {
    const res = []
    let tmp

    nums = nums.sort((a, b) => a - b)
    console.log(nums)
    for(let i=0; i<nums.length; i++) {
        if(typeof nums[i] === 'string') nums[i] = nums[i].toLowerCase() 
        if(i === 0) { res.push(nums[i]); tmp = nums[i] }
        else {
            if(nums[i] === tmp) continue
            else {
                tmp = nums[i]
                res.push(nums[i])
            }
        }
    }
    return res
}

console.log(filter(nums))