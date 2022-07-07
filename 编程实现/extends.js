/*
    继承的实现方式
    原型链继承
    构造函数继承
    组合继承
    原型式继承
    寄生式继承
    寄生组合式继承
*/

function Person() {
    this.name = 'person name'
    this.age = 'person age'
    this.school = [1, 2]
}

function Student() {}


// 原型链继承
Student.prototype = new Person()
Student.prototype.constructor = Student // new 原理默认将实例的 constructor 指向构造函数


// 构造函数继承
function Student() {
    Person.call(this)
}

// 组合继承
function Student() {
    Person.call(this)
}
Student.prototype = new Person()
Student.prototype.constructor = Student

console.log(new Student().name)



// 原型式继承 => 实现普通对象的继承（浅拷贝）
const obj = {
    name: 'obj name',
    school: [1, 2, 3]
}
const obj2 = Object.create(obj) // 创建一个__proto__ 是 obj 的对象

console.log(obj2.__proto__) // 指向的是 obj


// 寄生式继承 => 可以增加属性和方法（浅拷贝）
function clone() {
    let clone = Object.create(obj)
    clone.getName = function() {
        return this.name
    }
    return clone
} 


// 寄生组合式继承（最为常用的方法）=> 解决了二次使用 new Person
function clone(parent, child) {
    child.prototype = Object.create(parent.prototype) // 实现原型链继承
    child.prototype.constructor = child
}

function Student() {
    Person.call(this)
}
clone(Person, Student)

