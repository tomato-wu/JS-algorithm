// // 第一版
// function curry1(fn) {
//     let args = [].slice.call(arguments, 1);
//     // 闭包
//     return function() {
//         let newArgs = args.concat([].slice.call(arguments));
//         return fn.apply(this, newArgs)
//     }
// }

// function add(a, b) {
//     return a + b;
// }

// // let addCurry1 = curry1(add, 1, 2);
// // console.log(addCurry1());
// // let addCurry2 = curry1(add, 1);
// // console.log(addCurry2(3));


// // 第二版
// function sub_curry(fn) {
//     let args = [].slice.call(arguments, 1);
//     return function() {
//         return fn.apply(this, args.concat([].slice.call(arguments)));
//     }
// }

// function curry2(fn, length) {
//     length = length || fn.length;   // fn.length为fn的参数长度

//     let slice = Array.prototype.slice;

//     // length此时在这里代表需要的参数个数
//     return function() {
//         // 如果传入的参数个数不满足fn要求
//         if(arguments.length < length) {
//             let combined = [fn].concat(slice.call(arguments));

//             return curry2(sub_curry.apply(this, combined), length - arguments.length);
//         }
//         return fn.apply(this, arguments);
//     }
// }

// const fn2 = curry2(function(a, b, c) {
//     return [a, b, c]
// })

// console.log(fn2("a", "b", "c"));
// console.log(fn2("a", "b")("c"));


function curry(Fn, ...args1) {
    const length1 = args1.length
    return function curried(...args2) {
        const length2 = args2.length
        console.log(args1, args2);
        if(Fn.length <= length1 + length2) {
            return Fn.apply(this, args1.concat(args2))
        } else {
            return curry(Fn, ...args1.concat(args2))
        }
    }
}

const fn3 = curry(function(a, b, c) {
    return [a, b, c]
}, "a", "b")
console.log(fn3("a"));
console.log(fn3("b"));