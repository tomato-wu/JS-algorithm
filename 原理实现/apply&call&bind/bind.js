// 基于 es5 去实现
Function.prototype._call = function(obj) {
    obj = obj ? Object(obj) : window
    obj.fn = this

    const args = []
    for(let i=1; i< arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }

    const res = eval('obj.fn(' + args + ')')
    delete obj.fn

    return res
}

// 基于 es6 去实现
Function.prototype._call_next = function(obj) {
    obj = obj ? Object(obj) : window
    obj.fn = this

    const args = [...arguments].slice(1)

    const res = args.length ? obj.fn(...args) :  obj.fn()
    delete obj.fn
    return res
}

function getName(age, sex) {
    return this.name + ' ' + age + ' ' + sex
}
const obj5 = {
    name: 'jzy'
}

// console.log(getName._call(obj5, 20, '男'))

Function.prototype._apply = function(obj) {
    obj = obj ? Object(obj) : window
    obj.fn = this

    const args = arguments[1]

    let result 
    args.length ? result = obj.fn(...args) : result = obj.fn()

    delete obj.fn
    return result
}
// console.log(getName._apply(obj5, [20, 'male']))

Function.prototype._bind = function(obj) {
    /*
        1. 改变 this 指向
        2. 实现柯里化传参
        3. 解决 new 问题
    */

    // 处理非函数的情况
    if(Object.prototype.toString.call(this) !== '[object Function]') {
        throw new Error('TypeError: obj is not a function')
    }
    const fn = this // 原函数
    const args = Array.prototype.slice.call(arguments, 1)

    const tmp = function() {
        console.log('this:', this) // 如果是使用 new => this 指向的是 fn 生成的实例
        const real_this = this.constructor === fn ? this : obj 
        fn.apply(real_this, args.concat(Array.prototype.slice.call(arguments)))
    }   
    // 修改原型 使得原函数原型链上的东西能够被继承
    function _void() {}
    _void.prototype = fn.prototype
    tmp.prototype = new _void()
    return tmp
}

var z = 0;
var obj6 = {
    z: 1
};

function fn(x, y) {
    this.name = '听风是风';
    console.log(this.z);
    console.log(x);
    console.log(y);
};
fn.prototype.age = 26;

var bound = fn._bind(obj6, 2);
var person = new bound(3); //undefined 2 3
console.log(person, person.__proto__, person.constructor)

// console.log(person.name); //听风是风
// console.log(person.age); //26
// person.__proto__.age = 18;
// var person = new fn();
// console.log(person.age); //26
