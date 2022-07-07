function Parent() {
    this.a = "hello"
    console.log('Parent constructor');
}
Parent.prototype.sayHello = function() {
    console.log(this.a);
}

function Children() {
    Parent.call(this)
    console.log('children constructor');
}

// 原型链继承
// Children.prototype = new Parent()

// 借用构造函数
// Parent.call(this)

// 组合式
// Children.prototype = new Parent()
// Parent.call(this)

// 寄生式
const b = {
    a: "hello",
    b: [666, 123],
    sayYes() {
        console.log(this.b);
    }
}
// function create(obj) {
//     function F() {}
//     F.prototype = obj
//     return new F()
// }

// const test = create(b)
// test.b.push(369)
// test.sayYes()

// const test2 = create(b)
// test2.b.push(111)
// test2.sayYes()

// const test3 = Object.create(b)
// test3.b.push(123)
// test3.sayYes()

// const test4 = Object.create(b)
// test3.b.push(333)
// test3.sayYes()

// 寄生组合式
function myExtends(Children, Parent) {
    Children.prototype = Parent.prototype
    Children.prototype.constructor = Children
}

myExtends(Children, Parent)
const child2 = new Children()
child2.sayHello()
child2.a = 1
child2.sayHello()