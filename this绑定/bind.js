Function.prototype.myBind = function (context, ...args) {
  // 保存当前函数的引用
  const self = this;

  return function (...innerArgs) {
    // 使用 apply 方法调用函数，并设置 this 上下文和参数
    return self.apply(context, args.concat(innerArgs));
  };
};

// 示例
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'John' };
const boundGreet = greet.myBind(person, 'Hello');

boundGreet('!'); // 输出: Hello, John!