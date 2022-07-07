// 最简单的 currying 实现
// 当然这并不考虑一些 this 指向的问题
const currying = function(fn, ...args) {
    if(args.length >= fn.length) {
        return fn(...args)
    }

    return function(...args2) {
        return currying(fn, ...args, ...args2)
    } 
}

var fn = currying(function(a, b, c) {
    console.log([a, b, c])
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]
