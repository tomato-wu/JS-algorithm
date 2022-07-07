/*
    拍平数组
*/

[1, [2, 3, [4, [[5]]]]].toString() // 1,2,3,4,5 


function flat(arr) {// 比较通俗易懂的方式
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

function flat(arr) {// 递归
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flat(arr[i]))
        } else {
            res.push(arr[i])
        }
    }
    return res
}

// console.log(flat([1, 2, [3, 4, [5, [6, [7]]]]]))
// 上面是比较基础的拍平，未进行传参，比如要拍到多少层


// 重写原型上的方法
Array.prototype.flat = function (n = 1) {
    let arr = this
    while (this.some(item => Array.isArray(item)) && n) {
        arr = [].concat(...arr)
        n--
    }
    return arr
}
console.log([1, 2, [3, 4, [5, [6, [7]]]]].flat(5))


/*
    拍平对象 —— 意思其实和数组是一样的，就是把多层嵌套的对象解绑为单层对象
*/


const obj = {
    a: 1,
    b: [1, 2, { c: true }],
    c: { e: 2, f: 3 },
    g: null,
};
// // 转换为
// let objRes = {
//      a: 1,
//     "b[0]": 1,
//     "b[1]": 2,
//     "b[2].c": true,
//     "c.e": 2,
//     "c.f": 3,
//     g: null,
// };

function flatObject(target) {
    const result = {}

    const flat = (val, item) => {
        if(Object(val) !== val) {// 递归结束条件
            result[item] = val
        } else if(Array.isArray(val)) {//数组
            for(let i=0; i<val.length; i++) {
                flat(val[i], item+'['+i+']')
            }
        } else {//对象
            let isEmpty = false
            for(let key in val) {
                isEmpty = true
                // 判断是否需要继续递归
                flat(val[key], item ? item + '.' + key : key)
            }
            if(isEmpty && item) {
                return {}
            }
        }
    }

    flat(target, '')
    return result
}

console.log(flatObject(obj))

