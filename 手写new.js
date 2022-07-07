function mynew(func, ...args) {

  let obj = {};
  obj.__proto__ = func.prototype;
  let result = func.apply(obj, args);
  return result instanceof Object ? result : obj; 
}

function Person(name, age){
  this.name = name;
  this.age = age;
}

Person.prototype.say = function(){
  console.log(this.name + ' ' + this.age);
}

let p = mynew(Person,"邬坤源",12);
console.log(p);
p.say();

