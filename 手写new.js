function myNew(constructor, ...args) {  
    // 1. 创建一个新的空对象  
    let obj = {};  
  
    // 2. 将这个新对象的 __proto__ 属性链接到构造函数的 prototype 对象  
    obj.__proto__ = constructor.prototype;  
  
    // 3. 将这个新对象作为 this 的上下文  
    // 使用 Function.prototype.call 或 Function.prototype.apply 调用构造函数  
    // 并将参数传递给它  
    let result = constructor.apply(obj, args);  
  
    // 4. 如果构造函数返回了一个对象，那么就返回这个对象；如果没有返回对象，那么就返回新创建的对象 obj。
    return result instanceof Object ? result : obj;  
}  
  
// 使用示例  
function Person(name, age) {  
    this.name = name;  
    this.age = age;  
}  
  
Person.prototype.greet = function() {  
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);  
};  
  
let person = myNew(Person, "Alice", 30);  
person.greet();  // 输出: Hello, my name is Alice and I'm 30 years old.