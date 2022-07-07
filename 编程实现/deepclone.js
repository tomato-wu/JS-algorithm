/*
    深度克隆 
    我理解的深度克隆是包括数组和对象，但好像现在所讲的深克隆都是从对象的角度展开
*/


/*
    这种方式较为常用，但是不能处理循环引用、函数、symbol、undefined等等情况
*/
// JSON.parse(JSON.stringify())


function shallowClone(obj) {// 浅克隆
    const newObj = Object({})

    for (let key in obj) {
        newObj[key] = obj[key]
    }

    return newObj
}

const obj = {
    a: 'hello world',
    b: {
        a: 'jzyismylover'
    }
}

// const newObj = shallowClone(obj)
// obj.a = 'hahah'
// obj.b.a = 'hahah'
// console.log(newObj) // a:'hello world', b: {a: 'hahah'}
// 所以这就是浅克隆的缺陷，对基本的数据类型没问题，但是一旦嵌套了引用类型的数据
// 源数据改变，克隆后的数据也将改变


// 基础版本
function deepClone(target, map = new WeakMap()) {
    if (typeof target === 'object') {// 引用类型才需要深克隆
        let newObj = Array.isArray(target) ? [] : Object({}) // 处理数组 & 对象

        // 处理循环引用导致调用栈溢出
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, newObj)

        for (let key in target) {
            // 递归去遍历
            newObj[key] = deepClone(target[key], map)
        }
        return newObj
    } else { // 基础类型不需要克隆
        return target
    }
}

// 初级版本
function deepClone(obj, map = new WeakMap()) {
    // 1. 排除非对象；null；undefined
    if (obj == null || typeof obj !== 'object') {
        return obj
    }

    // 
    if(obj instanceof Date) { return new Date(obj) }
    if(obj instanceof RegExp) { return new RegExp(obj) }

    const res = new obj.constructor() // 指向当前的构造函数

    // 4. 解决循环引用
    if(map.get(obj)) {
        return map.get(obj)
    }
    map.set(obj, res)


    for (let key in obj) {
        // 2/3. 递归拷贝
        res[key] = deepClone(obj[key], map)
    }
    return res
}


// 进阶版本（处理更多类型Map、Set 等等）
function deepClone(obj, map = new WeakMap()) {
    const type = typeof obj, toString = Object.prototype.toString
    if(type == null || (type !== 'object' && type !== 'function')) {
        return obj
    }

    const target = new obj.constructor()
    if(map.get(obj)) {
        return map.get(obj)
    }
    map.set(obj, target)

    if(toString.call(obj) === '[object Set]') {// 处理Set结构
        obj.forEach((value) => { // 遍历里面所有的元素
            target.add(deepClone(value, map))
        })
        return target
    }

    if(toString.call(obj) === '[object Map]') {// 处理 Map 结构
        for(let key of obj.keys()) { // 遍历里面所有的元素
            target.set(key, deepClone(obj.get(key), map))
        }
        return target
    }

    for(let item in obj) {
        target[item] = deepClone(obj[item], map)
    }

    return target
}




var target = {
    field1: 1,
    field2: undefined, // JSON.stringify() 会忽略
    field3: 'ConardLi',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    },
    field5: [2, 4, 8],
    field6: function() {
        console.log('hello world')
    }, 
    field7: new Map().set(1, { jzy: 'keep' }),
    field8: new Set().add({ jzy: '好困噢 但是要keep住' })
}
// 测试循环引用
target.target = target
let res = deepClone(target)
console.log('==测试循环引用==', res)

// 测试递归拷贝
target.field4.child2.child2 = 'jzyismylover'  // 测试递归对象
target.field5[0] = 1   // 测试递归数组
target.field7.get(1).jzy = '真的要keep住' // 测试 map
for(let item of target.field8.keys()) {  // 测试 Set
    item.jzy = 'you can do it'
}
console.log('===测试递归对象===', target.field4.child2)
console.log('===新值测试递归对象===', res.field4.child2)
console.log('===测试递归数组===', target.field5)
console.log('===新值测试递归数组===', res.field5)
console.log('===测试 map===', target.field7)
console.log('===新值测试 map===', res.field7)
console.log('===测试 Set===', target.field8)
console.log('===新值测试 Set===', res.field8)