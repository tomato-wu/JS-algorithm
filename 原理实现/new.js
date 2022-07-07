// 模拟 new 关键字

function Person() {
    this.name = 'jzyismylover'
    this.age = 18
}
Person.prototype.school = 'gdufs'


function _new(fn, ...args) {
    const obj = {}
    obj.__proto__ = fn.prototype
    //  obj.constructor = fn 隐式继承得到所以应该不需要
    const res = fn.apply(obj, args)

    if (Object.prototype.toString.call(res) === '[object Object]') {// 如果返回的是一个对象
        return res
    } else {
        return obj
    }
}
