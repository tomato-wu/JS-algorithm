/** apply的模拟实现 */

globalThis.value = 20;

function foo(name, age) {
    console.log(this.value);
    return {
        name,
        age
    }
}
 
Function.prototype.apply2 = function(context, arr) {
    var context = context || globalThis;
    context.fn = this;
    let result;
    if(!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr)
    }
    delete context.fn;
    return result;
}

console.log(foo.apply2(null, ['hello', 26]));