function Parent(){
  this.name = '邬坤源',
  this.play = [1,2,3]
}

function Child(){
  this.age = 29
}

Child.prototype = new Parent();

let myChild = new Child();

console.log(myChild.name);

// 缺点：改变s1的play属性，会发现s2也跟着发生变化了，这是因为两个实例使用的是同一个原型对象，内存空间是共享的

var s1 = new Child();
var s2 = new Child();
s1.play.push(4);
console.log(s1.play, s2.play); // [1,2,3,4]