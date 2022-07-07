/** call的模拟实现 */

globalThis.value = 2;

function foo(name, age) {
    console.log(this.value, name, age);
    return {
        value: this.value,
        name,
        age
    }
}

console.log(foo.call(globalThis, 'kevin', 20));   // 用this浏览器环境下能正常输出2是因为被挂载到window全局对象下

// 初级版本
Function.prototype.call2 = function(context) {
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 中级版本
Function.prototype.call3 = function(context) {
    context.fn = this;
    const args = [];

    // ES6
    // for(let i = 1; i < arguments.length; i++) {
    //     args.push(`${arguments[i]}`)
    // }
    // context.fn(...args)

    // ES3
    for(let i = 1; i < arguments.length; i++) {
        args.push(`arguments[${i}]`)
    }
    eval('context.fn(' + args + ')')

    delete context.fn;
}

console.log(foo.call3(globalThis, 'kevin', 20)); 

// 高级版本
// this参数可能传null，传null时指向window
// 函数本身可能有返回值
Function.prototype.call4 = function(context) {
    var context2 = context || globalThis;
    context2.fn = this;
    const args = [];
    for(let i=1; i<arguments.length; i++) {
        args.push(arguments[i]);
    }
    const result = context2.fn(...args);
    delete context2.fn;
    return result;
}

console.log(foo.call4(null, 'hello', 23)); 