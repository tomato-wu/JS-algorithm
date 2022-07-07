/*
    generator 事例
*/

function* getName() { // * 区别于普通函数
    const name = yield 1 // 1 作为异步返回值
    console.log(name) // next 传参作为上一个 yield 表达式的返回值
    yield 2
    yield 3
}

const iter = getName()  // 返回一个生成器对象
console.log(iter.next()) // { value: 1, done: false }
console.log(iter.next(1)) // { value: 2, done: false }
console.log(iter.next()) // { value: 3, done: false }
console.log(iter.next()) // { value: undefined, done: false }


/* 
    迭代器实现斐波那契数列 
*/

function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (; ;) {
        yield prev; // 0 1 1 2 3 5 8 13 ....
        [prev, curr] = [curr, prev + curr];
    }
}

for (let n of fibonacci()) {// for...of 循环遇到 done: true就会停止遍历且不包含 {done: true} 的数据对象
    if (n > 1000) {
        break;
    }
    console.log(n);
}



/*
    JS 实现 generator 原理
    参考链接：https://zhuanlan.zhihu.com/p/216060145
*/

function* foo() {
    yield 'result1'
    yield 'result2'
    yield 'result3'
}
const gen = foo()
console.log(gen.next()) //{value: "result1", done: false}
console.log(gen.next()) //{value: "result2", done: false}
console.log(gen.next()) //{value: "result3", done: false}
console.log(gen.next()) //{value: undefined, done: true}

// 第一步：基于上面一步一步迭代执行的特性，使用 switch...case 来控制
// const context = {
//     prev: 0,
//     next: 0,
//     done: false,
//     stop() {
//         this.stop = true
//     }
// }
// function gen$(context) {
//     while (1) {
//         switch (context.prev = context.next) {
//             case 0:
//                 context.next = 2 // 保证下一次往下迭代
//                 return 'result1'
//             case 2:
//                 context.next = 4
//                 return 'result2'
//             case 4:
//                 context.next = 6
//                 return 'result3'
//             case 6:
//                 context.stop()
//                 return undefined
//         }
//     }
// }

// 第二步：实现 next方法并返回一个形如 {value: 'xxx', done: xxx}的对象

// var foo = function () {
//     return {
//         next() {
//             return {
//                 value: gen$(context),
//                 done: context.done
//             }
//         },
//     }
// }

// const gen2 = foo()
// console.log(gen2.next())
// console.log(gen2.next())
// console.log(gen2.next())
// console.log(gen2.next())



// 第三步：实现不同生成器函数变量隔离

// class Context {
//     constructor() {
//         this.next = 0
//         this.prev = 0
//         this.done = false
//     }
//     stop() {
//         this.done = true
//     }
// }

// var foo = function () {
//     let context = new Context()
//     return {
//         next(...param) {
//             return {
//                 value: gen$(context),
//                 done: context.done
//             }
//         }
//     }
// }

// const gen2 = foo()
// console.log(gen2.next())
// console.log(gen2.next())
// console.log(gen2.next())
// console.log(gen2.next())


// 第四步：实现参数值的保存（yield的传参）-- 最终版
function gen$(context) {
    let a
    while (1) {
        switch (context.prev = context.next) {
            case 0:
                context.next = 2 // 保证下一次往下迭代
                return 'result1'
            case 2:
                a = context.send ? context.send : a 
                console.log('generator2', a)
                context.next = 4
                return 'result2'
            case 4:
                a = context.send ? context.send : a 
                console.log('generator4', a)
                context.next = 6
                return 'result3'
            case 6:
                context.stop()
                return undefined
        }
    }
}

class Context {
    constructor() {
        this.next = 0
        this.prev = 0
        this.done = false
        this.send = null // 存储 next 传递过来的参数
    }
    stop() {
        this.done = true
    }
}

var foo = function () {
    let context = new Context()
    return {
        next(param) { // generator 的 next 只接受一个参数
            context.send = param
            return {
                value: gen$(context),
                done: context.done
            }
        }
    }
}

const gen2 = foo()
console.log(gen2.next())
console.log(gen2.next('jzy'))
console.log(gen2.next())
console.log(gen2.next())
