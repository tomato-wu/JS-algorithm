/*
    装饰器
    ES6 的装饰可以用来装饰类和类的成员属性
    不用装饰方法（JS 中的方法存在变量提升的情况）
*/

/**
 * @description 装饰类的成员变量
 * @param {*} target 类的原型
 * @param {*} name 装饰的属性名
 * @param {*} descriptor 描述符
 */
 function readonly(target, name, descriptor){
    descriptor.writable = false; // 将可写属性设为false
    return descriptor;
  }

class Person {
    @readonly
    name() { return `${this.first} ${this.last}` }
  }

const person = new Person()
person.name = 'hello '

