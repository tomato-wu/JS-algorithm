/*
    函数缓存 —— 缓存一个函数的计算结果防止重复计算
*/

function add(a, b) {
    return a + b
}
function memorize(fn, context) {
    const cache = new Map()
    context = context ? context : this
    return function(...args) {
        if(!cache.get(args)) { // 判断当前是否存在缓存
            cache.set(args, fn.apply(context, args))
        }
        return cache.get(args) // 直接返回计算结果
    }
}