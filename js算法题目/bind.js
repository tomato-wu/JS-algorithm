/** bind模拟实现 */
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

/** 初级版本 */
Function.prototype.bind2 = function(context) {
    const self = this;
    return function() {
        return self.call(context);
    }
}

/** 中级版本 */
Function.prototype.bind3 = function(context) {
    const self = this;
    // 第一层参数
    const args = Array.prototype.slice.call(arguments, 1);

    return function() {
        // 第二层参数
        let bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs))
    }
}

// 分级传参
const newFn = bar.bind3(foo, 'kevin');
newFn(26);

/** 高级版本 */
// 构造函数效果模拟
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}