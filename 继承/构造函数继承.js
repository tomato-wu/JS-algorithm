function Parent(){
  this.name = 'parent1';
}

Parent.prototype.getName = function () {
  return this.name;
}

function Child(){
  Parent.call(this);
  this.type = 'child'
}

let child = new Child();

console.log(child);

// 缺点 ：父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法
console.log(child.getName());
