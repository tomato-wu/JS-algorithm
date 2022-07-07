/*
    函数柯里化实现
    柯里化有什么优点？
    1. 参数复用
    2. 延迟执行
    3. 提高适用性
*/

// 实现 add(1)(2)(3) 输出结果
function add() {
    let args = [].slice.call(arguments)
    console.log('1', args)
    return function() {
        args = args.concat([].slice.call(arguments))
        console.log('2', args)
        return function() {
            args = args.concat([].slice.call(arguments))
            console.log('3', args)
            return args.reduce((prev, next) => prev + next, 0)
        }
    }
}
// console.log(add(1)(2)(3))

// 这样子就实现了一个非常基础简单的 定型的柯里化，但是有很大的问题
// 就是它使用的场景非常单一，不能做到通用 add(1, 2)(3)  add(1)(2, 3) 这样子就不行了


function add1(a, b, c) {
    return a + b + c
}

function currying(fn, ...args) {
    return args.length >= fn.length 
        ? fn(...args)
        : (..._args) => currying(fn, ...args.concat(_args)) 
}

const add2 = currying(add1)

console.log(add2(1, 2)(3))
console.log(add2(1)(2, 3))
console.log(add2(1, 2, 3))
console.log(add2(1)(2)(3))

// 参数复用就体现在这里了，复用了 1, 2 只改变第三个数实现不同场景
const add3 = add2(1)(2)
console.log(add3(5), add3(3))




/*
 请实现一个 add 函数，满足以下功能
 add(1)  1
 add(1)(2)  3
 add(1)(2)(3) 6
 add(1)(2, 3) 6
 add(1, 2)(3) 6
 add(1, 2, 3) 6
*/

function add(a) {
    function sum(b) {
        a = a + b
        return sum
    }
    sum.toString = function() {// 覆盖toString，以为打印函数会自动调用 toString
        return a
    }

    return sum
} // 对于前三个是可以实现的



function add(...num) {
    let res = 0
    num.forEach(item => res += item)

    function ret(...num) {
        num.forEach(item => res += item)
        return ret
    }

    ret.toString = (function() {
        return () => res 
    })()

    return ret
}

console.log(add(1))
console.log(add(1)(2))
console.log(add(1)(2)(3))
console.log(add(1)(2, 3))
console.log(add(1, 2)(3))
console.log(add(1, 2, 3))

// console.log 输出的是一个函数 也就是并不会说自动调用 toString