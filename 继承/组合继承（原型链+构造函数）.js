// 组合继承：组合继承是原型链继承和构造函数继承的结合，通过在子类构造函数中调用父类构造函数实现属性继承，通过将子类原型指向父类实例实现方法继承。这种方式的缺点是父类构造函数会被调用两次。

function Parent3 () {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
}

function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = 'child3';
}


// 第一次调用 Parent3()
Child3.prototype = new Parent3();

// 手动挂上构造器，指向自己的构造函数
// Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'