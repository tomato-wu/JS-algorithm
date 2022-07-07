/**
 * @description 数组去重
 */

function removeDuplicate1(arr) {
    return Array.from(new Set(arr))
}

function removeDuplicate2(arr) {
    const arr1 = []
    for(let i of arr) {
        if(!arr1.includes(i)) {
            arr1.push(i)
        }
    }
    return arr1
}

function removeDuplicate3(arr) {
    const obj = {}
    for(let i in arr) {
        // 元素值作为obj的键，索引作为值
        if(!(arr[i] in obj)) {
            obj[arr[i]] = i
        }
    }
    return Object.values(obj).map(item => arr[item])
}

const arr = [1,3,'hello',3,1,5,'hello',7,8,1]
console.log(removeDuplicate1(arr));
console.log(removeDuplicate2(arr));
console.log(removeDuplicate3(arr));

function removeDuplicateChar(str) {
    return Array.from(new Set(str.split(""))).join("")
}

console.log(removeDuplicateChar('dasdklsajdksadjasdxx'));