// 面试问题，函数有没有__proto__属性
// 这个其实是有的，函数都是由Function原生构造函数创建的，所以函数的__proto__属性指向Function的prototype属性

let fn = function () {

}

fn.__proto__ = Function.prototype