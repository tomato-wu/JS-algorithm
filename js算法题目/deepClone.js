/**
 * @description 深度拷贝低级版本
 * @description 缺陷： 拷贝循环引用类型、拷贝函数有问题
 */
function deepClone1(obj) {
    return JSON.parse(JSON.stringify(obj))
}

/** 
 * @description 浅拷贝
*/
function deepClone2(obj) {
    const newObj = {}
    for(let i in obj) {
        newObj[i] = obj[i]
    }
    return newObj
}

function isObject(target) {
    const type = typeof target;
    return (target !== null && (type === "object" || type === "function"))
}

function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}

/**
 * @description 深拷贝
 * @param {*} target 
 * @param {*} map 
 * @returns 
 */
function deepClone3(target, map = new WeakMap()) {
    if(isObject(target)) {

        let cloneTarget
        if(getType(target) === "Map") {
            cloneTarget = new Map()
            target.forEach((value, key) => {
                cloneTarget.set(key, deepClone3(value))
            })
            return cloneTarget
        }

        if(getType(target) === "Set") {
            cloneTarget = new Set()
            target.forEach(value => {
                cloneTarget.add(value)
            })
            return cloneTarget
        }
        if(!map.get(target)) {
            return target
        }
        cloneTarget = Array.isArray(target) ? [] : {}
        map.set(target, cloneTarget)
        for(const key in target) {
            cloneTarget[key] = deepClone3(target[key], map)
        }
        return cloneTarget
    }
    return target
}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    filed5: new Set(["hello", 1, 3]),
    file6: new Map([["hello", "world"], [1, 2]])
};
target.target = target;

console.log(deepClone3(target));
console.log(typeof new RegExp("dsa"));