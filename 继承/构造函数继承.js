
// 构造函数继承是通过在子类的构造函数中调用父类的构造函数来实现的。这种方式的优点是可以避免原型链继承的问题，但缺点是无法继承父类原型上的方法。
function Parent() {
    this.name = 'parent';
}

function Child() {
    Parent.call(this);
}

var child1 = new Child();
console.log(child1.name); // 'parent'