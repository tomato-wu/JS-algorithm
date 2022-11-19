var target = { name: "guxin", age: 18 };
var source = { state: "single" };
var result = Object.assign(target, source);
console.log(target, target == result);
