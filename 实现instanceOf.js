function myInstanceof(left, right) {
  // 获取 right 的 prototype
  let prototype = right.prototype;
  
  // 获取 left 的 __proto__
  let proto = left.__proto__;
  
  // 遍历原型链，直到找到相同的原型或到达 null
  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  
  // 如果没有找到相同的原型，则返回 false
  return false;
}

// 示例
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(myInstanceof(dog, Dog)); // true
console.log(myInstanceof(dog, Animal)); // true
console.log(myInstanceof(dog, Object)); // true
console.log(myInstanceof(dog, String)); // false